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
    "& tr": { "& td": { paddingLeft: 0 } },
  },
}));

const PendingBalanceTable = ({ pendingBalanceList }) => {
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (pendingBalanceList == null){
    return <p>No data found in pending balance!.</p>;
  }
  else if (pendingBalanceList.length === 0) {
    return <p>No data found in pending balance!.</p>;
  }
  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Activity</TableCell>
            <TableCell align="center">Event</TableCell>
            <TableCell align="center">Pending balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pendingBalanceList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((balance, index) => (
              <TableRow key={index}>
                <TableCell align="left">{balance.actividad}</TableCell>
                <TableCell align="center">{balance.evento}</TableCell>
                <TableCell align="center">${balance.saldo_pendiente}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={pendingBalanceList.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </Box>
  );
};

export default PendingBalanceTable;
