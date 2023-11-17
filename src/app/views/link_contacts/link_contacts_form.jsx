import {
  Grid,
  Icon,
  styled,
} from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { Span } from "app/components/Typography";
import { Alert, Snackbar } from "@mui/material";
import { useState, useContext } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import * as utils from 'app/utils/utils';
// import { useNavigate } from "react-router-dom";
import React from "react";
import { userContext } from "../../contexts/user-context"

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const SimpleForm = () => {
  // const navigate = useNavigate();
  const [state, setState] = useState({});
  const [open, setOpen] = React.useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [msgType, setMsgType] = useState("error");
  const context = useContext(userContext);
  const [loading, setLoading] = useState(false);

  function handleClose(_, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  const handleSubmit = async (event) => {
    setLoading(true);

    // Validemos si el usuario quiere asignarse a si mismo.
    let email = ""
    console.log("email_contact:",email_contact, "user_email:",context.user_data.user.email)
    if (email_contact === context.user_data.user.email) email = null;
    else email = email_contact;

    // se configura el cuerpo de la consulta para crear el evento en la BD.
    const body = {
      "descripcion": activityDescription,
      "email_contacto": email,
      "valor_participacion": Number(participation_value),
    };
    
    console.log("context:", context)
    const config = {
      method: "POST",
      headers: {
        Authorization: `Token ${context.token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    };
    console.log("body:", body)
    console.log("event:", event)
    try {
      let response = await utils.agregarParticipante(config)
      setLoading(false);
      if (response.error){
        setOpen(true)
        setErrMsg(`Error: ${JSON.stringify(response.error_cause)}`)
        setMsgType("error")
        return ;
      }
      else {
        setOpen(true)
        setErrMsg("Participant added successfully!")
        setMsgType("success")
      }
      // navigate("/")
    }
    catch (e) {
      console.log("exception:", e)
      setLoading(false);
      setOpen(true)
      setErrMsg("Error:" + e)
      setMsgType("error")
    }
  };


  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
    console.log(state)
  };

  const {
    activityDescription,
    email_contact,
    participation_value,
  } = state;

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={msgType} sx={{ width: "100%" }} variant="filled">
          {errMsg}
        </Alert>
      </Snackbar>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            
            <TextField
              type="text"
              name="activityDescription"
              label="activity description"
              onChange={handleChange}
              value={activityDescription || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <TextField
              type="text"
              name="email_contact"
              label="Contact's email"
              onChange={handleChange}
              value={email_contact || ""}
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
            />

            <TextField
              type="number"
              name="participation_value"
              label="Participation Value"
              onChange={handleChange}
              value={participation_value || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

          </Grid>

        </Grid>

        <LoadingButton color="primary" variant="contained" type="submit" loading={loading}>
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add Contact</Span>
        </LoadingButton>
      </ValidatorForm>
    </div>
  );
};

export default SimpleForm;
