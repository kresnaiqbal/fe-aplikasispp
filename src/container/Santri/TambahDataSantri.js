import React, { useState } from "react";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";

const genders = [
  {
    value: "Pria",
    label: "Pria",
  },
  {
    value: "Wanita",
    label: "Wanita",
  },
];

const kelass = [
  {
    value: "1A",
    label: "1A",
  },
  {
    value: "2A",
    label: "2A",
  },
  {
    value: "3A",
    label: "3A",
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
    borderRadius: "20px",
    marginLeft: "80px",
    marginTop: "-38px",
  },
  Head: {
    color: "black",
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
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
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
}));

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

  return (
    <div>
      <Navbar />
      <Paper className={classes.paperSize}>
        <div className={classes.Head}>Tambah Data Santri</div>
        <Divider />
        <FormControl component="fieldset">
          <div className={classes.pad}>
            <form className={classes.root} noValidate autoComplete="off">
              <Grid container direction="row">
                <Grid >
                  <FormLabel>Nama Lengkap</FormLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "400px", marginLeft: "55px" }}
                    onChange={handleChangeNamaSantri}
                  />
                </Grid>
                <Grid item md={6}>
                  <FormLabel>NIS</FormLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "400px", marginLeft: "137px" }}
                    onChange={handleChangeNIS}
                  />
                </Grid>
                <div>
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <TextField
                    id="outlined-basic"
                    placeholder="YYYY/MM/DD"
                    variant="outlined"
                    style={{ width: "400px", marginLeft: "65px" }}
                    onChange={handleChangeTanggalLahir}
                  />
                </div>
                <div>
                  <FormLabel>Jenis Kelamin</FormLabel>
                  <TextField
                    id="outlined-select-gender"
                    select
                    value={gender}
                    onChange={handleChangeGender}
                    variant="outlined"
                    style={{ width: "400px", marginLeft: "60px" }}
                  >
                    {genders.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div>
                  <FormLabel>Alamat</FormLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "400px", marginLeft: "110px" }}
                    onChange={handleChangeAlamat}
                  />
                </div>
                <div>
                  <FormLabel>Nomor HP</FormLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "400px", marginLeft: "85px" }}
                    onChange={handleChangeNoHp}
                  />
                </div>
                <div>
                  <FormLabel>Kelas</FormLabel>
                  <TextField
                    id="outlined-select-kelas"
                    select
                    value={kelas}
                    onChange={handleChangeKelas}
                    variant="outlined"
                    style={{ width: "400px", marginLeft: "120px" }}
                  >
                    {kelass.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div>
                  <FormLabel>Keterangan Subsidi</FormLabel>
                  <TextField
                    id="outlined-select-subsidi"
                    select
                    value={subsidi}
                    onChange={handleChangeSubsidi}
                    variant="outlined"
                    style={{ width: "400px", marginLeft: "20px" }}
                  >
                    {subsidis.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div>
                  <FormLabel>Jumlah Tunggakan</FormLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "400px", marginLeft: "20px" }}
                    onChange={handleChangeJumlahTunggakan}
                  />
                </div>
                <div>
                  <FormLabel>Nama OrangTua/Wali</FormLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "400px", marginLeft: "3px" }}
                    onChange={handleChangeNamaWali}
                  />
                </div>
                <div style={{ textAlign: "right" }}>
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
                  <Button variant="contained" color="secondary">
                    Kembali
                  </Button>
                </div>
              </Grid>
            </form>
          </div>
        </FormControl>
      </Paper>
    </div>
  );
}

export default TambahDataSantri;
