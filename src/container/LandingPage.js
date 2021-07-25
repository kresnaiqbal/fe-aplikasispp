import React, { useState, useEffect } from "react";
import "../App.css";
import "../css/fonts.css";
import { ApiLogin } from "../Api";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import { Button, TextField, Grid, Paper } from "@material-ui/core";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import Image from "../image/backgroundLP.png";
import { Link, useHistory } from "react-router-dom";
import {
  getToken,
} from "../components/Common";

const theme1 = createMuiTheme({
  palette: {
    primary: {
      main: "#3B945E",
      dark: "#34b233",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  iconColor: {
    color: "#fff",
    marginRight: "8px",
    fontSize: 32,
  },
  Paper: {
    padding: theme.spacing(4),
    textAlign: "center",
    backgroundColor: "#76B690",
    marginLeft: "40px",
    marginTop: "20px",
    width: "300px"
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
  Header: {
    color: "white",
    alignItems: "center",
    fontSize: "48px",
    lineHeight: "88%",
    fontFamily: "Poppins",
    margin: "9px",
    marginLeft: "40px",

  },
  LoginHeader: {
    color: "white",
    alignItems: "center",
    fontSize: "36px",
    fontFamily: "Poppins",
    margin: "20px",
    marginLeft: "44px",
  },
  Menu: {
    fontFamily: "Poppins",
    fontStyle: "bold",
    fontDisplay: "swap",
    fontWeight: "bold",
    color: "white",
    alignItems: "center",
    fontSize: "12px",
    marginTop: "20px",
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
    position:'absolute',
    height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
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

  useEffect(() => {
    const token = getToken();
    if (!token) {
      history.push('/')
    }
  }, []);
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
            <Grid item xs={6} sm={6} md={9} lg={9} xl={9}>
              <div className={classes.SidebarLogo}>SM</div>
            </Grid>
            <Grid item xs={3} sm={3} md={1} lg={1} xl={1} style={{ marginTop: "2%" }}>
              <Link to={""}>
                <div className={classes.Menu}>Kontak</div>
              </Link>
            </Grid>
            <Grid item xs={3} sm={3} md={2} lg={2} xl={2} style={{ marginTop: "2%" }}>
              <Link to={""}>
                <div className={classes.Menu}>Tentang Kami</div>
              </Link>
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginTop: "5%" }}>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8}style={{ marginLeft: "40px", }}>
                Madrasah Diniyyah Mubarokulhuda
              </Grid>
              <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                <div className={classes.Header}>
                  Selamat Datang di Portal Pencatatan SPP Madrasah Diniyyah
                  Mubarokulhuda
                </div>
              </Grid>
              <Grid item xs={8} sm={8} md={8} lg={8} xl={8} style={{ marginLeft: "40px" }}>
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
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Paper className={classes.Paper} >
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <div
                    className={classes.LoginHeader}
                    style={{
                      marginTop: "0px",
                    }}
                  >
                    Login
                  </div>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        size="small"
                        required
                        variant="outlined"
                        onChange={handleChangeUsername}
                        value={username}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        size="small"
                        required
                        type="password"
                        variant="outlined"
                        onChange={handleChangePassword}
                        value={password}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    {/* <Link to='dashboard'> */}
                    <Button
                      className={classes.MyButton}
                      fullWidth
                      type="submit"
                      variant="contained"
                      onClick={() =>
                        ApiLogin(username, password, () =>
                          history.push("/dashboard")
                        )
                      }
                    >
                      Masuk
                    </Button>
                    {/* </Link> */}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
