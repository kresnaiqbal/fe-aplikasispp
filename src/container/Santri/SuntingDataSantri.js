import React, { Component, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  Paper,
  Button,
  Divider,
  FormControl,
  FormLabel,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { makeStyles} from "@material-ui/core/styles";

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
    value: "tidak",
    label: "Tidak",
  },
  {
    value: "Subsidi",
    label: "Subsidi",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    width: '100%'
  },
  container: {
    maxHeight: 440,
  },
  ukuranpaper: {
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
}));

function SuntingDataSantri() {
  const classes = useStyles();
  const [gender, setGender] = React.useState('Pria');
  const [kelas, setKelas] = React.useState("1A");
  const [subsidi, setSubsidi] = React.useState("Tidak");

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleChange1 = (event) => {
    setKelas(event.target.value);
  };

  const handleChange2 = (event) => {
    setSubsidi(event.target.value);
  };


  return (
    <div>
    <Navbar />
    <Paper className={classes.ukuranpaper}>
      <div className={classes.Head}>Sunting Data Santri</div>
      <Divider />
      <FormControl component="fieldset">
        <div className={classes.pad}>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <FormLabel>Nama Lengkap</FormLabel>
              <TextField
                id="outlined-basic"
                variant="outlined"
                style={{ width: "400px" }}
                value=''
                disabled
              />
            </div>
            <div>
              <FormLabel>NIS</FormLabel>
              <TextField
                id="outlined-basic"
                variant="outlined"
                style={{ width: "400px" }}
                disabled
              />
            </div>
            <div>
              <FormLabel>Tanggal Lahir</FormLabel>
              <TextField
                id="outlined-basic"
                placeholder="YYYY/MM/DD"
                variant="outlined"
                style={{ width: "400px" }}
                disabled
              />
            </div>
            <div>
              <FormLabel>Jenis Kelamin</FormLabel>
              <TextField
                id="outlined-select-gender"
                select
                value={gender}
                onChange={handleChange}
                variant="outlined"
                style={{ width: "400px" }}
                disabled
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
                style={{ width: "400px" }}
              />
            </div>
            <div>
              <FormLabel>Nomor HP</FormLabel>
              <TextField
                id="outlined-basic"
                variant="outlined"
                style={{ width: "400px" }}
              />
            </div>
            <div>
              <FormLabel>Kelas</FormLabel>
              <TextField
                id="outlined-select-kelas"
                select
                value={kelas}
                onChange={handleChange1}
                variant="outlined"
                style={{ width: "400px" }}
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
                onChange={handleChange2}
                variant="outlined"
                style={{ width: "400px" }}
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
                style={{ width: "400px" }}
              />
            </div>
            <div>
              <FormLabel>Nama OrangTua/Wali</FormLabel>
              <TextField
                id="outlined-basic"
                variant="outlined"
                style={{ width: "400px" }}
                disabled
              />
            </div>
            <div style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "10px" }}
              >
                Tambah
              </Button>
              <Button variant="contained" color="secondary">
                Kembali
              </Button>
            </div>
          </form>
        </div>
      </FormControl>
    </Paper>
  </div>
  );
}

export default SuntingDataSantri;
