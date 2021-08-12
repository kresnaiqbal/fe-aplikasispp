import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiShowLaporanUangMasuk extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiShowLaporanUangMasuk.INSTANCE === null) {
      ApiShowLaporanUangMasuk.INSTANCE = new ApiShowLaporanUangMasuk();
    }
    return ApiShowLaporanUangMasuk.INSTANCE;
  }

  getLaporanUangMasukInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  showLaporanUangMasukPath = (bulan) => {
    return "laporan/uang/" + bulan;
  };

  getDataLaporanUangMasuk = (instance,month,callback) => {
    if (instance !== null) {
      let bulan = month;
      console.log("bulan berapa", bulan);
      let path = BASE_URL + this.showLaporanUangMasukPath(bulan);
      return instance
        .get(path)
        .then((response) => response)
        .catch((err) => alert(err.response.data.message));
    }
  };

  requestData = (data) => {
    if (Array.isArray(data)) {
      return Promise.all(data)
        .then((response) => {
          if(response){
          //  console.log("responz", response);
           return response;
         }
        })
        .catch((error) => alert(error.response.data.message));
    }
  };
}
