import React, { useEffect, useState, Fragment } from "react";
import { Paper, Typography, Button, Divider, CardHeader, Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ApiHitungJumlahTransaksi } from "../Api";
import { Line } from "react-chartjs-2";
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
  paperSize: {
    width: "650px",
    height: "400px",
    // marginLeft: "80px",
    boxShadow: "0 .15rem 1.75rem 0 rgba(58,59,69,.15)!important",
  },
  Head: {
    color:"#3B945E",
    fontSize: "18px",
    fontFamily: "Roboto",
    fontWeight: 700,
    paddingTop: "10px",
    paddingLeft: "20px",
  },
}));

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export default function CardGraphHitungUang() {
  const classes = useStyles();
  const [transactionData, setTransactionData] = useState();
  let gateway = ApiHitungJumlahTransaksi.getInstance();

  let JumlahTransaksiInstance = gateway.getJumlahTransaksiInstance();
  useEffect(() => {
    let transaksiData = gateway.getJumlahTransaksi(JumlahTransaksiInstance);
    let result = gateway.requestData([transaksiData]);
    result.then((response) => {
      // console.log("wadu", response);

      if (Array.isArray(response)) {
        for (let i = 0; i < response.length; i++) {
          if (response && response[i].status === 200) {
            if (i === 0) {
              let datachart = {};
              let labels = [];
              let totals = [];
              for (let j = 0; j < response[i].data.uang_masuk.length; j++) {
                labels.push(moment().month(response[i].data.uang_masuk[j].bulan-1).format('MMMM'));
                totals.push(response[i].data.uang_masuk[j].total);
              }
              let datasets = [
                {
                  label: "Jumlah Pemasukan",
                  fill: true,
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
              Object.assign( datachart, {'labels' :labels} );
              Object.assign( datachart, {'datasets': datasets} );
              setTransactionData(datachart);
            }
          }
        }
      }
    });
  }, []);


  return (
    <Paper className={classes.paperSize}>
      <Typography className={classes.Head}>Overview Pemasukan SPP</Typography>
      <Divider style={{marginTop:"10px"}} />
      <Grid style={{padding:8}}>

      {transactionData && <Line data={transactionData} options={options} />}
      </Grid>
    </Paper>
  );
}
