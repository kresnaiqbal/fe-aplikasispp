import React, { useEffect, useState } from "react";
import {
  ApiShowSantri,
  ApiDeleteSantri,
} from "../../Api";
import Navbar from "../../components/Navbar";
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
import {EditOutlined, AddOutlined, DeleteOutlineOutlined, SearchRounded} from '@material-ui/icons';

const columns = [
  { id: "nis", label: "Nis", minWidth: 50 },
  { id: "nama_santri", label: "Nama", minWidth: 100 },
  {
    id: "kelas",
    label: "Kelas",
    minWidth: 50,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "subsidi",
    label: "Status\u00a0Subsidi",
    minWidth: 50,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "aksi",
    label: "Aksi",
    minWidth: 150,
    format: (value) => value.toFixed(2),
  },
];

const rows = [

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
    marginLeft: "80px",
    marginTop: "-38px",
  },
  Head: {
    color: "black",
    fontSize: "18px",
    fontFamily: "Roboto",
    fontWeight: 700,
    marginLeft: "30px",
  },
  MyButton: {
    background: "#368756",
    border: 0,
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

function DaftarSantri() {
  const classes = useStyles();
  const [dataSantri, setDataSantri] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [shallRender, setShallRender] = useState(false);

  let gateway = ApiShowSantri.getInstance();

  let SantriInstance = gateway.getSantriInstance();

  useEffect(() => {
    let santriData = gateway.getDataSantri(SantriInstance);

    let result = gateway.requestData([santriData]);
    result.then((response) => {
      if (Array.isArray(response)) {
        setDataSantri(response);
      }
    });
  }, [shallRender]);
  
  const handleOnClickDelete = (nis) => {
    let gateway = ApiDeleteSantri.getInstance();

    let SantriInstance = gateway.getSantriInstance();
    let santriData = gateway.deleteDataSantri(SantriInstance, nis);

    let result = gateway.requestData([santriData]);
    result.then((response) => {
      if(response.status === 200 && response.data.message === "Data Santri Berhasil Dihapus"){
      setShallRender(!shallRender);
      } 
    })
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
        <div className={classes.Head}>Daftar Santri</div>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontWeight:"bold", fontSize:"13px"   }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataSantri &&
                dataSantri.map((data) => {
                  return (
                    <TableRow key="{data.nis}">
                      <TableCell> {data.nis}</TableCell>
                      <TableCell> {data.nama_santri}</TableCell>
                      <TableCell> {data.nama_kelas}</TableCell>
                      <TableCell> {data.subsidi=== '0' ? 'Tidak Subsidi' : 'Subsidi'}</TableCell>

                      <TableCell>
                        <Link
                          to={`${process.env.PUBLIC_URL}/DaftarSantri/Detail/${data.nis}`}
                        >
                          <Button
                            variant="contained"
                            className={classes.detailBtn}
                          >
                            <SearchRounded/>
                            Detail
                          </Button>
                        </Link>
                        <Link
                          to={`${process.env.PUBLIC_URL}/DaftarSantri/Sunting/${data.nis}`}
                        >
                          <Button variant="contained" color="primary">
                            <EditOutlined/>
                            Sunting
                          </Button>
                        </Link>
                        <Button
                          variant="contained"
                          className={classes.deleteBtn}
                          onClick={() => handleOnClickDelete(data.nis)}
                        >
                          <DeleteOutlineOutlined/>
                          Hapus
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Link to={`${process.env.PUBLIC_URL}/DaftarSantri/Tambah`}>
          <Button variant="contained" color="primary" style={{ margin: "2%" }}>
            <AddOutlined/>
            Tambah Data Santri
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

export default DaftarSantri;
