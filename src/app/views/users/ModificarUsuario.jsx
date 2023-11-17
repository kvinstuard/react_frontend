import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import SimpleForm from "./SimpleForm";
import { useState, useEffect, useContext } from "react";
import { userContext } from "../../contexts/user-context"
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
  const context = useContext(userContext);
  const [userData, setUserData] = useState([]); // Estado para almacenar los datos de contacto
  

  useEffect(() => {
    const configLista = async () => {
      // Se obtienen los datos de los contactos
      const usuario = context.user_data;
      console.log("AuthContext:", usuario)
      const body = {
        // "email": usuario.user_details.user.email,
        "email": usuario.user.email,
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
  }, [context.user_data]);

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Modify", path: "/users/modify" }, { name: "User" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="User settings">
          <SimpleForm userData={userData} />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default ModificarUsuario;