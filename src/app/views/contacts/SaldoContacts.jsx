import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import PaginationTable from "./PaginationTable";
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

const SaldoContacts = () => {
  const context = useAuth();

  const [contactList, setContactList] = useState([]); // Estado para almacenar los datos de contacto

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
        const response = await utils.listContactsEvent(config);
        console.log("response:", response.contactos)
        // Actualiza el estado con los datos de contacto recibidos
        setContactList(response.contactos);
      } catch (error) {
        console.error("Error al obtener los contactos:", error);
      }
    };

    configLista();
  }, [context._currentValue]);

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Table" }]} />
      </Box>
      <SimpleCard title="Saldos de contactos">
        <PaginationTable contactList={contactList} />
      </SimpleCard>
    </Container>
  );
};

export default SaldoContacts;
