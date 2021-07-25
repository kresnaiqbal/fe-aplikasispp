import React, { useEffect, Fragment } from "react";
import Navbar from "../../components/Navbar";
import {
  Paper,
  Divider,
  Typography,
  Grid,
  Link,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router";
import { ApiDetailSantri } from "../../Api";
import { useHistory } from "react-router";

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
    marginTop: "-38px",
  },
  data: {
    alignItems: "center",
    fontSize: "18px",
    lineHeight: "88%",
    fontFamily: "Roboto",
    margin: "9px",
    marginLeft: "40px",
    marginBottom: "40px",
    color: "black",
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
        if (response) {
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
        <Divider />
        <Grid>
          {dataSantri && dataSantri.nama_santri && (
            <Typography className={classes.data}>
              Nama Lengkap : {dataSantri.nama_santri}
            </Typography>
          )}
          {dataSantri && dataSantri.nama_santri && (
            <Typography className={classes.data}>
              Tempat Tanggal Lahir :{dataSantri.tanggal_lahir}
            </Typography>
          )}
        </Grid>
        <Grid>
          {dataSantri && dataSantri.nis && (
            <Typography className={classes.data}>
              NIS : {dataSantri.nis}
            </Typography>
          )}
          {dataSantri && dataSantri.jenis_kelamin && (
            <Typography className={classes.data}>
              Jenis Kelamin :{dataSantri.jenis_kelamin}
            </Typography>
          )}
        </Grid>
        <Grid>
          {dataSantri && dataSantri.alamat && (
            <Typography className={classes.data}>
              Alamat : {dataSantri.alamat}
            </Typography>
          )}
          {dataSantri && dataSantri.nama_santri && (
            <Typography className={classes.data}>
              No. Hp : {dataSantri.no_hp}
            </Typography>
          )}
        </Grid>
        <Grid>
          {dataSantri && dataSantri.nama_wali && (
            <Typography className={classes.data}>
              Nama Orang Tua :{dataSantri.nama_wali}
            </Typography>
          )}
          {dataSantri && dataSantri.subsidi && (
            <Typography className={classes.data}>
              Keterangan Subsidi : {dataSantri.subsidi}
            </Typography>
          )}
        </Grid>
        <div style={{ textAlign: "right" }}>
          <Link to={`${process.env.PUBLIC_URL}/dashboard`}>
            <Button variant="contained" color="secondary">
              Kembali
            </Button>
          </Link>
        </div>
      </Paper>
    </Fragment>
  );
}

export default DetailDataSantri;
