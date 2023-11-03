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
        <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Table" }]} />
      </Box>
    <Stack spacing={3}>
      <SimpleCard title="Agregar contacto">
        <AgregarContactosForm />
      </SimpleCard>

      <SimpleCard title="Lista de contactos">
        <PaginationContactTable />
      </SimpleCard>
    </Stack>
    </Container>
  );
};

export default ListaContactos;
