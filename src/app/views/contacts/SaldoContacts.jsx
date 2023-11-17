import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import PaginationTable from "./PaginationTable";
import SaldoContactsForm from "./SaldoContactsForm";


const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const SaldoContacts = () => {

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Contacts", path: "/contacts/balance" }, { name: "Balance" }]} />
      </Box>
      <SimpleCard title="Form to help contacts!">
        <SaldoContactsForm />
      </SimpleCard>
      <SimpleCard title="Contact's balance">
        <PaginationTable />
      </SimpleCard>
    </Container>
  );
};

export default SaldoContacts;
