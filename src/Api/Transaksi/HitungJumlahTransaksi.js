import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiHitungJumlahTransaksi extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiHitungJumlahTransaksi.INSTANCE === null) {
      ApiHitungJumlahTransaksi.INSTANCE = new ApiHitungJumlahTransaksi();
    }
    return ApiHitungJumlahTransaksi.INSTANCE;
  }

  getJumlahTransaksiInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  showJumlahTransaksiPath = () => {
    return "transaksi/uang/bulanan";
  };

  getJumlahTransaksi = (instance) => {
    if (instance !== null) {
      let path = BASE_URL + this.showJumlahTransaksiPath();
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
        let result = {};
        if (response) {
          console.log("jml transaksi", response);
           return response;
          }
        })
        .catch((error) => {
          alert(error.response.data.message)
          return error;
        });
    }
  };
}
