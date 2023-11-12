import { Box, styled, Stack } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import PaginationContactTable from "./PaginationContactTable";
import AgregarContactosForm from "./AgregarContactosForm";
import { useState, useEffect, useContext } from "react";
import * as utils from 'app/utils/utils';
import { userContext } from "../../contexts/user-context";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const ListaContactos = () => {
  const context = useContext(userContext);
  const [contactList, setContactList] = useState([]); // Estado para almacenar los datos de contacto

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
        const response = await utils.listContacts(config);
        console.log("response:", response.contactos)
        // Actualiza el estado con los datos de contacto recibidos
        setContactList(response.contactos);
      } catch (error) {
        console.error("Error al obtener los contactos:", error);
      }
    };

    configLista();
  }, [context.user_data]);
  
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Contacts", path: "/contacts/list" }, { name: "List" }]} />
      </Box>
    <Stack spacing={3}>
      <SimpleCard title="Contact's management">
        <AgregarContactosForm />
      </SimpleCard>

      <SimpleCard title="Contact's list">
        <PaginationContactTable contactList={contactList} />
      </SimpleCard>
    </Stack>
    </Container>
  );
};

export default ListaContactos;
