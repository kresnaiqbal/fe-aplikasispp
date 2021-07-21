import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiHitungJumlahUang extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiHitungJumlahUang.INSTANCE === null) {
      ApiHitungJumlahUang.INSTANCE = new ApiHitungJumlahUang();
    }
    return ApiHitungJumlahUang.INSTANCE;
  }

  getJumlahUangInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  showJumlahUangPath = () => {
    return "transaksi/hitung/uang";
  };

  getJumlahUang = (instance) => {
    if (instance !== null) {
      let path = BASE_URL + this.showJumlahUangPath();
      return instance
        .get(path)
        .then((response) => response)
        .catch((err) => err);
    }
  };

  requestData = (data) => {
    if (Array.isArray(data)) {
      console.log("data", data);
      return Promise.all(data)
        .then((response) => {
          let result = {};
          if (response) {
            result = response[0].data.uang_masuk;
            return result;
          }
        })
        .catch((error) => {
          console.log("wada", error);
          return error;
        });
    }
  };
}
