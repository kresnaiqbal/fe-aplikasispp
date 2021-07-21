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
      console.log("123", bulan);
      let path = BASE_URL + this.showLaporanUangMasukPath(bulan);
      return instance
        .get(path)
        .then((response) => response)
        .catch((err) => err);
    }
  };

  requestData = (data) => {
    if (Array.isArray(data)) {
      return Promise.all(data)
        .then((response) => {
          console.log("awe", response);
          let result = [];
          for (let i = 0; i < response[0].data.transaksi.length; i++) {
            result.push(
              response[0].data.transaksi[i]
                ? response[0].data.transaksi[i]
                : null
            );
          }
          return result;
        })
        .catch((error) => error);
    }
  };
}
