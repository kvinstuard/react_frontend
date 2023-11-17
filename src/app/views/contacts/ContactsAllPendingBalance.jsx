import { Box, styled, Stack } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import ContactsAllPendingBalanceTable from "./ContactsAllPendingBalanceTable";

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
        <Breadcrumb routeSegments={[{ name: "Contacts", path: "/contacts/all/pending/balance" }, { name: "Pending Balance" }]} />
      </Box>
    <Stack spacing={3}>
      <SimpleCard title="Pending Contacts balance">
        <ContactsAllPendingBalanceTable />
      </SimpleCard>
    </Stack>
    </Container>
  );
};

export default MyPendingBalance;
