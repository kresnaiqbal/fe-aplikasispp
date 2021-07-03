import React, { Component, useEffect, useState } from "react";
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
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import BorderColorIcon from '@material-ui/icons/BorderColor';

const roles = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "operator",
    label: "Operator",
  },
];

const state = {
  error: false, //<---- here
  errorMessage: {} //<-----here
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

function TambahAkunOperator() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });
  const [values1, setValues1] = React.useState({
    confirmPassword: '',
    showConfirmPassword: false,
  });
  const [role, setRole] = React.useState("Admin");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange1 = (event) => {
    setRole(event.target.value);
  };
  
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handleClickShowPassword1 = () => {
    setValues1({ ...values1, showConfirmPassword: !values.showConfirmPassword });
  };

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Navbar />
      <Paper className={classes.ukuranpaper}>
        <div className={classes.Head}>Tambah Akun Admin/Operator</div>
        <Divider />
        <FormControl component="fieldset">
          <div className={classes.pad}>
            <form className={classes.root} noValidate autoComplete="off">
              <div>
                <TextField
                  id="outlined-basic"
                  required
                  placeholder="Nama Lengkap"
                  variant="outlined"
                  style={{ width: "400px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div>
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
                        <SettingsApplicationsIcon  />
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
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  required
                  placeholder="Paraf"
                  variant="outlined"
                  style={{ width: "400px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BorderColorIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  required
                  placeholder="Username"
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
              </div>
              <div>
                <TextField
                  id="outlined-adornment-password"
                  required
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  variant="outlined"
                  style={{ width: "400px" }}
                  onChange={handleChange('password')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon/>
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
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                  placeholder="Password"
                />
              </div>
              <div>
                <TextField
                  id="outlined-adornment-password"
                  required
                  type={values.showConfirmPassword ? 'text' : 'password'}
                  value={values.confirmpassword}
                  variant="outlined"
                  style={{ width: "400px" }}
                  onChange={handleChange('confirmPassword')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon/>
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
                        {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                  placeholder="Confirm Password"
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

export default TambahAkunOperator;
