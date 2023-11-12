import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const PaginationTable = ({ contactList }) => {
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (contactList == null){
    return <p>No data found in contact's list!.</p>;
  }
  else if (contactList.length === 0) {
    return <p>No data found in contact's list!.</p>;
  }
  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Pending Balance</TableCell>
            <TableCell align="center">Contact's Name</TableCell>
            <TableCell align="center">Contact's Email</TableCell>
            <TableCell align="center">Activity</TableCell>
            <TableCell align="center">Event</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contactList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((contact, index) => (
              <TableRow key={index}>
                <TableCell align="left">${contact.saldo_pendiente}</TableCell>
                <TableCell align="center">{contact.nombre}</TableCell>
                <TableCell align="center">{contact.email}</TableCell>
                <TableCell align="center">{contact.actividad}</TableCell>
                <TableCell align="center">{contact.evento}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={contactList.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </Box>
  );
};

export default PaginationTable;
