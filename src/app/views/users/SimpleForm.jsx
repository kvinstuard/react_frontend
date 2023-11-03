import {
  Button,
  Grid,
  Icon,
  styled,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Alert, Snackbar } from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import * as utils from 'app/utils/utils';
import { useNavigate } from "react-router-dom";
import React from "react";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const SimpleForm = ({ userData }) => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [msgType, setMsgType] = useState("error");

    function handleClose(_, reason) {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    }

    const [state, setState] = useState({
        inactivo: true,
        activo: true,
      });

    const handleSwitch = (name) => (event) => {
      console.log("test:",{ ...state, [name]: event.target.checked })
        setState({ ...state, [name]: event.target.checked });
    };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);

  const handleSubmit = async (event) => {
    // se actualizan los datos del usuario
    let is_active_bool = false;
    if (state.activo){
      is_active_bool = true;
    }

    const body = {
      "email": userData.email,
      "nombres": nombre || userData.nombres,
      "apellidos": userData.apellidos,
      "password": password || userData.password,
      "foto": avatar || userData.foto,
      "is_active": is_active_bool,
    };

    const config = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    };
    console.log("body:", body)
    console.log("event:", event)
    let response = await utils.updateUser(config)
    if (response.error){
      setOpen(true)
      setErrMsg(response.error_cause)
      setMsgType("error")
      return ;
    }
    else {
      setOpen(true)
      setErrMsg("User updated successful!")
      setMsgType("success")
    }
    navigate("/")
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const {
    apodo,
    nombre,
    password,
    avatar,
    is_active,
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
              name="nombre"
              label="Primer nombre"
              onChange={handleChange}
              value={nombre || "" + userData.nombres}
              style={{ textAlign: 'center' }}
              //validators={["required"]}
              //errorMessages={["this field is required"]}
            />

            <TextField
              type="text"
              name="apodo"
              id="standard-basic"
              value={apodo || "" + userData.apodo}
              onChange={handleChange}
              label="Apodo"
              disabled={true}
              style={{ textAlign: 'center' }}
              //validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
              //errorMessages={["this field is required"]}
            />

            <TextField
              name="password"
              type="password"
              label="password"
              value={password || "" + userData.password}
              onChange={handleChange}
              disabled={true}
              style={{ textAlign: 'center' }}
              //validators={["required"]}
              //errorMessages={["this field is required"]}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
                name="avatar"
                type="text"
                label="Avatar"
                value={avatar || "" + userData.foto}
                onChange={handleChange}
                style={{ textAlign: 'center' }}
                //validators={["required"]}
                //errorMessages={["this field is required"]}
                />

            <FormControlLabel
                label="Estado Usuario"
                control={
                <Switch
                    color="primary"
                    value={is_active || userData.is_active}
                    checked={state.activo}
                    onChange={handleSwitch("activo")}
                />
                }
            />

          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Actualizar Datos</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default SimpleForm;
