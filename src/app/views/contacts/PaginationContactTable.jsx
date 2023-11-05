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
    Avatar,
  } from "@mui/material";
  import { Alert, Snackbar } from "@mui/material";
  import { useState, useContext } from "react";
  import * as utils from 'app/utils/utils';
  import React from "react";
  import { userContext } from "../../contexts/user-context"
  
  const StyledTable = styled(Table)(() => ({

    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));
  
  // const contactList = [
  //   {
  //     nombre: "Pepito Perez",
  //     email: "pepitoperez@gmail.com",
  //     apodo: "Pepito400",
  //     avatar: "cat.png",
  //   },
  // ];
  
  const PaginationContactTable = ({ contactList }) => {
    const context = useContext(userContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [open, setOpen] = React.useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [msgType, setMsgType] = useState("error");

    function handleClose(_, reason) {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    }
  
    const handleChangePage = (_, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const handleDeleteContact = async (contact) => {
      console.log("Datos del contacto a eliminar:", contact);
      // Se elimina al contacto
      let usuario = context.user_data
      console.log("context:",usuario)
      const body = {
        "correo_usuario": usuario.user.email,
        "correo_contacto": contact.email
      }
      console.log("body:",  body)

      const config = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      };
      try {
        let response = await utils.eliminarContacto(config)
        if (response.error){
          setOpen(true)
          setErrMsg(response.error_cause)
          setMsgType("error")
          return ;
        }
        else {
          setOpen(true)
          setErrMsg("Contact deleted successfully!")
          setMsgType("success")
        }
        console.log("response:", response)
      }
      catch (e) {
        console.log("exception:", e)
        setOpen(true)
        setErrMsg("Error:" + e)
        setMsgType("error")
      }
    };
  
    return (
      <Box width="100%" overflow="auto">
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={msgType} sx={{ width: "100%" }} variant="filled">
            {errMsg}
          </Alert>
        </Snackbar>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="left">Full Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Avatar</TableCell>
              <TableCell align="right">Remove Contact</TableCell>
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
                  <TableCell align="center">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Avatar src={contact.avatar} />
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleDeleteContact(contact)}>
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