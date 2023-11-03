import {
    Button,
    Grid,
    Icon,
    styled,
  } from "@mui/material";
  import { Alert, Snackbar } from "@mui/material";
  import { Span } from "app/components/Typography";
  import { useState } from "react";
  import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
  import * as utils from 'app/utils/utils';
  import useAuth from 'app/hooks/useAuth';
  import React from "react";

  const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
  }));
  
  const AgregarContactosForm = () => {
      const [state, setState] = useState();
      const context = useAuth()
      const [open, setOpen] = React.useState(false);
      const [errMsg, setErrMsg] = useState("");
      const [msgType, setMsgType] = useState("error");

      function handleClose(_, reason) {
        if (reason === "clickaway") {
          return;
        }
        setOpen(false);
      }
    
      const handleSubmit = async (event) => {
        // Se agrega al contacto
        let usuario = context
        console.log("context:",usuario)
        const body = {
          "correo_usuario": "b3@a.com",
          "correo_contacto": state.email
        }
        console.log("body:",  body)
        console.log("state:", state)

        const config = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        };
        try {
          console.log("test2")
          let response = await utils.agregarContacto(config)
          console.log("test")
          if (response.error){
            setOpen(true)
            console.log("test3", response.error_cause)
            setErrMsg("Error, try again!")
            setMsgType("error")
            return ;
          }
          else {
            setOpen(true)
            setErrMsg("Contact added successfully!")
            setMsgType("success")
          }
          console.log("response:", response)
        }
        catch (e) {
          console.log("exception:", e)
          setOpen(true)
          setErrMsg("Error:" + e)
          setMsgType("error")
        }
        
    };
  
    const handleChange = (event) => {
      event.persist();
      setState({ ...state, [event.target.name]: event.target.value });
    };
  
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
                type="email"
                name="email"
                label="Correo Electrónico"
                onChange={handleChange}
                //validators={["required"]}
                //errorMessages={["this field is required"]}
              />
            </Grid>
          </Grid>
  
          <Button color="primary" variant="contained" type="submit">
            <Icon>send</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Agregar Contacto</Span>
          </Button>
        </ValidatorForm>
      </div>
    );
  };
  
  export default AgregarContactosForm;