import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Paper,
  Button,
  Divider,
  FormControl,
  FormLabel,
  TextField,
  MenuItem,
  Select,
  Fragment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import ApiPembayaranSPPTunai from "../Api/Transaksi/PembayaranSPPTunai";

const jumlahBulans = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
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
}));

function InputSPP() {
  const classes = useStyles();
  const history = useHistory();
  const [jumlahBulan, setJumlahBulan] = useState();
  const [nis, setNis] = useState();
  const [totalBayar, setTotalBayar] = useState(0);
  const [spp, setSpp] = useState(0);
  const [infaq, setInfaq] = useState(0);

  let gateway = ApiPembayaranSPPTunai.getInstance();

  let SPPInstance = gateway.getSPPInstance();

  const handlePembayaranSPPTunai = (callback) => {
    let sppData = gateway.createDataSPP(
      SPPInstance,
      nis,
      jumlahBulan,
      totalBayar,
      spp,
      infaq,
      callback
    );
  };

  const handleChangeNIS = (event) => {
    setNis(event.target.value);
  };

  const handleChangeJumlahBulan = (event) => {
    setJumlahBulan(event.target.value);
    setSpp(35000 * event.target.value);
    setInfaq(15000 * event.target.value);
    setTotalBayar(35000 * event.target.value + 15000 * event.target.value);
  };

  return (
    <div>
      <Navbar />
      <Paper className={classes.paperSize}>
        <div className={classes.Head}>Pembayaran SPP santri Tunai</div>
        <Divider />
        <FormControl component="fieldset">
          <div className={classes.pad}>
            <form className={classes.root} noValidate autoComplete="off">
              <div>
                <FormLabel>NIS</FormLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: "400px" , marginLeft: "90px" }}
                  onChange={handleChangeNIS}
                />
              </div>
              <div>
                <FormLabel>Bulan</FormLabel>
                <Select
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: "400px" , marginLeft: "75px" }}
                  onChange={handleChangeJumlahBulan}
                >
                  {jumlahBulans.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div>
                <FormLabel>Nominal SPP</FormLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value={spp}
                  disabled
                  style={{ width: "400px" , marginLeft: "20px"}}
                />
              </div>
              <div>
                <FormLabel>Nominal Infaq</FormLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  disabled
                  style={{ width: "400px" , marginLeft: "13px" }}
                  value={infaq}
                />
              </div>
              <div>
                <FormLabel>Total Bayar</FormLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: "400px" , marginLeft: "35px" }}
                  disabled
                  value={totalBayar}
                />
              </div>
              <div style={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "10px" }}
                  onClick={() =>
                    handlePembayaranSPPTunai(() =>
                      history.push("/RiwayatTransaksi")
                    )
                  }
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
