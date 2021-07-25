import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { ApiShowRiwayatTransfer, ApiApprovalTransaksi } from "../../Api";
import { makeStyles } from "@material-ui/core/styles";
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
import { useHistory } from "react-router";

const columns = [
  { id: "no", label: "No.", minWidth: 60 },
  { id: "transaksi", label: "Transaksi", minWidth: 170 },
  {
    id: "kodeUnik",
    label: "Kode Unik",
    minWidth: 60,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "NamaSantri",
    label: "Nama Santri",
    minWidth: 60,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "jumlah",
    label: "Jumlah",
    minWidth: 60,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "BuktiTransfer",
    label: "Bukti Transfer",
    minWidth: 150,
    format: (value) => value.toFixed(2),
  },
  {
    id: "aksi",
    label: "Aksi",
    minWidth: 150,
    format: (value) => value.toFixed(2),
  },
];

function createData(id, username, password, role) {
  return { id, username, password, role };
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
}));

function ApprovalTransfer() {
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = React.useState(0);
  const [dataRiwayatTransfer, setDataRiwayatTransfer] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [shallRender, setShallRender] = React.useState(false);

  let admin_id = sessionStorage.getItem("id_admin");
  let gateway = ApiShowRiwayatTransfer.getInstance();

  let RiwayatTransferInstance = gateway.getRiwayatTransferInstance();
  useEffect(() => {
    let riwayatTransferData = gateway.getDataRiwayatTransfer(
      RiwayatTransferInstance
    );

    let result = gateway.requestData([riwayatTransferData]);
    result.then((response) => {
      if (Array.isArray(response)) {
        // if (response.status === 200) {
        setDataRiwayatTransfer(response);
        console.log("ini riwayat", dataRiwayatTransfer);
        // }
      }
    });
  }, [shallRender]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleApproval = (id_admin, id_tf) => {
    let gateway = ApiApprovalTransaksi.getInstance();
    let RiwayatTransaksiInstance = gateway.getApprovalInstance();
    let riwayatTransaksiData = gateway.editDataApproval(
      RiwayatTransaksiInstance,
      admin_id,
      id_tf,
    );

    let result = gateway.requestData([riwayatTransaksiData]);
    result.then((response) => {
      if (
        response.status === 200 &&
        response.data.message === "Transaksi Berhasil"
      ) {
        setShallRender(!shallRender);
      }
    });
  };

  return (
    <div>
      <Navbar />
      <Paper className={classes.paperSize} elevation="1">
        <div className={classes.Head}>Approval Pembayaran SPP via ATM</div>
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
              {dataRiwayatTransfer &&
                dataRiwayatTransfer.map((data) => {
                  return (
                    <TableRow hover key="{data.id_transaksi}">
                      <TableCell>{data.id_transfer}</TableCell>
                      <TableCell>
                        SPP {data.tanggal_transfer} {data.status_transfer} {data.kode_unik}
                      </TableCell>
                      <TableCell>{data.kode_unik}</TableCell>
                      <TableCell>{data.nama_santri}</TableCell>
                      <TableCell>{data.total_transfer}</TableCell>
                      {dataRiwayatTransfer && (
                        <TableCell>
                          <img className={classes.pic} src={data.path_gambar} />
                          {/* <Button
                            variant="contained"
                            className={classes.detailBtn}
                          >
                            Lihat
                          </Button> */}
                        </TableCell>
                      )}
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            handleApproval(admin_id, data.id_transfer)
                          }
                        >
                          Verifikasi
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
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

export default ApprovalTransfer;
