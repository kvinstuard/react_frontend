import {
    Box,
    Icon,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
  } from "@mui/material";
  import { useState } from "react";
  
  const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));
  
  const contactList = [
    {
      nombre: "Pepito Perez",
      email: "pepitoperez@gmail.com",
      apodo: "Pepito400",
      avatar: "cat.png",
    },
  ];
  
  const PaginationContactTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const handleChangePage = (_, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <Box width="100%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="left">Nombre Completo</TableCell>
              <TableCell align="center">Correo Electrónico</TableCell>
              <TableCell align="center">Apodo</TableCell>
              <TableCell align="center">Avatar</TableCell>
              <TableCell align="right">Borrar Contacto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contactList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((contact, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{contact.nombre}</TableCell>
                  <TableCell align="center">{contact.email}</TableCell>
                  <TableCell align="center">{contact.apodo}</TableCell>
                  <TableCell align="center">{contact.avatar}</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <Icon color="error">close</Icon>
                    </IconButton>
                  </TableCell>
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
  
  export default PaginationContactTable;