import {
    Button,
    Grid,
    Icon,
    styled,
  } from "@mui/material";
  import { Span } from "app/components/Typography";
  import { useEffect, useState } from "react";
  import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
  
  const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
  }));
  
  const AgregarContactosForm = () => {
    const [state, setState] = useState();
  
    const handleSubmit = (event) => {
      // console.log("submitted");
      // console.log(event);
    };
  
    const handleChange = (event) => {
      event.persist();
      setState({ ...state, [event.target.name]: event.target.value });
    };
  
    return (
      <div>
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