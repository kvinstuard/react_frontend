import { Box, styled, Stack, Typography } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import ActivitiesAllEventsTable from "./ActivitiesAllEventsTable";

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
        <Breadcrumb routeSegments={[{ name: "Events", path: "/all/Activities" }, { name: "All Activities" }]} />
      </Box>
    <Stack spacing={3}>
      <SimpleCard title="Pending balance">
        <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left'}}>
          Here you can see all the activities available in each event you participate.
        </Typography>
        <ActivitiesAllEventsTable />
      </SimpleCard>
    </Stack>
    </Container>
  );
};

export default MyPendingBalance;
