import { Stack, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import ModifyEventsForm from "./modify_events_form";
import ModifyEventsTable from "./ModifyEventsTable";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AppForm = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Event", path: "/modify/events" }, { name: "Modify" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Modify Events Form">
          <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left'}}>
            NOTE: if you don't want to modify event's name or another field, just copy 
            and past the same value in the corresponding field. Please don't type blank spaces.
          </Typography>
          <ModifyEventsForm />
        </SimpleCard>
        <SimpleCard title="Created Events">
          <ModifyEventsTable />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default AppForm;
