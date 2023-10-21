import { Box, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./formRegistration.scss";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../../context/Context";

const FormRegistration = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [validar, setValidar] = useState(false);
  const context = useContext(Context);

    const handleFormSubmit = (values) => {
      let data = null;
      data = {
        correo_electronico: values.email,
        nombres: values.firstNames,
        apellidos: values.lastNames,
        password:values.password,
        apodo: values.nickname,
        foto: values.picture,
      };
      fetch("http://127.0.0.1:8000/event_expenses/api/v1/usuario/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      })
      console.log("user created!")
      navigate("/home/")
      };

  return (
    <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
      <Box
        height={isNonMobile ? "calc(100vh - 70px)" : "100%"}
        padding={"30px"}
      >
        <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <div className="registration">
              <h3>{("Registration")}</h3>
              <form onSubmit={handleSubmit}>
              <Box
                    display="grid"
                    gap="30px"
                    width={"100%"}
                    height={"100%"}
                    gridTemplateColumns="repeat(6, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 6",
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label={("First Names")}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstNames}
                      name="firstNames"
                      error={!!touched.firstNames && !!errors.firstNames}
                      helperText={touched.firstNames && errors.firstNames}
                      sx={{ gridColumn: "span 3" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label={("Last Names")}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastNames}
                      name="lastNames"
                      error={!!touched.lastNames && !!errors.lastNames}
                      helperText={touched.lastNames && errors.lastNames}
                      sx={{ gridColumn: "span 3" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label={("Nickname")}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.nickname}
                        name="nickname"
                        error={!!touched.nickname && !!errors.nickname}
                        helperText={touched.nickname && errors.nickname}
                        sx={{ gridColumn: "span 3" }}
                      />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label={("Email")}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={{ gridColumn: "span 6" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="password"
                        label={("Password")}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        name="password"
                        error={!!touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                        sx={{ gridColumn: "span 3" }}
                    />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label={("profile picture's URL")}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.picture}
                        name="picture"
                        error={!!touched.picture && !!errors.picture}
                        helperText={touched.picture && errors.picture}
                        sx={{ gridColumn: "span 3" }}
                      />
              </Box>
              <Box
                    className="send"
                    paddingTop={"20px"}
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <Button
                      variant="outlined"
                      type="submit"
                      sx={{
                        width: "230px",
                        height: "50px",
                        borderRadius: "10px",
                      }}
                    >
                      Validate Data
                    </Button>
                  </Box>
              </form>
            </div>
          )}
        </Formik>
      </Box>
    </Grid>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const initialValues = {
  email:"",
  firstNames: "",
  lastNames: "",
  nickname:"",
  password:"",
  picture:"",
};

export default FormRegistration;
