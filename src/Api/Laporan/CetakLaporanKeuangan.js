import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiDownloadLaporanUangMasuk extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiDownloadLaporanUangMasuk.INSTANCE === null) {
      ApiDownloadLaporanUangMasuk.INSTANCE = new ApiDownloadLaporanUangMasuk();
    }
    return ApiDownloadLaporanUangMasuk.INSTANCE;
  }

  getDownloadLaporanInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  downloadLaporanUangMasukPath = (bulan) => {
    return "laporan/unduh/uang/" + bulan;
  };

  getDownloadLaporanUangMasuk = (instance,month) => {
    if (instance !== null) {
      let bulan = month;
      console.log("unduh lap", bulan);
      let path = BASE_URL + this.downloadLaporanUangMasukPath(bulan);
      return instance
        .get(path)
        .then((response) => response)
        .catch((err) => err);
    }
  };

  requestData = (data) => {
    // if (Array.isArray(data)) 
    // {
      return Promise.all(data)
        .then((response) => {
          if(response){
          //  console.log("responz", response);
           return response;
         }
        })
        .catch((error) => error);
    // }
  };
}
