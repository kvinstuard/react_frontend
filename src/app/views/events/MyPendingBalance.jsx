import { Box, styled, Stack } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import PendingBalanceTable from "./PendingBalanceTable";
import PendingBalanceForm from "./PendingBalanceForm";


const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const MyPendingBalance = () => {
  
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
        <PendingBalanceTable />
      </SimpleCard>
    </Stack>
    </Container>
  );
};

export default MyPendingBalance;
