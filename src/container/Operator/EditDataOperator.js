import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  Paper,
  Button,
  Divider,
  FormControl,
  TextField,
  MenuItem,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PersonIcon from "@material-ui/icons/Person";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { ApiDetailAdmin, ApiEditAdmin } from "../../Api";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";

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

function EditDataOperator() {
  const params = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [dataAdmin, setDataAdmin] = useState();
  const [password, setPassword] = useState({
    password: "",
    showPassword: false,
  });
  const [values1, setValues1] = useState({
    confirmPassword: "",
    showConfirmPassword: false,
  });
  const [role, setRole] = useState();
  const [username, setUsername] = useState();
  const [paraf, setParaf] = useState();

  let gateway = ApiDetailAdmin.getInstance();

  let AdminInstance = gateway.getAdminInstance();

  useEffect(() => {
    if (params && params.id) {
      let adminData = gateway.getDetailAdmin(AdminInstance, params.id);

      let result = gateway.requestData([adminData]);
      result.then((response) => {
        console.log('ini awa', response);
        if (response) {
          setDataAdmin(response);
          setUsername(response.username);
          setRole(response.role);
          setParaf(response.paraf);
          setPassword(response.password);
        }
      });
    }
  }, [params]);

  const handleEditAdmin = (callback) => {
    let gateway = ApiEditAdmin.getInstance();
    let AdminInstance = gateway.getAdminInstance();
    let adminData = gateway.createDataAdmin(
      AdminInstance,
      dataAdmin,
      username,
      role,
      paraf,
      password,
      callback
    );
  };

  const handleChange = (prop) => (event) => {
    setPassword({ ...password, [prop]: event.target.value });
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
    setValues1({
      ...values1,
      showConfirmPassword: !values1.showConfirmPassword,
    });
  };

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangeParaf = (event) => {
    setParaf(event.target.value);
    // console.log(event.target.value);
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
              <div>
                {dataAdmin && (
                  <TextField
                    id="outlined-basic"
                    required
                    placeholder="Nama Lengkap"
                    variant="outlined"
                    style={{ width: "400px" }}
                    value={dataAdmin.nama_admin}
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </div>
              <div>
                {dataAdmin && dataAdmin.nama_admin && (
                  <TextField
                    id="outlined-select-gender"
                    required
                    select
                    value={role}
                    onChange={handleChange1}
                    value={dataAdmin.nama_role}
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
                )}
              </div>
              <div>
                {dataAdmin && dataAdmin.nama_admin && (
                  <TextField
                    id="outlined-basic"
                    placeholder="Paraf"
                    variant="outlined"
                    onChange={handleChangeParaf}
                    value={dataAdmin.paraf}
                    style={{ width: "400px" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BorderColorIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </div>
              <div>
                {dataAdmin && dataAdmin.nama_admin && (
                  <TextField
                    id="outlined-basic"
                    required
                    placeholder="Username"
                    onChange={handleChangeUsername}
                    value={dataAdmin.username}
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
                )}
              </div>
              <div style={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "10px" }}
                  onClick={() =>
                    handleEditAdmin(() => history.push("/akunadmin"))
                  }
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

export default EditDataOperator;
