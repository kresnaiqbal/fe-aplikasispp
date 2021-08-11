import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import {
  Paper,
  Button,
  Divider,
  FormControl,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  Link,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { ApiCreateAdmin } from "../../Api";
import { useHistory } from "react-router";

const roles = [
  {
    value: "Admin",
    label: "Admin",
  },
  {
    value: "Operator",
    label: "Operator",
  },
];

const state = {
  error: false, //<---- here
  errorMessage: {}, //<-----here
};

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
    color:"#3B945E",
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
}));

function TambahAkunOperator() {
  const classes = useStyles();
  const history = useHistory();
  const [password, setPassword] = useState({
    showPassword: false,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    confirmPassword: "",
    showConfirmPassword: false,
  });
  const [role, setRole] = useState();
  const [username, setUsername] = useState();
  const [namaAdmin, setNamaAdmin] = useState();
  const [paraf, setParaf] = useState();

  let gateway = ApiCreateAdmin.getInstance();

  let AdminInstance = gateway.getAdminInstance();

  const handleCreateAdmin = (callback) => {
    let adminData = gateway.createDataAdmin(
      AdminInstance,
      username,
      namaAdmin,
      role,
      paraf,
      password,
      callback
    );
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleChange1 = (event) => {
    setRole(event.target.value);
  };

  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword1 = () => {
    setConfirmPassword({
      ...confirmPassword,
      showConfirmPassword: !confirmPassword.showConfirmPassword,
    });
  };

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangeNamaAdmin = (event) => {
    setNamaAdmin(event.target.value);
  };

  const handleChangeParaf = (event) => {
    setParaf(event.target.value);
    // console.log(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.keyCode == 13 /*enter*/) {
      handleCreateAdmin(() => history.push("/akunadmin"))
    }
  };


  return (
    <div>
      <Navbar />
      <Paper className={classes.paperSize}>
        <div className={classes.Head}>Tambah Akun Admin/Operator</div>
        <Divider />
        <FormControl component="fieldset">
          <div className={classes.pad}>
            <form className={classes.root} noValidate autoComplete="off">
              <Grid onKeyDown={handleKeyPress}>
                <TextField
                  id="outlined-basic"
                  required
                  placeholder="Nama Lengkap"
                  variant="outlined"
                  style={{ width: "400px" }}
                  onChange={handleChangeNamaAdmin}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid onKeyDown={handleKeyPress}>
                <TextField
                  id="outlined-select-gender"
                  required
                  select
                  value={role}
                  onChange={handleChange1}
                  placeholder="Role"
                  variant="outlined"
                  style={{ width: "400px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SettingsApplicationsIcon />
                      </InputAdornment>
                    ),
                  }}
                >
                  {roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid onKeyDown={handleKeyPress}>
                <TextField
                  id="outlined-basic"
                  required
                  placeholder="Paraf"
                  variant="outlined"
                  onChange={handleChangeParaf}
                  style={{ width: "400px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BorderColorIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid onKeyDown={handleKeyPress}>
                <TextField
                  id="outlined-basic"
                  required
                  placeholder="Username"
                  onChange={handleChangeUsername}
                  variant="outlined"
                  style={{ width: "400px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid onKeyDown={handleKeyPress}>
                <TextField
                  id="outlined-adornment-password"
                  required
                  type={password.showPassword ? "text" : "password"}
                  variant="outlined"
                  style={{ width: "400px" }}
                  onChange={handleChangePassword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {password.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                  placeholder="Password"
                />
              </Grid>
              <Grid onKeyDown={handleKeyPress}>
                <TextField
                  id="outlined-adornment-confrimpassword"
                  required
                  type={
                    confirmPassword.showConfirmPassword ? "text" : "password"
                  }
                  variant="outlined"
                  style={{ width: "400px" }}
                  onChange={handleChangeConfirmPassword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowPassword1}
                        onMouseDown={handleMouseDownPassword1}
                        edge="end"
                      >
                        {confirmPassword.showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                  placeholder="Confirm Password"
                />
              </Grid>
              <Grid style={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "10px" }}
                  onClick={() =>
                    handleCreateAdmin(() => history.push("/akunadmin"))
                  }
                >
                  Tambah
                </Button>
                <Link to={`${process.env.PUBLIC_URL}/akunadmin`}>
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

export default TambahAkunOperator;
