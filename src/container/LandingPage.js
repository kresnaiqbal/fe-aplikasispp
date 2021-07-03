import React, { Component, useEffect, useState } from "react";
import "../App.css";
import "../css/fonts.css";
import { Login, ShowSantri } from "../Api";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import {
  Button,
  TextField,
  Grid,
  Paper,
  List,
  CardMedia,
} from "@material-ui/core";
import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import Image from "../image/backgroundLP.png";
import { Link, Redirect, useHistory } from "react-router-dom";

const theme1 = createMuiTheme({
  palette: {
    primary: {
      main: "#3B945E",
      dark: "#34b233",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  iconColor: {
    color: "#fff",
    marginRight: "8px",
  },
  Paper: {
    padding: theme.spacing(4),
    textAlign: "center",
    backgroundColor: "#76B690",
  },
  SidebarLogo: {
    color: "white",
    alignItems: "center",
    fontSize: "36px",
    fontFamily: "Poppins",
    fontStyle: "italic",
    margin: "20px",
    marginLeft: "40px",
  },
  Judul: {
    color: "white",
    alignItems: "center",
    fontSize: "48px",
    lineHeight: "88%",
    fontFamily: "Poppins",
    margin: "9px",
    marginLeft: "40px",
    marginBottom: "40px",
  },
  LoginJudul: {
    color: "white",
    alignItems: "center",
    fontSize: "36px",
    fontFamily: "Poppins",
    margin: "20px",
    marginLeft: "44px",
  },
  Kontakdll: {
    fontFamily: "Poppins",
    fontStyle: "bold",
    fontDisplay: "swap",
    fontWeight: "bold",
    color: "white",
    alignItems: "center",
    fontSize: "12px",
    marginTop: "2%",
  },
  LoginForm: {
    alignItems: "center",
    width: "600px",
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
  BackgroundLP: {
    backgroundImage: `url(${Image})`,
    height: "667px",
    maxHeight: "667px",
  },
  bp: {
    height: "100%",
  },
}));

function LandingPage() {
  const classes = useStyles();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className={classes.bp}>
      <div className={classes.root}>
        <Paper className={classes.BackgroundLP}>
          <Grid container direction="row">
            <Grid item md={9}>
              <div className={classes.SidebarLogo}>SM</div>
            </Grid>
            <Grid item md={1} style={{ marginTop: "2%" }}>
              <Link to={""}>
                <div className={classes.Kontakdll}>Kontak</div>
              </Link>
            </Grid>
            <Grid item md={2} style={{ marginTop: "2%" }}>
              <Link to={""}>
                <div className={classes.Kontakdll}>Tentang Kami</div>
              </Link>
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginTop: "5%" }}>
            <Grid item md={8}>
              <Grid item md={8} style={{ marginLeft: "5%" }}>
                Madrasah Diniyyah Mubarokulhuda
              </Grid>
              <Grid item md={10}>
                <div className={classes.Judul}>
                  Selamat Datang di Portal Pencatatan SPP Madrasah Diniyyah
                  Mubarokulhuda
                </div>
              </Grid>
              <Grid item xs={8} style={{ marginLeft: "5%" }}>
                <Link
                  to={`https://www.youtube.com/channel/UCfCCVByq3vT7Aj7uqE1J4Xw`}
                >
                  <InstagramIcon button className={classes.iconColor} />
                </Link>
                <Link
                  to={`https://www.youtube.com/channel/UCfCCVByq3vT7Aj7uqE1J4Xw`}
                >
                  <YouTubeIcon className={classes.iconColor} />
                </Link>
                <Link to={``}>
                  <FacebookIcon className={classes.iconColor} />
                </Link>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.Paper} style={{ width: "80%" }}>
                <Grid item xs={12}>
                  <div
                    className={classes.LoginJudul}
                    style={{
                      marginTop: "0px",
                    }}
                  >
                    Login
                  </div>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        size="small"
                        variant="outlined"
                        onChange={handleChangeUsername}
                        value={username}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        size="small"
                        type="password"
                        variant="outlined"
                        onChange={handleChangePassword}
                        value={password}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    {/* <Link to='dashboard'> */}
                    <Button
                      className={classes.MyButton}
                      fullWidth
                      type="submit"
                      variant="contained"
                      onClick={() =>
                        Login(username, password, () =>
                          history.push("/dashboard")
                        )
                      }
                    >
                      Masuk
                    </Button>
                    {/* </Link> */}
                  </Grid>
                  <Grid item xs={12}>
                    <div
                      className={classes.Kontakdll}
                      style={{
                        marginTop: "5%",
                      }}
                    >
                      Lupa Username / Password?
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
}

export default LandingPage;
