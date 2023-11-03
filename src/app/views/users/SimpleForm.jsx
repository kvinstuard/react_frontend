import {
  Button,
  Grid,
  Icon,
  styled,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const SimpleForm = () => {
    const [state, setState] = useState({
        inactivo: true,
        activo: true,
      });

    const handleSwitch = (name) => (event) => {
        setState({ ...state, [name]: event.target.checked });
    };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);

  const handleSubmit = (event) => {
    // console.log("submitted");
    // console.log(event);
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
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

            <TextField
              type="text"
              name="nombre"
              label="Nombre completo"
              onChange={handleChange}
              value={nombre || ""}
              //validators={["required"]}
              //errorMessages={["this field is required"]}
            />

            <TextField
              type="text"
              name="apodo"
              id="standard-basic"
              value={apodo || ""}
              onChange={handleChange}
              label="Apodo"
              //validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
              //errorMessages={["this field is required"]}
            />

            <TextField
              name="password"
              type="password"
              label="Contraseña"
              value={password || ""}
              onChange={handleChange}
              //validators={["required"]}
              //errorMessages={["this field is required"]}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
                name="avatar"
                type="text"
                label="Avatar"
                value={avatar || ""}
                onChange={handleChange}
                //validators={["required"]}
                //errorMessages={["this field is required"]}
                />

            <FormControlLabel
                label="Estado Usuario"
                control={
                <Switch
                    color="primary"
                    value={is_active}
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
