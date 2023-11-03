import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import SimpleForm from "./SimpleForm";
import { useState, useEffect } from "react";
import useAuth from 'app/hooks/useAuth';
import * as utils from 'app/utils/utils';

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const ModificarUsuario = () => {
  const context = useAuth();
  const [userData, setUserData] = useState([]); // Estado para almacenar los datos de contacto
  

  useEffect(() => {
    const configLista = async () => {
      // Se obtienen los datos de los contactos
      const usuario = context._currentValue;
      console.log("AuthContext:", usuario)
      const body = {
        // "email": usuario.user_details.user.email,
        "email": "b3@a.com",
      };

      const config = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      };

      try {
        const response = await utils.updateUser(config);
        console.log("response:", response)
        // Actualiza el estado con los datos de contacto recibidos
        setUserData(response);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    configLista();
  }, [context._currentValue]);

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Form" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Modificar datos de usuario">
          <SimpleForm userData={userData} />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default ModificarUsuario;