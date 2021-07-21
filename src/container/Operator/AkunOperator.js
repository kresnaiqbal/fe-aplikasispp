import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { ApiShowAdmin, ApiDeleteAdmin } from "../../Api";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const columns = [
  { id: "id", label: "ID", minWidth: 60 },
  { id: "namaAdmin", label: "Nama Admin", minWidth: 170 },
  {
    id: "username",
    label: "Username",
    minWidth: 60,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "role",
    label: "Role",
    minWidth: 60,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Aksi",
    label: "Aksi",
    minWidth: 150,
    format: (value) => value.toFixed(2),
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  paperSize: {
    width: "100%",
    borderRadius: "20px",
    marginLeft: "80px",
  },
  Head: {
    color: "black",
    fontSize: "18px",
    fontFamily: "Roboto",
    fontWeight: 700,
    marginTop: "20px",
    marginLeft: "30px",
  },
  MyButton: {
    background: "#368756",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    marginTop: "20px",
  },
  deleteBtn: {
    background: "#FC4445",
    marginLeft: "1%",
    color: "white",
  },
  detailBtn: {
    background: "#0B4FFF",
    marginRight: "1%",
    color: "white",
  },
}));

const rows = [];

function AkunOperator() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [dataAdmin, setDataAdmin] = useState([]);
  const [shallRender, setShallRender] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  let gateway = ApiShowAdmin.getInstance();

  let AdminInstance = gateway.getAdminInstance();

  useEffect(() => {
    let adminData = gateway.getDataAdmin(AdminInstance);

    let result = gateway.requestData([adminData]);
    result.then((response) => {
      if (Array.isArray(response)) {
        setDataAdmin(response);
        console.log("ini view", response);
      }
    });
  }, [shallRender]);

  const handleOnClickDelete = (id_admin) => {
    let gateway = ApiDeleteAdmin.getInstance();

    let AdminInstance = gateway.getAdminInstance();
    let adminData = gateway.deleteDataAdmin(AdminInstance, id_admin);

    let result = gateway.requestData([adminData]);
    result.then((response) => {
      if (response.data.message === "Data Admin Berhasil Dihapus") {
        setShallRender(!shallRender);
        // console.log('hapus ini',santriData);
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Navbar />
      <Paper className={classes.paperSize} elevation="1">
        <div className={classes.Head}>Akun Admin</div>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataAdmin &&
                dataAdmin.map((data) => {
                  return (
                    <TableRow hover key="{data.id_admin}">
                      <TableCell>{data.id_admin}</TableCell>
                      <TableCell>{data.nama_admin}</TableCell>
                      <TableCell>{data.username}</TableCell>
                      <TableCell>{data.role}</TableCell>

                      <TableCell>
                        <Link to={`${process.env.PUBLIC_URL}/AkunAdmin/Detail/${data.id_admin}`}>
                          <Button
                            variant="contained"
                            className={classes.detailBtn}
                          >
                            Detail
                          </Button>
                        </Link>
                        <Link to={`${process.env.PUBLIC_URL}/AkunAdmin/Sunting/${data.id_admin}`}>
                          <Button variant="contained" color="primary">
                            Sunting
                          </Button>
                        </Link>
                        <Button
                          variant="contained"
                          className={classes.deleteBtn}
                          onClick={() => handleOnClickDelete(data.id_admin)}
                        >
                          Hapus
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Link to={`${process.env.PUBLIC_URL}/AkunAdmin/Tambah`}>
          <Button className={classes.MyButton} style={{ margin: "2%" }}>
            Tambah Akun Admin
          </Button>
        </Link>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default AkunOperator;
