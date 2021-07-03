import React from "react";
import Navbar from "../components/Navbar";
import {
  Paper,
  Button,
  Divider,
  FormControl,
  FormLabel,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

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

function InputSPP() {
  const classes = useStyles();

  return (
    <div>
      <Navbar />
      <Paper className={classes.ukuranpaper}>
        <div className={classes.Head}>Tambah Data Santri</div>
        <Divider />
        <FormControl component="fieldset">
          <div className={classes.pad}>
            <form className={classes.root} noValidate autoComplete="off">
              <div>
                <FormLabel>NIS</FormLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: "400px" }}
                  value="NIS"
                />
              </div>
              <div>
                <FormLabel>Bulan</FormLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: "400px" }}
                  value="bulan"
                />
              </div>
              <div>
                <FormLabel>Nominal SPP</FormLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: "400px" }}
                  value="spp"
                />
              </div><div>
                <FormLabel>Nominal Infaq</FormLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: "400px" }}
                  value="infaq"
                />
              </div><div>
                <FormLabel>Total Bayar</FormLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: "400px" }}
                  value="total_bayar"
                />
              </div>
              <div style={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "10px" }}
                >
                  Bayar
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

export default InputSPP;
