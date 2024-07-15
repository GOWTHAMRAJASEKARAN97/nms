import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const DataTable = ({ data, handleEdit, handleDelete }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.entries(row).some(
        ([key, val]) =>
          key !== "_id" &&
          val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    return filteredData.sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, order, orderBy]);

  return (
    <>
      <TextField
        label="Search anything"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        style={{ margin: 16 }}
      />
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {Object.keys(data[0] || {})
                  .filter((key) => key !== "_id")
                  .map((key) => (
                    <TableCell key={key}>
                      <TableSortLabel
                        active={orderBy === key}
                        direction={orderBy === key ? order : "asc"}
                        onClick={() => handleRequestSort(key)}
                        sx={{
                          textTransform: "Uppercase",
                          fontWeight: "bolder",
                        }}
                      >
                        {key}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                {!!data.length && (
                  <TableCell
                    sx={{ textTransform: "Uppercase", fontWeight: "bolder" }}
                  >
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.length > 0 ? (
                sortedData.map((row, index) => (
                  <TableRow key={index}>
                    {Object.entries(row)
                      .filter(([key]) => key !== "_id")
                      .map(([key, value], idx) => (
                        <TableCell key={idx}>{value}</TableCell>
                      ))}
                    <TableCell>
                      <IconButton onClick={() => handleEdit(row)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(row)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={Object.keys(data[0] || {}).length + 1}>
                    <Typography variant="h6" align="center">
                      No data found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default DataTable;
