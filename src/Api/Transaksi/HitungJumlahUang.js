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
    return "transaksi/total/bulanan";
  };

  getJumlahUang = (instance) => {
    if (instance !== null) {
      let path = BASE_URL + this.showJumlahUangPath();
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
          result = response[0].data.uang_masuk;
          console.log("jml uang", result);
            return result;
          }
        })
        .catch((error) => {
          alert(error.response.data.message)
          console.log("wada", error);
          return error;
        });
    }
  };
}
