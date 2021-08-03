import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import {
  Paper,
  Typography,
  Grid,
  Divider,
  Link,
  Button,
} from "@material-ui/core";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { ApiDetailAdmin } from "../../Api";

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
    color: "black",
    fontSize: "24px",
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
  data: {
    fontSize: "24px",
  },
  header: {
    color: "#969696",
    fontSize: "20px",
  },
}));

function DetailDataOperator() {
  const params = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [dataAdmin, setDataAdmin] = React.useState(null);

  let gateway = ApiDetailAdmin.getInstance();

  let AdminInstance = gateway.getAdminInstance();

  useEffect(() => {
    if (params && params.id) {
      let adminData = gateway.getDetailAdmin(AdminInstance, params.id);

      let result = gateway.requestData([adminData]);
      result.then((response) => {
        if (response && response[0].status === 200) {
          setDataAdmin(response[0].data.admin);
        }
      });
    }
  }, [params]);

  return (
    <div>
      <Navbar />
      <Paper className={classes.paperSize}>
        <div className={classes.Head}>Detail Data Admin/Operator</div>
        <Divider style={{ marginBottom: "10px" }} />
        <Grid container direction="row">
          <Grid
            xs={6}
            sm={6}
            md={6}
            lg={4}
            xl={4}
            style={{ marginLeft: "30px", marginBottom: "30px" }}
          >
            <Typography className={classes.header}>Nama Lengkap</Typography>
            {dataAdmin && dataAdmin.nama_admin && (
              <Typography className={classes.data}>
                {dataAdmin.nama_admin}
              </Typography>
            )}
          </Grid>
          <Grid
            xs={6}
            sm={6}
            md={6}
            lg={4}
            xl={4}
            style={{ marginLeft: "30px", marginBottom: "30px" }}
          >
            <Typography className={classes.header}>Role</Typography>
            {dataAdmin && dataAdmin.role && (
              <Typography className={classes.data}>
                Role :{dataAdmin.role}
              </Typography>
            )}
          </Grid>
          <Grid
            xs={6}
            sm={6}
            md={6}
            lg={4}
            xl={4}
            style={{ marginLeft: "30px", marginBottom: "30px" }}
          >
            <Typography className={classes.header}>Paraf</Typography>
            {dataAdmin && dataAdmin.paraf && (
              <Typography className={classes.data}>
                {dataAdmin.paraf}
              </Typography>
            )}
          </Grid>
          <Grid
            xs={6}
            sm={6}
            md={6}
            lg={4}
            xl={4}
            style={{ marginLeft: "30px", marginBottom: "30px" }}
          >
            <Typography className={classes.header}>Username</Typography>
            {dataAdmin && dataAdmin.username && (
              <Typography className={classes.data}>
                {dataAdmin.username}
              </Typography>
            )}
          </Grid>
          <Grid
            xs={6}
            sm={6}
            md={6}
            lg={4}
            xl={4}
            style={{ marginLeft: "30px", marginBottom: "30px" }}
          >
            <Link to={`${process.env.PUBLIC_URL}/akunadmin`}>
              <Button
                variant="contained"
                color="#969696"
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
                Kembali
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default DetailDataOperator;
