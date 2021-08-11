import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiCekNominalSPP extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiCekNominalSPP.INSTANCE === null) {
      ApiCekNominalSPP.INSTANCE = new ApiCekNominalSPP();
    }
    return ApiCekNominalSPP.INSTANCE;
  }

  getCekNominalSPPInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  cekNominalSPPPath = () => {
    return "transaksi/cek/nominal"
  };

  getCekNominalSPP = (instance, nis, jumlahBulan, callback) => {
    if (instance !== null) {
        let params ={
            nis : nis,
            jumlah_bulan : jumlahBulan,
        }
        // console.log("wad", params);
      let path = BASE_URL + this.cekNominalSPPPath();
      return instance
        .post(path, params)
        .then((response) => response)
        .catch((err) => alert(err.response.data.message));
    }
  };

  requestData = (data) => {
    if (Array.isArray(data)) {
      return Promise.all(data)
        .then((response) => {
            console.log("responz", response[0]);
            if (response) {
            return response[0]; 
          }
        })
        .catch((error) => alert(error.response.data.message));
    }
  };
}
