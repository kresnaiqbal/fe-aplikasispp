import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CardGraphHitungUang from "./CardGraphHitungUang";
import CardDashboard from "./CardDashboard";
import CardGraphPersentaseKelas from "./CardGraphPersentaseKelas";
import { Grid, Typography } from "@material-ui/core";
import { AssignmentTurnedIn, AssignmentLate, Money } from "@material-ui/icons";
import ApiHitungJumlahSantri from "../Api/Transaksi/HitungJumlahSantri";
import { ApiHitungJumlahUang } from "../Api";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#C4C4C4",
    fontSize: 36,
  },
}));

function DashboardView() {
  const classes = useStyles();
  const [cardDashboard, setCardDashboard] = useState(null);
  const [hasResponse, setHasResponse] = useState(false);

  let gateway = ApiHitungJumlahSantri.getInstance();
  let gatewayUang = ApiHitungJumlahUang.getInstance();

  let JumlahSantriInstance = gateway.getJumlahSantriInstance();
  let JumlahUangInstance = gatewayUang.getJumlahUangInstance();

  useEffect(() => {
    let jumlahSantriData = gateway.getJumlahSantri(JumlahSantriInstance);
    let jumlahUangData = gatewayUang.getJumlahUang(JumlahUangInstance);

    let result = gateway.requestData([jumlahSantriData]);
    result.then((response) => {
      if (response) {
        setHasResponse(true);
        // setJumlahSantri(response.santri);
        let cardData = [
          {
            title: "Jumlah Santri Lunas",
            data: response.santri,
            // data: 0,
            icon: <AssignmentTurnedIn className={classes.icon} />,
            color: "#3B945E",
          },
          {
            title: "Jumlah Santri Menunggak",
            data: 200,
            icon: <AssignmentLate className={classes.icon} />,
            color: "#000000",
          },
          {
            title: "Jumlah Uang Masuk hari ini",
            data: 200,
            icon: <Money className={classes.icon} />,
            color: "#FC7D58",
          },
          {
            title: "Jumlah Uang Masuk bulan ini",
            data: 200,
            icon: <Money className={classes.icon} />,
            color: "#DFE313",
          },
        ];
        setCardDashboard(cardData);
      }
    });
  }, [hasResponse]);

  if (!hasResponse) {
    console.log("return loading");
    return <Typography>loading data</Typography>;
  }
  console.log("lala", cardDashboard);
  return (
    <div>
      <Navbar />
      <Grid container direction="row">
        {cardDashboard &&
          cardDashboard.map((data) => (
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              <CardDashboard params={data} />
            </Grid>
          ))}
      </Grid>
      <Grid container direction="row">
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <CardGraphHitungUang />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <CardGraphPersentaseKelas />
        </Grid>
      </Grid>
    </div>
  );
}

export default DashboardView;
