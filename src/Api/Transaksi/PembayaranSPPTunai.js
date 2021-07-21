import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiPembayaranSPPTunai extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiPembayaranSPPTunai.INSTANCE === null) {
      ApiPembayaranSPPTunai.INSTANCE = new ApiPembayaranSPPTunai();
    }
    return ApiPembayaranSPPTunai.INSTANCE;
  }

  getSPPInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  createSPPPath = () => {
    return "transaksi";
  };

  createDataSPP = (
    instance,
    nis,
    jumlahBulan,
    totalBayar,
    spp,
    infaq,
    callback
  ) => {
    if (instance !== null) {
      let params = {
        nis: nis,
        jumlah_bulan: jumlahBulan,
        total_bayar: totalBayar,
        spp: spp,
        infaq: infaq,
        status_transaksi: "Tunai",
        id_admin: sessionStorage.setItem("id_admin"),
      };
      let path = BASE_URL + this.createSPPPath();
      return instance
        .post(path, params)
        .then((response) => {
          console.log("ini awalan", response);
          callback();
        })

        .catch((err) => err);
    }
  };

  requestData = (data) => {
    if (Array.isArray(data)) {
      return Promise.all(data)
        .then((response) => {
          let result = [];
          for (let i = 0; i < response[0].data.transaksi.length; i++) {
            result.push(
              response[0].data.transaksi[i] ? response[0].data.transaksi[i] : null
            );
          }
          return result;
        })
        .catch((error) => error);
    }
  };
}