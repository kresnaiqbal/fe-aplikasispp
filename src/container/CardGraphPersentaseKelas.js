import React, { useEffect, useState, Fragment } from "react";
import { Paper, Typography, Button, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paperSize: {
    width: "440px",
    height: "400px",
    borderRadius: "20px",
    marginTop: "20px",
    marginLeft: "40px",
    boxShadow: "5px 5px 5px #929191",
  },
  Head: {
    color: "#368756",
    fontSize: "18px",
    fontFamily: "Roboto",
    fontWeight: 700,
    paddingTop: "20px",
    paddingLeft: "20px",
  },
}));

export default function CardGraphPersentaseKelas(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.paperSize}>
      <Typography className={classes.Head}>Persentase Siswa Lunas</Typography>
      <Divider />
    </Paper>
  );
}
