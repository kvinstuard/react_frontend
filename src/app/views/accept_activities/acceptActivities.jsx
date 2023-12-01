import { Box, styled, Stack } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useState } from "react";
import AcceptActivitiesTable from "./acceptActivitiesTable";
import AcceptActivitiesForm from "./acceptActivitiesForm";


const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const MyPendingBalance = () => {
  const [selectedActivity, setSelectedActivity] = useState(null)

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Events", path: "/accept/activities" }, { name: "Accept" }]} />
      </Box>
    <Stack spacing={3}>
      <SimpleCard title="Accept Activities Form">
        <AcceptActivitiesForm selectedActivity={selectedActivity} />
      </SimpleCard>

      <SimpleCard title="Activities's invitations">
        <AcceptActivitiesTable setSelectedActivity={setSelectedActivity} />
      </SimpleCard>
    </Stack>
    </Container>
  );
};

export default MyPendingBalance;
