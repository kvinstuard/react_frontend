import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import LinkContactsForm from "./link_contacts_form";
import LinkContactsTable from "./LinkContactsTable";

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
        <Breadcrumb routeSegments={[{ name: "Event", path: "/link/contacts" }, { name: "add_remove_contacts" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Add or Remove Contacts Form">
          <LinkContactsForm />
        </SimpleCard>
        <SimpleCard title="Created Events">
          <LinkContactsTable />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default AppForm;
