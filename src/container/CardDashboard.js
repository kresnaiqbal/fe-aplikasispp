import React, { useState } from "react";
import { Paper, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  Paper: {
    width: "200px",
    height: "100px",
    borderRadius: "20px",
    marginTop: "-20px",
    marginLeft: "80px",
    boxShadow: "1px 1px 1px #929191",
  },
  Head: {
    color: "black",
    fontSize: 13,
    fontFamily: "Roboto",
    fontWeight: 700,
    paddingTop: "10px",
    paddingBottom: "5px",
    paddingLeft: "20px",
  },
  data: {
    color: "black",
    fontSize: 24,
    fontFamily: "Roboto",
    fontWeight: 700,
    paddingLeft: "20px",
  },
}));

export default function CardDashboard({ params }) {
  const classes = useStyles();
  const [dataJumlahSantri, setJumlahSantri] = useState([]);


  return (
    <Paper
      className={classes.Paper}
      style={{ borderLeft: `5px solid ${params.color}` }}
    >
      <Grid container direction="row">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography className={classes.Head}>
            {params && params.title}
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="row">
        {/* {dataJumlahSantri && */}
        <Grid item xs={6} sm={6} md={8} lg={8} xl={8}>
          <Typography className={classes.data}>
            {params && params.data}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
            {params && params.icon}
        </Grid>
        {/* } */}
      </Grid>
    </Paper>
  );
}
