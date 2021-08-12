import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiUbahNominalSPP extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiUbahNominalSPP.INSTANCE === null) {
      ApiUbahNominalSPP.INSTANCE = new ApiUbahNominalSPP();
    }
    return ApiUbahNominalSPP.INSTANCE;
  }

  getSPPInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  createSPPPath = () => {
    return "transaksi/nominal";
  };

  createDataSPP = (instance, tahun, nominalSPP, spp, infaq, callback) => {
    if (instance !== null) {
      let params = {
        tahun_ajaran: tahun,
        nominal_spp: nominalSPP,
        uang_spp: spp,
        uang_infaq: infaq,
      };
      let path = BASE_URL + this.createSPPPath();
      return instance
        .post(path, params)
        .then((response) => {
          console.log("ini awalan", response);
          callback();
        })

        .catch((err) => alert(err.response.data.message));
    }
  };

  requestData = (data) => {
    if (Array.isArray(data)) {
      return Promise.all(data)
        .then((response) => {
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
        .catch((error) => alert(error.response.data.message));
    }
  };
}
