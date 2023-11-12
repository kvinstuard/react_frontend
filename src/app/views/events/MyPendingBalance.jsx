import { Box, styled, Stack } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import PendingBalanceTable from "./PendingBalanceTable";
import PendingBalanceForm from "./PendingBalanceForm";
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

const MyPendingBalance = () => {
  const context = useContext(userContext);
  const [pendingBalanceList, setPendingBalanceList] = useState([]); // Estado para almacenar los datos de contacto

  useEffect(() => {
    const configLista = async () => {
      // Se obtienen los saldos pendientes del usuario
      const usuario = context.user_data;
      console.log("AuthContext:", usuario)

      const config = {
        method: "GET",
        headers: {
          Authorization: `Token ${context.token}`,
          "Content-type": "application/json",
        },
      };

      try {
        const response = await utils.verSaldosPendientes(config);
        console.log("response:", response.eventos_actividades)
        await setPendingBalanceList(response.eventos_actividades);
      } catch (error) {
        console.error("Error al obtener los contactos:", error);
      }
    };

    configLista();
  }, [context.user_data, context.token]);
  
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Events", path: "/my-pending/balance" }, { name: "Balance" }]} />
      </Box>
    <Stack spacing={3}>
      <SimpleCard title="Payment form">
        <PendingBalanceForm />
      </SimpleCard>

      <SimpleCard title="Pending balance">
        <PendingBalanceTable pendingBalanceList={pendingBalanceList} />
      </SimpleCard>
    </Stack>
    </Container>
  );
};

export default MyPendingBalance;
