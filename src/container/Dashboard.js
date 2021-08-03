import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CardGraphHitungUang from "./CardGraphHitungUang";
import CardDashboard from "./CardDashboard";
import CardGraphPersentaseKelas from "./CardGraphPersentaseKelas";
import { Grid, CircularProgress } from "@material-ui/core";
import { AssignmentTurnedIn, AssignmentLate, Money } from "@material-ui/icons";
import ApiHitungJumlahSantri from "../Api/Transaksi/HitungJumlahSantri";
import {
  ApiHitungJumlahUang,
  ApiHitungJumlahSantriMenunggak,
  ApiHitungJumlahUangDaily,
} from "../Api";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { getToken } from "../components/Common";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#C4C4C4",
    fontSize: 36,
  },
}));

function DashboardView() {
  const classes = useStyles();
  const history = useHistory();
  const [cardDashboard, setCardDashboard] = useState(null);
  const [hasResponse, setHasResponse] = useState(false);
  const [progress, setProgress] = React.useState(0);

  let gateway = ApiHitungJumlahSantri.getInstance();
  let gatewayUang = ApiHitungJumlahUang.getInstance();
  let gatewayTunggakan = ApiHitungJumlahSantriMenunggak.getInstance();
  let gatewayUangDaily = ApiHitungJumlahUangDaily.getInstance();

  let JumlahSantriInstance = gateway.getJumlahSantriInstance();
  let JumlahUangInstance = gatewayUang.getJumlahUangInstance();
  let JumlahTunggakanInstance =
    gatewayTunggakan.getJumlahSantriMenunggakInstance();
  let JumlahUangDailyInstance = gatewayUangDaily.getJumlahUangDailyInstance();

  useEffect(() => {
    const token = getToken();
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR',
    })

    if (!token) {
      history.push("/");
    } else {
      let jumlahSantriData = gateway.getJumlahSantri(JumlahSantriInstance);
      let jumlahSantriMenunggakData = gatewayTunggakan.getJumlahSantriMenunggak(
        JumlahTunggakanInstance
      );
      let jumlahUangData = gatewayUang.getJumlahUang(JumlahUangInstance);
      let jumlahUangDailyData = gatewayUangDaily.getJumlahUangDaily(
        JumlahUangDailyInstance
      );
      // let jumlahUangDailyData = gatewayUangDaily.getJumlahUangDaily(JumlahUangDailyInstance);

      let result = gateway.requestData([
        jumlahSantriData,
        jumlahSantriMenunggakData,
        jumlahUangDailyData,
        jumlahUangData,
      ]);
      result.then((response) => {
        let cardData = [];
        for (let i = 0; i < response.length; i++) {
          setHasResponse(true);
          if (response[i].status === 200) {
            if (i === 0) {
              cardData.push({
                title: "Jumlah Santri Lunas",
                data: response[i].data.santri,
                // data: 0,
                icon: <AssignmentTurnedIn className={classes.icon} />,
                color: "#3B945E",
              });
            } else if (i === 1) {
              cardData.push({
                title: "Jumlah Santri yang Menunggak",
                data: response[i].data.santri,
                // data: 0,
                icon: <AssignmentLate className={classes.icon} />,
                color: "#000000",
              });
            } else if (i === 2) {
              cardData.push({
                title: "Jumlah Uang Masuk hari ini",
                data: formatter.format(response[i].data.uang_masuk),
                // data: 0,
                icon: <Money className={classes.icon} />,
                color: "#FC7D58",
              });
            } else if (i === 3) {
              cardData.push({
                title: "Jumlah Uang Masuk bulan ini",
                data: formatter.format(response[i].data.uang_masuk),
                // data: 0,
                icon: <Money className={classes.icon} />,
                color: "#DFE313",
              });
            }
          }
        }
        // console.log("CARd daTA", cardData);
        setCardDashboard(cardData);
      });
    }
    clearInterval(timer);
  }, [hasResponse]);


  if (!hasResponse) {
    console.log("return loading");
    return <CircularProgress variant="determinate" value={progress} />;
  }

  

  return (
    <div>
      <Navbar />
      <Grid container direction="row">
        {cardDashboard &&
          cardDashboard.map((data) => (
            <Grid item xs={6} sm={6} md={3} lg={3} xl={3} style={{marginBottom:'30px'}}>
              <CardDashboard params={data} />
            </Grid>
          ))}
      </Grid>
      <Grid container direction="row">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CardGraphHitungUang />
        </Grid>
        {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <CardGraphPersentaseKelas /> 
        </Grid> */}
      </Grid>
    </div>
  );
}

export default DashboardView;
