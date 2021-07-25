import React, { useEffect, useState, Fragment } from "react";
import { Paper, Typography, Button, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ApiHitungJumlahTransaksi } from "../Api";
import { Line } from "react-chartjs-2";
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
  paperSize: {
    width: "550px",
    height: "400px",
    borderRadius: "20px",
    marginTop: "20px",
    marginLeft: "80px",
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

export default function CardGraphHitungUang() {
  const classes = useStyles();
  const [transactionData, setTransactionData] = useState();
  let gateway = ApiHitungJumlahTransaksi.getInstance();

  let JumlahTransaksiInstance = gateway.getJumlahTransaksiInstance();
  useEffect(() => {
    let transaksiData = gateway.getJumlahTransaksi(JumlahTransaksiInstance);
    let result = gateway.requestData([transaksiData]);
    result.then((response) => {
      console.log("wadu", response);

      if (Array.isArray(response)) {
        for (let i = 0; i < response.length; i++) {
          if (response && response[i].status === 200) {
            if (i === 0) {
              let datachart = {};
              let labels = [];
              let totals = [];
              for (let j = 0; j < response[i].data.uang_masuk.length; j++) {
                labels.push(moment().month(response[i].data.uang_masuk[j].bulan-1).format('MMM'));
                totals.push(response[i].data.uang_masuk[j].total);
              }
              let datasets = [
                {
                  label: "Jumlah Pemasukan berdasarkan Bulan",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: "butt",
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: "miter",
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: totals,
                },
              ];
              console.log("label", labels);
              console.log("datasets", datasets);
              Object.assign( datachart, {'labels' :labels} );
              Object.assign( datachart, {'datasets': datasets} );
              console.log("data", datachart);
              setTransactionData(datachart);
            }
          }
        }
      }
    });
  }, []);
  console.log("jml", transactionData);

  return (
    <Paper className={classes.paperSize}>
      <Typography className={classes.Head}>Pemasukan</Typography>
      <Divider />
      {transactionData && <Line data={transactionData} />}
    </Paper>
  );
}
