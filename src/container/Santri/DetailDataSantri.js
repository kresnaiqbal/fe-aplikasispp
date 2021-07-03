import React from "react";
import Navbar from "../../components/Navbar";
import { Paper, Button, Divider } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
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
}));

function DetailDataSantri() {
  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Paper className={classes.ukuranpaper}>
        <div className={classes.Head}>Detail Data Santri</div>
        <Divider />
        
      </Paper>
    </div>
  );
}

export default DetailDataSantri;
