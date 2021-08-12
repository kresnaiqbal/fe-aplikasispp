import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Divider,
  CardHeader,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ApiPerbandinganStatusSPP } from "../Api";
import { Doughnut } from "react-chartjs-2";
import moment from "moment";
import "../css/fonts.css";

const useStyles = makeStyles(() => ({
  paperSize: {
    width: "440px",
    height: "400px",
    marginLeft: 50,
    boxShadow: "0 .15rem 1.75rem 0 rgba(58,59,69,.15)!important",
  },
  Head: {
    color: "#3B945E",
    fontSize: "18px",
    fontFamily: "Roboto",
    fontWeight: 700,
    paddingTop: "10px",
    paddingLeft: "20px",
  },
}));

export default function CardDoughnutChart(props) {
  const classes = useStyles();
  const [transactionData, setTransactionData] = useState();
  let gateway = ApiPerbandinganStatusSPP.getInstance();

  let StatusSPPInstance = gateway.getStatusSPPInstance();
  useEffect(() => {
    let statusSPPData = gateway.getStatusSPP(StatusSPPInstance);
    let result = gateway.requestData([statusSPPData]);
    result.then((response) => {
      console.log("wadu", response);

      if (Array.isArray(response)) {
        if (response && response[0].status === 200) {
          let datachart = {};
          let labels = ["Siswa Menunggak", "Siswa Lunas"];
          let menunggak = response[0].data.tunggakan;
          let lunas = response[0].data.lunas;
          let datasets = [
            {
              label: "#",
              fill: true,
              backgroundColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              data: [menunggak, lunas],
            },
          ];
          Object.assign(datachart, { labels: labels });
          Object.assign(datachart, { datasets: datasets });
          setTransactionData(datachart);
        }
      }
    });
  }, []);
  return (
    <Paper className={classes.paperSize}>
      <Typography className={classes.Head}>Persentase Siswa Lunas</Typography>
      <Divider style={{ marginTop: "10px" }} />
      <Grid container direction="row" style={{display:"flex", alignItems:"center"}}>
        {transactionData && (
          <Doughnut
            data={transactionData}
            // width={"60%"}
            height={"320%"}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        )}
      </Grid>
    </Paper>
  );
}
