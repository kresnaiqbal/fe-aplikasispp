import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { ApiShowRiwayatPembayaran } from "../../Api";
import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
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
import { useParams } from "react-router";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import moment from "moment";

const columns = [
  { id: "no", label: "ID Transaksi", minWidth: 60 },
  {
    id: "tglTransaksi",
    label: "Tanggal Transaksi",
    minWidth: 150,
    format: (value) => value.toFixed(2),
  },
  { id: "Bulan", label: "Bulan", minWidth: 170 },
  {
    id: "nominal",
    label: "Nominal Pembayaran",
    minWidth: 60,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "paraf",
    label: "Paraf",
    minWidth: 60,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "tipe",
    label: "Tipe Transaksi",
    minWidth: 60,
    format: (value) => value.toLocaleString("en-US"),
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
    marginTop: "-40px",
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
    height: 48,
    padding: "0 30px",
    marginTop: "20px",
  },
  deleteBtn: {
    background: "#FC4445",
    marginLeft: "1%",
    color: "white",
  },
  pic: {
    width: 30,
  },
  data: { textAlign: "center" },
}));

function RiwayatPembayaran() {
  const params = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = React.useState(0);
  const [dataRiwayatPembayaran, setDataRiwayatPembayaran] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [shallRender, setShallRender] = React.useState(false);

  let gateway = ApiShowRiwayatPembayaran.getInstance();

  let RiwayatPembayaranInstance = gateway.getRiwayatPembayaranInstance();
  useEffect(() => {
    if (params && params.id) {
      let RiwayatPembayaranData = gateway.getDataRiwayatPembayaran(
        RiwayatPembayaranInstance,
        params.id
      );

      let result = gateway.requestData([RiwayatPembayaranData]);
      result.then((response) => {
        if (Array.isArray(response)) {
          console.log("ini di view detail", response);
          setDataRiwayatPembayaran(response);
        }
      });
    }
  }, [shallRender]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  });
  return (
    <div className={classes.body}>
      <Navbar />
      <Paper className={classes.paperSize} elevation="1">
        <div className={classes.Head}>Riwayat Pembayaran </div>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <TableContainer
          className={classes.container}
          style={{ marginTop: "10px" }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontWeight: "bold",
                      fontSize: "13px",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataRiwayatPembayaran &&
                dataRiwayatPembayaran.map((data) => {
                  return (
                    <TableRow hover key="{data.id_transaksi}">
                      <TableCell style={{ width: "10%" }} >
                        {data.id_transaksi}
                      </TableCell>
                      <TableCell style={{ width: "20%" }}>
                        {/* {data.tanggal_transaksi} */}
                        {moment(data.tanggal_transaksi).format('D MMMM, YYYY')}
                      </TableCell>
                      <TableCell style={{ width: "10%" }} >
                        {moment().month(data.bulan).format("MMMM")}
                      </TableCell>
                      <TableCell style={{ width: "15%" }}>
                        {formatter.format(data.total_bayar)}
                      </TableCell>
                      <TableCell >{data.paraf}</TableCell>
                      <TableCell>{data.status_transaksi}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Link to={`${process.env.PUBLIC_URL}/DaftarSantri`}>
          <Button
            variant="contained"
            style={{ margin: "2%", background: "#c4c4c4", alignItems:"right", justifyContent:"right"}}
          >
            Kembali
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

export default RiwayatPembayaran;
