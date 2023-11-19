import { Box, styled, Stack, Typography } from "@mui/material";
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
      <SimpleCard title="Contacts - Pending Balance">
      <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left'}}>
        Here you can see what's the detailed pending balance of each of your contacts per event and activity.
      </Typography>
        <ContactsAllPendingBalanceTable />
      </SimpleCard>
    </Stack>
    </Container>
  );
};

export default MyPendingBalance;
