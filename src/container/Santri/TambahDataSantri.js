import React, { useState } from "react";
import clsx from "clsx";
import Navbar from "../../components/Navbar";
import { ApiCreateSantri } from "../../Api";
import {
  Paper,
  Button,
  Divider,
  FormControl,
  FormLabel,
  TextField,
  MenuItem,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const genders = [
  {
    value: "L",
    label: "Pria",
  },
  {
    value: "P",
    label: "Wanita",
  },
];

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
    "&:hover": {
      backgroundColor: "transparent",
    },
    "& .MuiFormControlLabel-label": {
      minWidth:"max-content" // or black
    },
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
    marginRight: "10px",
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
  marginForm: {
    marginLeft: "5px",
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
}));

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

function TambahDataSantri() {
  const classes = useStyles();
  const history = useHistory();
  const [gender, setGender] = useState("Pria");
  const [namaSantri, setNamaSantri] = useState();
  const [nis, setNis] = useState();
  const [tanggalLahir, setTanggalLahir] = useState();
  const [alamat, setAlamat] = useState();
  const [noHp, setNoHp] = useState();
  const [namaWali, setNamaWali] = useState();
  const [jumlahTunggakan, setJumlahTunggakan] = useState();
  const [kelas, setKelas] = useState("1A");
  const [subsidi, setSubsidi] = useState("Tidak");

  let gateway = ApiCreateSantri.getInstance();

  let SantriInstance = gateway.getSantriInstance();

  const handleCreateSantri = (callback) => {
    let santriData = gateway.createDataSantri(
      SantriInstance,
      namaSantri,
      nis,
      gender,
      tanggalLahir,
      alamat,
      noHp,
      namaWali,
      jumlahTunggakan,
      kelas,
      subsidi,
      callback
    );
  };

  const handleChangeNamaSantri = (event) => {
    setNamaSantri(event.target.value);
  };

  const handleChangeNIS = (event) => {
    setNis(event.target.value);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleChangeKelas = (event) => {
    setKelas(event.target.value);
  };

  const handleChangeSubsidi = (event) => {
    setSubsidi(event.target.value);
  };

  const handleChangeTanggalLahir = (event) => {
    setTanggalLahir(event.target.value);
  };
  const handleChangeAlamat = (event) => {
    setAlamat(event.target.value);
  };
  const handleChangeNoHp = (event) => {
    setNoHp(event.target.value);
  };
  const handleChangeJumlahTunggakan = (event) => {
    setJumlahTunggakan(event.target.value);
  };
  const handleChangeNamaWali = (event) => {
    setNamaWali(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.keyCode == 13 /*enter*/) {
      handleCreateSantri(() => history.push("/daftarsantri"));
    }
  };

  return (
    <div>
      <Navbar />
      <Paper className={classes.paperSize}>
        <Typography className={classes.Head}>Tambah Data Santri</Typography>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <Grid container direction="row">
          <Grid xs={4} sm={4} md={2} lg={2} xl={2}>
            <Link to={`${process.env.PUBLIC_URL}/DaftarSantri/Tambah`}>
              <Typography
                className={classes.Menu}
                style={{
                  marginLeft: "30px",
                  color: "#3B945E",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                Input Manual
              </Typography>
            </Link>
          </Grid>
          <Grid xs={4} sm={4} md={2} lg={2} xl={2}>
            <Link to={`${process.env.PUBLIC_URL}/UploadDataSantri`}>
              <Typography
                className={classes.Menu}
                style={{
                  marginLeft: "-100px",
                  color: "#c9c9c9",
                  fontSize: "15px",
                }}
              >
                Upload File
              </Typography>
            </Link>
          </Grid>
        </Grid>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <FormControl component="fieldset">
          <div className={classes.pad}>
            <form className={classes.root} noValidate autoComplete="off">
              <Grid container direction="row">
                <Grid xs={6} sm={6} md={1} lg={1} xl={1}>
                  <FormLabel>Nama Lengkap</FormLabel>
                </Grid>
                <Grid
                  xs={6}
                  sm={6}
                  md={5}
                  lg={5}
                  xl={5}
                  onKeyDown={handleKeyPress}
                >
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "400px" }}
                    onChange={handleChangeNamaSantri}
                  />
                </Grid>
                <Grid xs={6} sm={6} md={1} lg={1} xl={1}>
                  <FormLabel style={{ paddingLeft: "35px" }}>NIS</FormLabel>
                </Grid>
                <Grid
                  xs={6}
                  sm={6}
                  md={5}
                  lg={5}
                  xl={5}
                  onKeyDown={handleKeyPress}
                >
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "400px" }}
                    onChange={handleChangeNIS}
                  />
                </Grid>
              </Grid>
              <Grid container direction="row">
                <Grid xs={6} sm={6} md={1} lg={1} xl={1}>
                  <FormLabel>Tanggal Lahir</FormLabel>{" "}
                </Grid>
                <Grid
                  xs={6}
                  sm={6}
                  md={5}
                  lg={5}
                  xl={5}
                  onKeyDown={handleKeyPress}
                >
                  <TextField
                    id="outlined-basic"
                    placeholder="YYYY/MM/DD"
                    variant="outlined"
                    style={{ width: "400px" }}
                    onChange={handleChangeTanggalLahir}
                  />
                </Grid>
                <Grid xs={6} sm={6} md={1} lg={1} xl={1}>
                  <FormLabel>Jenis Kelamin</FormLabel>{" "}
                </Grid>
                <Grid
                  xs={6}
                  sm={1}
                  md={1}
                  lg={1}
                  xl={1}
                  // style={{ width: "400px" }}
                >
                  <RadioGroup
                    name="customized-radios"
                    value={gender}
                    onChange={handleChangeGender}
                    style={{width:"270px", minWidth:"max-content"}}
                  >
                    <div style={{ display: "inline-flex" }}>
                      <Grid container direction="row">
                        <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                          <FormControlLabel
                            value="P"
                            control={<StyledRadio />}
                            label="Perempuan"
                            style={{ width:35 }}
                          />
                        </Grid>
                        <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                          <FormControlLabel
                            value="L"
                            control={<StyledRadio />}
                            label="Laki-laki"
                            style={{ width:35 }}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </RadioGroup>
                </Grid>
              </Grid>
              <Grid container direction="row">
                <Grid xs={6} sm={6} md={1} lg={1} xl={1}>
                  <FormLabel>Alamat</FormLabel>
                </Grid>
                <Grid
                  xs={6}
                  sm={6}
                  md={5}
                  lg={5}
                  xl={5}
                  onKeyDown={handleKeyPress}
                >
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "400px" }}
                    onChange={handleChangeAlamat}
                  />
                </Grid>
                <Grid xs={6} sm={6} md={1} lg={1} xl={1}>
                  <FormLabel>Nomor HP</FormLabel>
                </Grid>
                <Grid
                  xs={6}
                  sm={6}
                  md={5}
                  lg={5}
                  xl={5}
                  onKeyDown={handleKeyPress}
                >
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "400px" }}
                    onChange={handleChangeNoHp}
                  />
                </Grid>
              </Grid>
              <Grid container direction="row">
                <Grid xs={6} sm={6} md={1} lg={1} xl={1}>
                  <FormLabel>Kelas</FormLabel>
                </Grid>
                <Grid
                  xs={6}
                  sm={6}
                  md={5}
                  lg={5}
                  xl={5}
                  onKeyDown={handleKeyPress}
                >
                  <TextField
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
                  </TextField>
                </Grid>
                <Grid xs={6} sm={6} md={1} lg={1} xl={1}>
                  <FormLabel>Keterangan Subsidi</FormLabel>
                </Grid>
                <Grid
                  xs={6}
                  sm={6}
                  md={5}
                  lg={5}
                  xl={5}
                  onKeyDown={handleKeyPress}
                >
                  <TextField
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
                  </TextField>
                </Grid>
              </Grid>
              <Grid container direction="row">
                <Grid xs={6} sm={6} md={1} lg={1} xl={1}>
                  <FormLabel>Jumlah Tunggakan</FormLabel>
                </Grid>
                <Grid
                  xs={6}
                  sm={6}
                  md={5}
                  lg={5}
                  xl={5}
                  onKeyDown={handleKeyPress}
                >
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "400px" }}
                    onChange={handleChangeJumlahTunggakan}
                  />
                </Grid>

                <Grid xs={6} sm={6} md={1} lg={1} xl={1}>
                  <FormLabel>Nama OrangTua/Wali</FormLabel>
                </Grid>
                <Grid
                  xs={6}
                  sm={6}
                  md={5}
                  lg={5}
                  xl={5}
                  onKeyDown={handleKeyPress}
                >
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "400px" }}
                    onChange={handleChangeNamaWali}
                  />
                </Grid>
              </Grid>
              <Grid style={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "10px" }}
                  onClick={() =>
                    handleCreateSantri(() => history.push("/daftarsantri"))
                  }
                >
                  Tambah
                </Button>
                <Link to={`${process.env.PUBLIC_URL}/dashboard`}>
                  <Button variant="contained" color="secondary">
                    Kembali
                  </Button>
                </Link>
              </Grid>
            </form>
          </div>
        </FormControl>
      </Paper>
    </div>
  );
}

export default TambahDataSantri;
