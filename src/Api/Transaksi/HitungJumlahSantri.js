import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiHitungJumlahSantri extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiHitungJumlahSantri.INSTANCE === null) {
      ApiHitungJumlahSantri.INSTANCE = new ApiHitungJumlahSantri();
    }
    return ApiHitungJumlahSantri.INSTANCE;
  }

  getJumlahSantriInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  showJumlahSantriPath = () => {
    return "transaksi/hitung/santri";
  };

  getJumlahSantri = (instance) => {
    if (instance !== null) {
      let path = BASE_URL + this.showJumlahSantriPath();
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
        let result = {};
        if (response) {
          result = response[0].data
            return result;
          }
        })
        .catch((error) => error);
    }
  };
}
