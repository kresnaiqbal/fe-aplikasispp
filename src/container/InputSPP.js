import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Paper,
  Button,
  Divider,
  FormControl,
  TextField,
  MenuItem,
  Select,
  Fragment,
  Link,
  Typography,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import ApiPembayaranSPPTunai from "../Api/Transaksi/PembayaranSPPTunai";
import { ApiCekNominalSPP } from "../Api";

const totalMonths = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 6,
    label: "6",
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
    width: "95%",
    marginLeft: "80px",
    marginTop: "-38px",
    boxShadow: "0 .15rem 1.75rem 0 rgba(58,59,69,.15)!important",
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

function InputSPP() {
  const classes = useStyles();
  const history = useHistory();
  const [jumlahBulan, setJumlahBulan] = useState();
  const [nis, setNis] = useState();
  const [totalBayar, setTotalBayar] = useState(0);
  const [spp, setSpp] = useState(0);
  const [infaq, setInfaq] = useState(0);

  let admin_id = sessionStorage.getItem("id_admin");
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
      admin_id,
      callback
    );
  };

  const handleCekNominal = (nis, jumlahBulan) => {
    let gateway = ApiCekNominalSPP.getInstance();
    let NominalSPPInstance = gateway.getCekNominalSPPInstance();
    let NominalSPPData = gateway.getCekNominalSPP(
      NominalSPPInstance,
      nis,
      jumlahBulan
    );

    let result = gateway.requestData([NominalSPPData]);
    result.then((response) => {
      if (response.status === 200) {
        console.log("Allah", response);
        setSpp(response.data.spp);
        setInfaq(response.data.infaq);
        setTotalBayar(response.data.total_bayar);
      }
    });
  };

  const handleChangeNIS = (event) => {
    setNis(event.target.value);
  };

  const handleChangeJumlahBulan = (event) => {
    setJumlahBulan(event.target.value);
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  });

  const handleKeyPress = (event) => {
    if (event.keyCode == 13 /*enter*/) {
      handlePembayaranSPPTunai(() => history.push("/RiwayatTransaksi"));
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode == 13 /*enter*/) {
      handleCekNominal();
    }
  };

  return (
    <div>
      <Navbar />
      <Paper className={classes.paperSize}>
        <Typography className={classes.Head} style={{ paddingTop: 10 }}>
          Pembayaran SPP santri Tunai
        </Typography>
        <Divider />
        <FormControl component="fieldset">
          <div className={classes.pad} style={{ alignItems: "right" }}>
            <form className={classes.root} noValidate autoComplete="off">
              <Grid onKeyDown={handleKeyPress} >
                <Typography className={classes.typo}>NIS</Typography>
                <TextField
                  id="outlined-basic"
                  required
                  variant="outlined"
                  style={{ width: "400px" }}
                  onChange={handleChangeNIS}
                />
              </Grid>
              <Grid onKeyDown={handleKeyDown}>
                <Typography className={classes.typo}>Jumlah Bulan</Typography>
                <Select
                  id="outlined-basic"
                  variant="outlined"
                  required
                  style={{
                    width: "400px",
                    marginLeft: 8,
                    marginTop: 8,
                    marginBottom: 10,
                  }}
                  onChange={handleChangeJumlahBulan}
                >
                  {totalMonths.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <Grid style={{ textAlign: "right" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: "10px" }}
                    onClick={() => handleCekNominal(nis, jumlahBulan)}
                  >
                    Cek Nominal
                  </Button>
                </Grid>
              </Grid>
              <Grid onKeyDown={handleKeyDown}>
                <Typography className={classes.typo}>Nominal SPP</Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value={formatter.format(spp)}
                  disabled
                  style={{ width: "400px" }}
                />
              </Grid>
              <Grid onKeyDown={handleKeyPress}>
                <Typography className={classes.typo}>Nominal Infaq</Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  disabled
                  style={{ width: "400px" }}
                  value={formatter.format(infaq)}
                />
              </Grid>
              <Grid onKeyDown={handleKeyPress}>
                <Typography className={classes.typo}>Total Bayar</Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: "400px", color: "black" }}
                  disabled
                  value={formatter.format(totalBayar)}
                />
              </Grid>
              <Grid style={{ textAlign: "right" }}>
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
                <Link>
                  <Button
                    variant="contained"
                    color="secondary"
                    to={`${process.env.PUBLIC_URL}/dashboard`}
                  >
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

export default InputSPP;
