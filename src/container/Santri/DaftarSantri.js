import React, { useEffect, useState } from "react";
import { ApiShowSantri, ApiDeleteSantri, ApiSearchSantri } from "../../Api";
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
  Typography,
  Divider,
  FormControl,
  FormLabel,
  TextField,
  Grid,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  AddOutlined,
  DeleteOutlineOutlined,
  SearchRounded,
  ImportExportRounded,
} from "@material-ui/icons";

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

const rows = [];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  body: {
    padding: 10,
    paddingLeft: 60,
  },
  container: {
    margin: 30,
    marginTop: 10,
    maxHeight: 440,
    maxWidth: 1800,
  },
  paperSize: {
    width: "100%",
    marginTop: "-38px",
  },
  Head: {
    color: "#3B945E",
    fontSize: "18px",
    fontFamily: "Roboto",
    fontWeight: 700,
    marginLeft: "30px",
  },
  MyButton: {
    background: "#368756",
    border: 0,
    boxShadow: "0 .15rem 1.75rem 0 rgba(58,59,69,.15)!important",
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
  data: { textAlign: "center" },
}));

function DaftarSantri() {
  const classes = useStyles();
  const [dataSantri, setDataSantri] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [shallRender, setShallRender] = useState(false);
  const [render, setRender] = useState(false);
  const [asc, setAsc] = useState(false);
  const [namaSantri, setNamaSantri] = useState();

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
      if (
        response.status === 200 &&
        response.data.message === "Data Santri Berhasil Dihapus"
      ) {
        setShallRender(!shallRender);
      }
    });
  };

  let searchGateway = ApiSearchSantri.getInstance();

  let SearchInstance = searchGateway.getSearchSantriInstance();

  const handleSearch = (callback) => {
    // callback()
    let searchData = searchGateway.getSearchSantri(
      SearchInstance,
      namaSantri,
      callback
    );

    let result = searchGateway.requestData([searchData]);
    result.then((response) => {
      if (Array.isArray(response)) {
        console.log("ini laporan", response);
        if (response[0].status === 200) {
          setDataSantri(response[0].data.santri);
        } else {
        }
      }
    });
  };

  function handleSortData(label) {
    console.log("wadu", label);
    let temp = dataSantri;
    if (label === "Nis") {
      if (asc === false) {
        temp.sort((a, b) => (a.nis > b.nis ? 1 : b.nis > a.nis ? -1 : 0));
      } else if (asc === true) {
        temp.sort((a, b) => (a.nis < b.nis ? 1 : b.nis < a.nis ? -1 : 0));
      }
      setDataSantri(temp);
      setRender(!render);
      setAsc(!asc);
    } else if (label === "Nama Santri") {
      if (asc === false) {
        temp.sort((a, b) =>
          a.nama_santri > b.nama_santri
            ? 1
            : b.nama_santri > a.nama_santri
            ? -1
            : 0
        );
      } else {
        temp.sort((a, b) =>
          a.nama_santri < b.nama_santri
            ? 1
            : b.nama_santri < a.nama_santri
            ? -1
            : 0
        );
      }
      setDataSantri(temp);
      setRender(!render);
      setAsc(!asc);
    } else if (label === "Kelas") {
      if (asc === false) {
        temp.sort((a, b) =>
          a.nama_kelas > b.nama_kelas ? 1 : b.nama_kelas > a.nama_kelas ? -1 : 0
        );
      } else {
        temp.sort((a, b) =>
          a.nama_kelas < b.nama_kelas ? 1 : b.nama_kelas < a.nama_kelas ? -1 : 0
        );
      }
      setDataSantri(temp);
      setRender(!render);
      setAsc(!asc);
    } else if (label === "Keterangan Subsidi") {
      if (asc === false) {
        temp.sort((a, b) =>
          a.subsidi > b.subsidi ? 1 : b.subsidi > a.subsidi ? -1 : 0
        );
      } else {
        temp.sort((a, b) =>
          a.subsidi < b.subsidi ? 1 : b.subsidi < a.subsidi ? -1 : 0
        );
      }
      setDataSantri(temp);
      setRender(!render);
      setAsc(!asc);
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeSearchSantri = (event) => {
    setNamaSantri(event.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleKeyPress = (event) => {
    if (event.keyCode == 13 /*enter*/) {
      handleSearch();
    }
  };

  return (
    <div className={classes.body}>
      <Navbar />
      <Paper className={classes.paperSize} elevation="1">
        <Typography className={classes.Head}>Daftar Santri</Typography>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <FormControl component="fieldset">
          <form className={classes.root} noValidate autoComplete="off">
            <Grid
              container
              direction="row"
              style={{ margin: 10, paddingLeft:20}}
            >
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6} onKeyDown={handleKeyPress}>
                <TextField
                  id="outlined-select-gender"
                  value={namaSantri}
                  onChange={handleChangeSearchSantri}
                  variant="outlined"
                  size="small"
                  className={classes.monthPicker}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRounded />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ height: "35px", width: 100, marginLeft: 20 }}
                  onClick={handleSearch}
                >
                  Tampilkan
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormControl>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    fontSize: "13px",
                    textAlign: "center",
                  }}
                >
                  NIS
                  <Button
                    onClick={() => handleSortData("Nis")}
                    style={{
                      color: "#c9c9c9",
                      paddingLeft: "70px",
                      height: 10,
                      width: 1,
                    }}
                  >
                    <ImportExportRounded />
                  </Button>
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    fontSize: "13px",
                    textAlign: "center",
                    paddingLeft: "40px",
                  }}
                >
                  Nama Santri
                  <Button
                    onClick={() => handleSortData("Nama Santri")}
                    style={{ color: "#c9c9c9" }}
                  >
                    <ImportExportRounded />
                  </Button>
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    fontSize: "13px",
                    textAlign: "center",
                  }}
                >
                  Kelas
                  <Button
                    onClick={() => handleSortData("Kelas")}
                    style={{ color: "#c9c9c9" }}
                  >
                    <ImportExportRounded />
                  </Button>
                </TableCell>
                <TableCell
                  style={{
                    // minWidth: column.minWidth,
                    fontWeight: "bold",
                    fontSize: "13px",
                    textAlign: "center",
                  }}
                >
                  Keterangan Subsidi
                  <Button
                    onClick={() => handleSortData("Keterangan Subsidi")}
                    style={{ color: "#c9c9c9" }}
                  >
                    <ImportExportRounded />
                  </Button>
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    fontSize: "13px",
                    textAlign: "center",
                  }}
                >
                  Aksi
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataSantri &&
                dataSantri.map((data) => {
                  return (
                    <TableRow key="{data.nis}">
                      <TableCell className={classes.data}>
                        {" "}
                        {data.nis}
                      </TableCell>
                      <TableCell className={classes.data}>
                        {" "}
                        {data.nama_santri}
                      </TableCell>
                      <TableCell className={classes.data}>
                        {" "}
                        {data.nama_kelas}
                      </TableCell>
                      <TableCell className={classes.data}>
                        {" "}
                        {data.subsidi === "0" ? "Tidak Subsidi" : "Subsidi"}
                      </TableCell>

                      <TableCell className={classes.data}>
                        <Link
                          to={`${process.env.PUBLIC_URL}/DaftarSantri/Detail/${data.nis}`}
                        >
                          <Button
                            variant="contained"
                            className={classes.detailBtn}
                          >
                            <SearchRounded />
                            Detail
                          </Button>
                        </Link>
                        <Link
                          to={`${process.env.PUBLIC_URL}/DaftarSantri/Sunting/${data.nis}`}
                        >
                          <Button variant="contained" color="primary">
                            <EditOutlined />
                            Sunting
                          </Button>
                        </Link>
                        <Button
                          variant="contained"
                          className={classes.deleteBtn}
                          onClick={() => handleOnClickDelete(data.nis)}
                        >
                          <DeleteOutlineOutlined />
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
            <AddOutlined />
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
