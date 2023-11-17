import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import CreateActivitiesForm from "./CreateActivitiesForm";
import PaginationActivitiesTable from "./PaginationActivitiesTable";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const CrearActividad = () => {

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Activity", path: "/create/activities" }, { name: "Create" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Create Activities Form">
          <CreateActivitiesForm />
        </SimpleCard>

        <SimpleCard title="Event's Activities List">
          <PaginationActivitiesTable/>
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default CrearActividad;