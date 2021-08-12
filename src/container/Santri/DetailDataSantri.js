import React, { useEffect, Fragment } from "react";
import Navbar from "../../components/Navbar";
import { Paper, Divider, Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router";
import { ApiDetailSantri } from "../../Api";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import moment from "moment";

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
  data: {
    alignItems: "center",
    fontSize: "18px",
    lineHeight: "88%",
    fontFamily: "Roboto",
    marginLeft: "40px",
    color: "black",
    marginBottom: "20px",
  },
  header: {
    alignItems: "center",
    fontSize: "14px",
    fontFamily: "Roboto",
    marginLeft: "40px",
    color: "#828282",
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
}));

function DetailDataSantri() {
  const params = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [dataSantri, setDataSantri] = React.useState(null);

  let gateway = ApiDetailSantri.getInstance();

  let SantriInstance = gateway.getSantriInstance();

  useEffect(() => {
    if (params && params.id) {
      let santriData = gateway.getDetailSantri(SantriInstance, params.id);

      let result = gateway.requestData([santriData]);
      result.then((response) => {
        if (response && response[0].status === 200) {
          console.log("ini di view detail", response);
          setDataSantri(response[0].data.santri);
        }
      });
    }
  }, [params]);

  return (
    <Fragment>
      <Navbar />
      <Paper className={classes.paperSize}>
        <div className={classes.Head}>Detail Data Santri</div>
        <Divider style={{ marginTop: "20px" }} />
        <Grid container direction="row" style={{ marginTop: "10px" }}>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Typography className={classes.header}>Nama Lengkap</Typography>
            {dataSantri && dataSantri.nama_santri && (
              <Typography className={classes.data}>
                {dataSantri.nama_santri}
              </Typography>
            )}
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Typography className={classes.header}>
              Tempat Tanggal Lahir
            </Typography>
            {dataSantri && dataSantri.nama_santri && (
              <Typography className={classes.data}>
                {moment(dataSantri.tanggal_lahir).format("D MMMM, YYYY")}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Typography className={classes.header}>Nomor Induk Siswa</Typography>
            {dataSantri && dataSantri.nis && (
              <Typography className={classes.data}>{dataSantri.nis}</Typography>
            )}
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Typography className={classes.header}>Jenis Kelamin</Typography>
            {dataSantri && dataSantri.jenis_kelamin && (
              <Typography className={classes.data}>
                {" "}
                {dataSantri.jenis_kelamin === "P" ? "Perempuan" : "Laki-laki"}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Typography className={classes.header}>Alamat</Typography>
            {dataSantri && dataSantri.alamat && (
              <Typography className={classes.data}>
                {dataSantri.alamat}
              </Typography>
            )}
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Typography className={classes.header}>Nomor Telepon</Typography>
            {dataSantri && dataSantri.nama_santri && (
              <Typography className={classes.data}>
                {dataSantri.no_hp}
              </Typography>
            )}
          </Grid>
        </Grid>

        <Grid container direction="row">
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Typography className={classes.header}>Nama Orang Tua</Typography>
            {dataSantri && dataSantri.nama_wali && (
              <Typography className={classes.data}>
                {dataSantri.nama_wali}
              </Typography>
            )}
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Typography className={classes.header}>Keterangan Subsidi</Typography>
            {dataSantri && dataSantri.subsidi && (
              <Typography className={classes.data}>
                {" "}
                {dataSantri.subsidi === "0" ? "Tidak Subsidi" : "Subsidi"}
              </Typography>
            )}
          </Grid>
        </Grid>
        {dataSantri && dataSantri.nis && (
          <Grid container direction="row">
            <Link
              to={`${process.env.PUBLIC_URL}/riwayatpembayaran/${dataSantri.nis}`}
            >
              <Button
                variant="contained"
                style={{
                  marginLeft: "30px",
                  marginBottom: "20px",
                  background: "#3B945E",
                  color: "white",
                }}
              >
                Riwayat Pembayaran
              </Button>
            </Link>
            <Link to={`${process.env.PUBLIC_URL}/daftarsantri`}>
              <Button
                variant="contained"
                color="grey"
                style={{ marginLeft: "30px", marginBottom: "20px" }}
              >
                Kembali
              </Button>
            </Link>
          </Grid>
        )}
      </Paper>
    </Fragment>
  );
}

export default DetailDataSantri;
