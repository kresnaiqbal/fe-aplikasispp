import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiHitungJumlahSantriMenunggak extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiHitungJumlahSantriMenunggak.INSTANCE === null) {
      ApiHitungJumlahSantriMenunggak.INSTANCE = new ApiHitungJumlahSantriMenunggak();
    }
    return ApiHitungJumlahSantriMenunggak.INSTANCE;
  }

  getJumlahSantriMenunggakInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  showJumlahSantriMenunggakPath = () => {
    return "transaksi/santri/tunggakan";
  };

  getJumlahSantriMenunggak = (instance) => {
    if (instance !== null) {
      let path = BASE_URL + this.showJumlahSantriMenunggakPath();
      return instance
        .get(path)
        .then((response) => response)
        .catch((err) => err);
    }
  };

  requestData = (data) => {
    if (Array.isArray(data)) {
      console.log("nunggak", data);
      return Promise.all(data)
        .then((response) => {
          let result = {};
          if (response) {
            result = response[0].data.uang_masuk;
            return result;
          }
        })
        .catch((error) => {
          // console.log("wada", error);
          return error;
        });
    }
  };
}
