import React, { useEffect } from "react";
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
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ApiShowLaporanTunggakan } from "../../Api";

const columns = [
  {
    id: "nis",
    label: "NIS",
    minWidth: 40,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "NamaSantri",
    label: "Nama Santri",
    minWidth: 150,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "bulan",
    label: "Jumlah Bulan",
    minWidth: 40,
    format: (value) => value.toFixed(2),
  },
  {
    id: "tahun",
    label: "Tahun",
    minWidth: 40,
    format: (value) => value.toFixed(2),
  },
  {
    id: "NominalTunggakan",
    label: "Nominal Tunggakan",
    minWidth: 60,
    format: (value) => value.toFixed(2),
  },
  {
    id: "aksi",
    label: "Aksi",
    minWidth: 60,
    format: (value) => value.toFixed(2),
  },
];

function createData(nis, NamaSantri, bulan, tahun, Aksi) {
  return { nis, NamaSantri, bulan, tahun, Aksi };
}

const rows = [];

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
    width: "140px",
    height: "35px",
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

function LaporanTunggakan() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dataLaporanTunggakan, setDataLaporanTunggakan] = React.useState([]);

  let gateway = ApiShowLaporanTunggakan.getInstance();
  let LaporanTunggakanInstance = gateway.getLaporanTunggakanInstance();

  useEffect(() => {
    let laporanTunggakanData = gateway.getDataLaporanTunggakan(
      LaporanTunggakanInstance
    );

    let result = gateway.requestData([laporanTunggakanData]);
    result.then((response) => {
      if (Array.isArray(response)) {
        setDataLaporanTunggakan(response);
        console.log("ini laporan", response);
      }
    });
  }, []);

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
        <div className={classes.Head}>Laporan Tunggakan</div>
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
              {dataLaporanTunggakan &&
                dataLaporanTunggakan.map((data) => {
                  return (
                    <TableRow hover key="{data.id_transaksi}">
                      <TableCell>{data.nis}</TableCell>
                      <TableCell>{data.nama_santri}</TableCell>
                      <TableCell>{data.jumlah_tunggakan}</TableCell>
                      <TableCell>{data.jumlah_tunggakan}</TableCell>
                      <TableCell>{data.nominal_tunggakan}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          className={classes.detailBtn}
                        >
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button className={classes.MyButton} style={{ margin: "2%" }}>
          Cetak
        </Button>
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

export default LaporanTunggakan;
