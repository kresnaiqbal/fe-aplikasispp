import React, { useState } from "react";
import Navbar from "../../components/Navbar";
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
import { ApiUbahNominalSPP } from "../../Api";

const totalYears = [
  {
    value: 2021,
    label: "2021",
  },
  {
    value: 2022,
    label: "2022",
  },
  {
    value: 2023,
    label: "2023",
  },
  {
    value: 2024,
    label: "2024",
  },
  {
    value: 2025,
    label: "2025",
  },
  {
    value: 2026,
    label: "2026",
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

function UbahNominalSPP() {
  const classes = useStyles();
  const history = useHistory();
  const [tahun, setTahun] = useState();
  const [nominalSPP, setNominalSPP] = useState(0);
  const [spp, setSpp] = useState(0);
  const [infaq, setInfaq] = useState(0);

  let admin_id = sessionStorage.getItem("id_admin");
  let gateway = ApiUbahNominalSPP.getInstance();

  let SPPInstance = gateway.getSPPInstance();

  const handleUbahNominalSPP = (callback) => {
    let sppData = gateway.createDataSPP(
      SPPInstance,
      tahun,
      nominalSPP,
      spp,
      infaq,
      callback
    );
  };

  const handleChangeTahun = (event) => {
    setTahun(event.target.value);
  };

  const handleChangeInfaq = (event) => {
    setInfaq(event.target.value);
  };

  const handleChangeSPP = (event) => {
    setSpp(event.target.value);
  };
  const handleChangeNominalSPP = (event) => {
    setNominalSPP(event.target.value);
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  });

  const handleKeyPress = (event) => {
    if (event.keyCode == 13 /*enter*/) {
      handleUbahNominalSPP(() => history.push("/Dashboard"));
    }
  };

  return (
    <div>
      <Navbar />
      <Paper className={classes.paperSize}>
        <Typography className={classes.Head} style={{ paddingTop: 10 }}>
          Ubah Nominal SPP
        </Typography>
        <Divider />
        <FormControl component="fieldset">
          <div className={classes.pad}>
            <Grid container direction="row">
              <form className={classes.root} noValidate autoComplete="off">
                <Grid onKeyDown={handleKeyPress}>
                  <Typography className={classes.typo}>Tahun Ajaran</Typography>
                  <Select
                    id="outlined-basic"
                    variant="outlined"
                    value={tahun}
                    required
                    style={{
                      width: "400px",
                      marginLeft: 10,
                      marginTop: 8,
                      marginBottom: 10,
                    }}
                    onChange={handleChangeTahun}
                  >
                    {totalYears.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid onKeyDown={handleKeyPress}>
                  <Typography className={classes.typo}>Nominal SPP</Typography>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    onChange={handleChangeSPP}
                    style={{ width: "400px", color: "black" }}
                  />
                </Grid>
                <Grid onKeyDown={handleKeyPress}>
                  <Typography className={classes.typo}>
                    Nominal Infaq
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    required
                    style={{ width: "400px", color: "black" }}
                    onChange={handleChangeInfaq}
                  />
                </Grid>
                <Grid onKeyDown={handleKeyPress}>
                  <Typography className={classes.typo}>Akumulasi SPP dan Infaq</Typography>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "400px", color: "black" }}
                    required
                    onChange={handleChangeNominalSPP}
                  />
                </Grid>
                <Grid style={{ textAlign: "right" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: "10px" }}
                    onClick={() =>
                      handleUbahNominalSPP(() => history.push("/Dashboard"))
                    }
                  >
                    Ubah
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
            </Grid>
          </div>
        </FormControl>
      </Paper>
    </div>
  );
}

export default UbahNominalSPP;
