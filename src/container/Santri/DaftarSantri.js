import React, { useEffect, useState } from "react";
import {
  ApiShowSantri,
  requestData,
  ApiDeleteSantri,
  ApiCreateSantri,
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

function createData(nis, nama, kelas, statusSubsidi, statusSPP) {
  return { nis, nama, kelas, statusSubsidi, statusSPP };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  ukuranpaper: {
    width: "100%",
    borderRadius: "20px",
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

function DaftarSantri() {
  const classes = useStyles();
  const [dataSantri, setDataSantri] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
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
      console.log("ini respon delete",response)
      setShallRender(!shallRender);
      // console.log('hapus ini',santriData);
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

  // ShowSantri(setDataSantri);

  return (
    <div>
      <Navbar />
      <Paper className={classes.ukuranpaper} elevation="1">
        <div className={classes.Head}>Daftar Santri</div>
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
              {dataSantri &&
                dataSantri.map((data) => {
                  return (
                    <TableRow key="{data.nis}">
                      <TableCell> {data.nis}</TableCell>
                      <TableCell> {data.nama_santri}</TableCell>
                      <TableCell> {data.id_kelas}</TableCell>
                      <TableCell> {data.subsidi}</TableCell>

                      <TableCell>
                        <Link
                          to={`${process.env.PUBLIC_URL}/DaftarSantri/Detail`}
                        >
                          <Button
                            variant="contained"
                            className={classes.detailBtn}
                          >
                            Detail
                          </Button>
                        </Link>
                        <Link
                          to={`${process.env.PUBLIC_URL}/DaftarSantri/Sunting`}
                        >
                          <Button variant="contained" color="primary">
                            Sunting
                          </Button>
                        </Link>
                        <Button
                          variant="contained"
                          className={classes.deleteBtn}
                          onClick={() => handleOnClickDelete(data.nis)}
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
        <Link to={`${process.env.PUBLIC_URL}/DaftarSantri/Tambah`}>
          <Button variant="contained" color="primary" style={{ margin: "2%" }}>
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
