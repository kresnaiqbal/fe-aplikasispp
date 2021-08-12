import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  Paper,
  Button,
  Divider,
  FormControl,
  FormLabel,
  TextField,
  MenuItem,
  Select,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { ApiEditSantri, ApiDetailSantri } from "../../Api";
import { useHistory } from "react-router";
import moment from "moment";

const kelass = [
  {
    value: "1A",
    label: "1A",
  },
  {
    value: "1B",
    label: "1B",
  },
  {
    value: "1C",
    label: "1C",
  },
  {
    value: "1D",
    label: "1D",
  },
  {
    value: "1E",
    label: "1E",
  },
  {
    value: "1F",
    label: "1F",
  },
  {
    value: "2A",
    label: "2A",
  },
  {
    value: "2B",
    label: "2B",
  },
  {
    value: "2C",
    label: "2C",
  },
  {
    value: "2D",
    label: "2D",
  },
  {
    value: "2E",
    label: "2E",
  },
  {
    value: "2F",
    label: "2F",
  },
  {
    value: "3A",
    label: "3A",
  },
  {
    value: "3B",
    label: "3B",
  },
  {
    value: "3C",
    label: "3C",
  },
  {
    value: "3D",
    label: "3D",
  },
  {
    value: "3E",
    label: "3E",
  },
  {
    value: "3F",
    label: "3F",
  },
];

const subsidis = [
  {
    value: 0,
    label: "Tidak",
  },
  {
    value: 1,
    label: "Subsidi",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
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
  Head: {
    color: "#3B945E",
    fontSize: "18px",
    fontFamily: "Roboto",
    fontWeight: 700,
    marginLeft: "30px",
    margin: "1%",
    padding: "2px",
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
  pad: {
    margin: "20px",
  },
  typo: {
    paddingLeft: "10px",
    marginBottom: "5px",
  },
}));

