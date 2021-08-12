import React, { useEffect, useState } from "react";
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
  Divider,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  ApiShowLaporanTunggakan,
  ApiExportLaporanTunggakan,
  ApiCetakSuratTagihan,
} from "../../Api";
import { useHistory } from "react-router";
import { saveAs } from "file-saver";

import GetAppIcon from '@material-ui/icons/GetApp';

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
    label: "Surat Tagihan",
    minWidth: 60,
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
    marginTop: "-60px"
  },
  Head: {
    color:"#3B945E",
    fontSize: "18px",
    fontFamily: "Roboto",
    fontWeight: 700,
    marginTop: "20px",
    marginLeft: "30px",
  },
  MyButton: {
    background: "#368756",
    border: 0,
    boxShadow: "0 .15rem 1.75rem 0 rgba(58,59,69,.15)!important",
    color: "white",
    width: "140px",
    height: "35px",
    padding: "0 30px",
    marginTop: "20px",
  },
  detailBtn: {
    background: "#368756",
    marginRight: "1%",
    color: "white",
  },
}));

function LaporanTunggakan() {
  const classes = useStyles();
  const history = useHistory();
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
        for (let i = 0; i < response.length; i++) {
          if (response[i].status === 200) {
            if (i === 0) {
              setDataLaporanTunggakan(response[i].data.tunggakan);
              console.log("ini laporan1", dataLaporanTunggakan);
              // setDataLaporanUangMasuk(response[i].data.transaksi);
            }
          } else {
            // history.push('/errorHandler')
          }
        }
      }
    });
  }, []);

  const handleCetakSuratTagihan = (nis) => {
    let tagihanGateway = ApiCetakSuratTagihan.getInstance();
    let suratTagihanInstance = tagihanGateway.getSuratTagihanInstance();

    let tagihanData = tagihanGateway.getSuratTagihan(suratTagihanInstance, nis);
    let resultTunggakan = tagihanGateway.requestData([tagihanData]);

    resultTunggakan.then((response) => {
      console.log('123', response)
      if (response && response.status===200) {
        var filename = "surat tunggakan.pdf";
        var blob = new Blob([response.data], {
          type: "application/pdf;charset=utf-8",
        });
        var filesaver = saveAs(blob, filename);
      }
    });
  };

  const handleExportData = () => {
    let exportGateway = ApiExportLaporanTunggakan.getInstance();
    let exportLaporanInstance =
      exportGateway.getExportLaporanTunggakanInstance();

    let data = exportGateway.getExportLaporanTunggakan(exportLaporanInstance);
    let result = exportGateway.requestData(data);
    result.then((response) => {
      if (response) {
        var filename = "Laporan Tunggakan.pdf";
        var blob = new Blob([response], {
          type: "application/pdf;charset=utf-8",
        });
        var filesaver = saveAs(blob, filename);
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
    <div className={classes.body}>
      <Navbar />
      <Paper className={classes.paperSize} elevation="1">
        <Typography className={classes.Head}>Laporan Tunggakan</Typography>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
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
              {dataLaporanTunggakan &&
                dataLaporanTunggakan.map((data) => {
                  return (
                    <TableRow hover key="{data.id_transaksi}">
                      <TableCell>{data.nis}</TableCell>
                      <TableCell>{data.nama_santri}</TableCell>
                      <TableCell>{data.jumlah_tunggakan}</TableCell>
                      <TableCell>{data.tahun}</TableCell>
                      <TableCell>{data.nominal_tunggakan}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          className={classes.detailBtn}
                          onClick={() => handleCetakSuratTagihan(data.nis)}
                        >
                          <GetAppIcon style={{paddingRight:"10px"}}/>
                          Cetak
                        </Button>
                      </TableCell>
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
          <GetAppIcon style={{paddingRight:"20px"}}/>
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
