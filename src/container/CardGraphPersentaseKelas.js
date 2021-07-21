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
  // const state = {
  //   progress: 50,
  // };

  // const handleIncrement = () => {
  //   if (this.state.progress !== 100) {
  //     this.setState(
  //       (prevState) => ({ progress: prevState.progress + 1 }),
  //       () => console.log(this.state.progress)
  //     );
  //   } else alert("oops, you hit the max value!");
  // };

  // const handleDecrement = () => {
  //   if (this.state.progress !== 0) {
  //     this.setState(
  //       (prevState) => ({ progress: prevState.progress - 1 }),
  //       () => console.log(this.state.progress)
  //     );
  //   } else alert("oops, you hit the min value!");
  // };

  // const test = this.state.progress + "%";
  // var style = { width: test };
  return (
    <Paper className={classes.paperSize}>
      <Typography className={classes.Head}>Persentase Siswa Lunas</Typography>
      <Divider />
      {/* <div className="flex-container">
        <h1>react progress bar</h1>
        <div className="progress" data-label={`${test} completed`}>
          <span className="value" style={style}></span>
        </div>
        <br />
        <div>
          <button className="button" onClick={this.handleDecrement}>
            -
          </button>
          <button className="button" onClick={this.handleIncrement}>
            +
          </button>
        </div>
      </div> */}
    </Paper>
  );
}