function SuntingDataSantri() {
  const params = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [dataSantri, setDataSantri] = React.useState(null);
  const [kelas, setKelas] = React.useState();
  const [subsidi, setSubsidi] = React.useState();
  const [alamat, setAlamat] = useState();
  const [noHp, setNoHp] = useState();
  const [jumlahTunggakan, setJumlahTunggakan] = useState();
  let gateway = ApiDetailSantri.getInstance();

  let SantriInstance = gateway.getSantriInstance();

  useEffect(() => {
    if (params && params.id) {
      let santriData = gateway.getDetailSantri(SantriInstance, params.id);

      let result = gateway.requestData([santriData]);
      result.then((response) => {
        console.log("awswa", response);
        if (response && response[0].status === 200) {
          setDataSantri(response[0].data.santri);
          setKelas(response[0].data.santri.nama_kelas);
          setAlamat(response[0].data.santri.alamat);
          setNoHp(response[0].data.santri.no_hp);
          setSubsidi(response[0].data.santri.subsidi);
          setJumlahTunggakan(response[0].data.santri.jumlah_tunggakan);
        }
      });
    }
  }, [params]);

  const handleEditSantri = (callback) => {
    let gateway = ApiEditSantri.getInstance();
    let SantriInstance = gateway.getSantriInstance();
    let santriData = gateway.editDataSantri(
      SantriInstance,
      dataSantri,
      alamat,
      noHp,
      jumlahTunggakan,
      kelas,
      subsidi,
      callback
    );
  };

  const handleChangeKelas = (event) => {
    setKelas(event.target.value);
  };

  const handleChangeAlamat = (event) => {
    setAlamat(event.target.value);
  };

  const handleChangeNoHp = (event) => {
    setNoHp(event.target.value);
  };

  const handleChangeSubsidi = (event) => {
    setSubsidi(event.target.value);
  };
  const handleChangeJumlahTunggakan = (event) => {
    setJumlahTunggakan(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.keyCode == 13 /*enter*/) {
      handleEditSantri(() => history.push("/daftarsantri"));
    }
  };

  return (
    <div>
      <Navbar />
      <Paper className={classes.paperSize}>
        <div className={classes.Head}>Sunting Data Santri</div>
        <Divider />
        <FormControl component="fieldset">
          <div className={classes.pad}>
            <form className={classes.root} noValidate autoComplete="off">
              <Grid container direction="row">
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  onKeyDown={handleKeyPress}
                >
                  <Typography className={classes.typo}>Nama Lengkap</Typography>
                  {dataSantri && dataSantri.nama_santri && (
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      style={{ width: "400px" }}
                      value={dataSantri.nama_santri}
                      disabled
                    />
                  )}
                </Grid>
                <Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    lg={6}
                    xl={6}
                    onKeyDown={handleKeyPress}
                  >
                    <Typography className={classes.typo}>NIS</Typography>
                    {dataSantri && dataSantri.nis && (
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        style={{ width: "400px" }}
                        value={dataSantri.nis}
                        disabled
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid container direction="row">
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  onKeyDown={handleKeyPress}
                >
                  <Typography className={classes.typo}>Tanggal Lahir</Typography>
                  {dataSantri && dataSantri.tanggal_lahir && (
                    <TextField
                      id="outlined-basic"
                      placeholder="YYYY/MM/DD"
                      variant="outlined"
                      style={{ width: "400px" }}
                      value={moment(dataSantri.tanggal_lahir).format(
                        "D MMMM, YYYY"
                      )}
                      disabled
                    />
                  )}
                </Grid>

                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  onKeyDown={handleKeyPress}
                >
                  <Typography className={classes.typo}>Jenis Kelamin</Typography>
                  {dataSantri && dataSantri.jenis_kelamin && (
                    <TextField
                      id="outlined-basic"
                      value={
                        dataSantri.jenis_kelamin === "P"
                          ? "Perempuan"
                          : "Laki-laki"
                      }
                      variant="outlined"
                      style={{ width: "400px" }}
                      disabled
                    />
                  )}
                </Grid>
              </Grid>
              <Grid container direction="row">
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  onKeyDown={handleKeyPress}
                >
                  <Typography className={classes.typo}>Alamat</Typography>
                  {dataSantri && dataSantri.alamat && (
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      style={{ width: "400px" }}
                      value={alamat}
                      onChange={handleChangeAlamat}
                    />
                  )}
                </Grid>

                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  onKeyDown={handleKeyPress}
                >
                  <Typography className={classes.typo}>Nomor HP</Typography>
                  {dataSantri && dataSantri.no_hp && (
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      style={{ width: "400px" }}
                      value={noHp}
                      onChange={handleChangeNoHp}
                    />
                  )}
                </Grid>
              </Grid>
              <Grid container direction="row">
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  onKeyDown={handleKeyPress}
                >
                  <Typography className={classes.typo}>Kelas</Typography>
                  {dataSantri && dataSantri.nama_kelas && kelas && (
                    <Select
                      id="outlined-select-kelas"
                      select
                      value={kelas}
                      onChange={handleChangeKelas}
                      variant="outlined"
                      style={{ width: "400px" }}
                    >
                      {kelass.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </Grid>

                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  onKeyDown={handleKeyPress}
                >
                  <Typography className={classes.typo}>Keterangan Subsidi</Typography>
                  {dataSantri && dataSantri.subsidi && subsidi && (
                    <Select
                      id="outlined-select-subsidi"
                      select
                      value={subsidi}
                      onChange={handleChangeSubsidi}
                      variant="outlined"
                      style={{ width: "400px" }}
                    >
                      {subsidis.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </Grid>
              </Grid>
              <Grid container direction="row">
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  onKeyDown={handleKeyPress}
                >
                  <Typography className={classes.typo}>Jumlah Tunggakan</Typography>
                  {dataSantri && (
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      style={{ width: "400px" }}
                      value={jumlahTunggakan}
                      onChange={handleChangeJumlahTunggakan}
                    />
                  )}
                </Grid>

                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  onKeyDown={handleKeyPress}
                >
                  <Typography className={classes.typo}>Nama OrangTua/Wali</Typography>
                  {dataSantri && dataSantri.nama_wali && (
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      style={{ width: "400px" }}
                      value={dataSantri.nama_wali}
                      disabled
                    />
                  )}
                </Grid>
              </Grid>
              <Grid container direction="row" style={{ alignContent: "right" }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ height: 30, width: 80, margin: "10px" }}
                  onClick={() =>
                    handleEditSantri(() => history.push("/daftarsantri"))
                  }
                >
                  Tambah
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  style={{ height: 30, width: 80, margin: "10px" }}
                >
                  Kembali
                </Button>
              </Grid>
            </form>
          </div>
        </FormControl>
      </Paper>
    </div>
  );
}

export default SuntingDataSantri;
