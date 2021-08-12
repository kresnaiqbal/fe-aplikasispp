import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import {
  ApiShowRiwayatTransfer,
  ApiApprovalTransaksi,
  ApiRejectTransfer,
} from "../../Api";
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
  Modal,
  Backdrop,
  Divider,
  Typography,
  Grid,
} from "@material-ui/core";
import { useHistory } from "react-router";
import moment from "moment";
import { Link } from "react-router-dom";

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
    id: "status",
    label: "Status Transfer",
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
  },
  Head: {
    color: "#3B945E",
    fontSize: "18px",
    fontFamily: "Roboto",
    fontWeight: 700,
    marginTop: "-40px",
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
    // width: "300px",
    height: "80%",
    align: "center",
    objectFit: "contain",
  },
  pic1: {
    width: 10,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
  },
  customColumnStyle: { maxWidth: "-10px" },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function ApprovalTransfer() {
  const classes = useStyles();
  const history = useHistory();
  const [modalStyle] = React.useState(getModalStyle);
  const [page, setPage] = React.useState(0);
  const [dataRiwayatTransfer, setDataRiwayatTransfer] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [shallRender, setShallRender] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      id_tf
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

  const handleReject = (id_transfer) => {
    let gateway = ApiRejectTransfer.getInstance();

    let transferInstance = gateway.getRejectTransferInstance();
    let transferData = gateway.rejectTransfer(transferInstance, id_transfer);

    let result = gateway.requestData([transferData]);
    result.then((response) => {
      if (
        response[0].status === 200 &&
        response[0].data.message ===
          "Transfer Tidak Valid, Silahkan Hubungi Admin"
      ) {
        setShallRender(!shallRender);
      }
    });
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <div className={classes.body}>
      <Navbar />
      <Paper className={classes.paperSize} elevation="1">
        <Typography className={classes.Head}>
          Approval Pembayaran SPP via ATM
        </Typography>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <Grid container direction="row">
          <Grid xs={4} sm={4} md={2} lg={2} xl={2}>
            <Link to={`${process.env.PUBLIC_URL}/ApprovalTransfer`}>
              <Typography
                className={classes.Menu}
                style={{
                  marginLeft: "30px",
                  color: "#3B945E",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                Riwayat Transfer SPP
              </Typography>
            </Link>
          </Grid>
          <Grid xs={4} sm={4} md={2} lg={2} xl={2}>
            <Link
              to={`${process.env.PUBLIC_URL}/ApprovalTransfer/RiwayatTransferGagal`}
            >
              <Typography
                className={classes.Menu}
                style={{
                  // marginLeft: "-100px",
                  color: "#c9c9c9",
                  fontSize: "15px",
                }}
              >
                Riwayat Transfer Gagal
              </Typography>
            </Link>
          </Grid>
        </Grid>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <TableContainer className={classes.container}>
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
              {dataRiwayatTransfer &&
                dataRiwayatTransfer.map((data) => {
                  return (
                    <TableRow hover key="{data.id_transaksi}">
                      <TableCell style={{ width: "5%" }}>
                        {data.id_transfer}
                      </TableCell>
                      <TableCell style={{ width: "25%" }}>
                        SPP{" "}
                        {moment(data.tanggal_transfer).format("D MMMM, YYYY")}{" "}
                        {data.status_transfer} {data.kode_unik}
                      </TableCell>
                      <TableCell style={{ width: "10%" }}>
                        {data.kode_unik}
                      </TableCell>
                      <TableCell>{data.nama_santri}</TableCell>
                      <TableCell>
                        {formatter.format(data.total_transfer)}{" "}
                      </TableCell>
                      <TableCell>{data.status_transfer}</TableCell>
                      <TableCell style={{ width: "5%" }}>
                        {/* <img className={classes.pic1} src={data.path_gambar} /> */}
                        <Button
                          variant="contained"
                          className={classes.detailBtn}
                          onClick={handleOpen}
                        >
                          Lihat
                        </Button>
                        <Modal
                          className={classes.modal}
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="simple-modal-title"
                          aria-describedby="simple-modal-description"
                          BackdropComponent={Backdrop}
                        >
                          <img className={classes.pic} src={data.path_gambar} />
                        </Modal>
                      </TableCell>
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
                        <Button
                          variant="contained"
                          className={classes.deleteBtn}
                          onClick={() => handleReject(data.id_transfer)}
                        >
                          Tolak
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
