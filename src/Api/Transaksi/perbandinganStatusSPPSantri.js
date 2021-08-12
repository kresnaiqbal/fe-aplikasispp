import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiPerbandinganStatusSPP extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiPerbandinganStatusSPP.INSTANCE === null) {
      ApiPerbandinganStatusSPP.INSTANCE = new ApiPerbandinganStatusSPP();
    }
    return ApiPerbandinganStatusSPP.INSTANCE;
  }

  getStatusSPPInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  showStatusSPPPath = () => {
    return "transaksi/santri/persentase";
  };

  getStatusSPP = (instance) => {
    if (instance !== null) {
      let path = BASE_URL + this.showStatusSPPPath();
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
