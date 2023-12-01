import { Box, styled, Stack } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import PaginationContactTable from "./PaginationContactTable";
import AgregarContactosForm from "./AgregarContactosForm";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const ListaContactos = () => {
  
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
        <PaginationContactTable />
      </SimpleCard>
    </Stack>
    </Container>
  );
};

export default ListaContactos;
