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
  const [namaAdmin, setNamaAdmin] = useState();
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
        if (response && response[0].status === 200) {
          setDataAdmin(response[0].data.admin);
          setNamaAdmin(response[0].data.admin.nama_admin);
          setUsername(response[0].data.admin.username);
          setRole(response[0].data.admin.role);
          setParaf(response[0].data.admin.paraf);
        }
      });
    }
  }, [params]);


  const handleChange1 = (event) => {
    setRole(event.target.value);
  };

  const handleChangeNamaAdmin = (event) => {
    setNamaAdmin(event.target.value);
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangeParaf = (event) => {
    setParaf(event.target.value);
    // console.log(event.target.value);
  };

  const handleEditAdmin = (callback) => {
    let gateway = ApiEditAdmin.getInstance();
    let AdminInstance = gateway.getAdminInstance();
    let adminData = gateway.editDataAdmin(
      AdminInstance,
      dataAdmin,
      namaAdmin,
      username,
      role,
      paraf,
      callback
    );
  };

  return (
    <div>
      <Navbar />
      <Paper className={classes.paperSize}>
        <div className={classes.Head}>Sunting data Admin/Operator</div>
        <Divider />
        <FormControl component="fieldset">
          <div className={classes.pad}>
            <form className={classes.root} noValidate autoComplete="off">
              <div>
                {dataAdmin && dataAdmin.nama_admin && (
                  <TextField
                    id="outlined-basic"
                    required
                    placeholder="Nama Lengkap"
                    variant="outlined"
                    style={{ width: "400px" }}
                    value={namaAdmin}
                    onChange={handleChangeNamaAdmin}
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
                {dataAdmin && dataAdmin.role && (
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
                )}
              </div>
              <div>
                {dataAdmin && dataAdmin.paraf && (
                  <TextField
                    id="outlined-basic"
                    placeholder="Paraf"
                    variant="outlined"
                    onChange={handleChangeParaf}
                    value={paraf}
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
                {dataAdmin && dataAdmin.username && (
                  <TextField
                    id="outlined-basic"
                    required
                    placeholder="Username"
                    onChange={handleChangeUsername}
                    value={username}
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
                  Sunting
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
