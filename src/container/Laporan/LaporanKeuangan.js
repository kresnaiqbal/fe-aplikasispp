import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  ApiShowLaporanUangMasuk,
  ApiDownloadLaporanUangMasuk,
} from "../../Api";
import {
  Paper,
  FormControl,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Divider,
  FormLabel,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { saveAs } from "file-saver";
import GetAppIcon from "@material-ui/icons/GetApp";

const months = [
  {
    value: 1,
    label: "Januari",
  },
  {
    value: 2,
    label: "Februari",
  },
  {
    value: 3,
    label: "Maret",
  },
  {
    value: 4,
    label: "April",
  },
  {
    value: 5,
    label: "Mei",
  },
  {
    value: 6,
    label: "Juni",
  },
  {
    value: 7,
    label: "Juli",
  },
  {
    value: 8,
    label: "Agustus",
  },
  {
    value: 9,
    label: "September",
  },
  {
    value: 10,
    label: "Oktober",
  },
  {
    value: 11,
    label: "November",
  },
  {
    value: 12,
    label: "Desember",
  },
];

const columns = [
  { id: "no", label: "No", minWidth: 10 },
  { id: "tanggal", label: "Tanggal", minWidth: 60 },
  {
    id: "nis",
    label: "NIS",
    minWidth: 60,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "NamaSantri",
    label: "Nama Santri",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "kelas",
    label: "Kelas",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
  {
    id: "BayarSPP",
    label: "Nominal SPP (Rp)",
    minWidth: 10,
  },
  {
    id: "keterangan",
    label: "Keterangan",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
];

const rows = [];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "inline",
    marginTop: 10,
  },
  container: {
    margin: 30,
    marginTop: 10,
    maxHeight: 440,
  },
  monthPicker: {
    width: "150px",
    // height: "100px",
  },
  paperSize: {
    width: "95%",
    height: "50%",
    marginLeft: "80px",
    marginTop: "-45px",
    boxShadow: "0 3px 5px 2px #969696",
  },
  Head: {
    color: "black",
    fontSize: "18px",
    fontFamily: "Roboto",
    fontWeight: 700,
    marginTop: "20px",
    marginLeft: "30px",
    paddingTop: 10,
  },
  MyButton: {
    background: "#368756",
    border: 0,
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
}));

function LaporanKeuangan() {
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = React.useState(0);

  const [month, setMonth] = useState(7);
  const [dataLaporanUangMasuk, setDataLaporanUangMasuk] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  let gateway = ApiShowLaporanUangMasuk.getInstance();
  let LaporanUangMasukInstance = gateway.getLaporanUangMasukInstance();

  const handleMonthPicker = (callback) => {
    // callback()
    let monthData = gateway.getDataLaporanUangMasuk(
      LaporanUangMasukInstance,
      month,
      callback
    );

    let result = gateway.requestData([monthData]);
    result.then((response) => {
      if (Array.isArray(response)) {
        // setDataLaporanUangMasuk(response);
        console.log("ini laporan", response);
        for (let i = 0; i < response.length; i++) {
          if (response[i].status === 200) {
            if (i === 0) {
              setDataLaporanUangMasuk(response[i].data.transaksi);
            }
          } else {
          }
        }
      }
    });
  };

  const handleExportData = () => {
    let exportGateway = ApiDownloadLaporanUangMasuk.getInstance();
    let DownloadLaporanInstance = exportGateway.getDownloadLaporanInstance();

    let monthData = exportGateway.getDownloadLaporanUangMasuk(
      DownloadLaporanInstance,
      month
    );
    let result = exportGateway.requestData(monthData);
    result.then((response) => {
      if (response) {
        var filename = "Laporan Uang Masuk SPP periode.pdf";
        var blob = new Blob([response], {
          type: "application/pdf;charset=utf-8",
        });
        var filesaver = saveAs(blob, filename);
      }
    });
  };
  useEffect(() => {
    let laporanUangMasukData = gateway.getDataLaporanUangMasuk(
      LaporanUangMasukInstance,
      month
    );

    let result = gateway.requestData([laporanUangMasukData]);
    result.then((response) => {
      if (Array.isArray(response)) {
        console.log("ini laporan1", response);
        for (let i = 0; i < response.length; i++) {
          if (response[i].status === 200) {
            if (i === 0) {
              setDataLaporanUangMasuk(response[i].data.transaksi);
            }
          }
        }
        // if(response[])
      }
    });
  }, []);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <Paper className={classes.paperSize} elevation="1">
        <Typography className={classes.Head}>Laporan Keuangan</Typography>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <FormControl component="fieldset">
          <form className={classes.root} noValidate autoComplete="off">
            <Grid container direction="row" style={{ margin: 20 }}>
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <FormLabel style={{ fontSize: "14px" }}>
                  <Typography style={{ paddingTop: "14px" }}>
                    Periode Bulan
                  </Typography>
                </FormLabel>
              </Grid>
              <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                <TextField
                  id="outlined-select-gender"
                  required
                  select
                  value={month}
                  onChange={handleChangeMonth}
                  variant="outlined"
                  className={classes.monthPicker}
                >
                  {months.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Typography style={{ textAlign: "center" }}>
                        {option.label}
                      </Typography>
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ height: "50px", width: 100, marginLeft: 20 }}
                  onClick={handleMonthPicker}
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
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth , fontWeight:"bold", fontSize:"13px"  }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataLaporanUangMasuk &&
                dataLaporanUangMasuk.map((data) => {
                  return (
                    <TableRow hover key="{data.id_transaksi}">
                      <TableCell>{data.id_transaksi}</TableCell>
                      <TableCell>{data.tanggal_transaksi}</TableCell>
                      <TableCell>{data.nis}</TableCell>
                      <TableCell>{data.nama_santri}</TableCell>
                      <TableCell>{data.nama_kelas}</TableCell>
                      <TableCell>
                        {formatter.format(data.total_bayar)}{" "}
                      </TableCell>
                      <TableCell>{data.status_transaksi}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          className={classes.MyButton}
          style={{ margin: "2%" }}
          onClick={handleExportData}
        >
          <GetAppIcon style={{ paddingRight: "20px" }} />
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

export default LaporanKeuangan;
