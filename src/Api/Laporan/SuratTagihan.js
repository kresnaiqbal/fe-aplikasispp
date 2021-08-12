import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiCetakSuratTagihan extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiCetakSuratTagihan.INSTANCE === null) {
      ApiCetakSuratTagihan.INSTANCE = new ApiCetakSuratTagihan();
    }
    return ApiCetakSuratTagihan.INSTANCE;
  }

  getSuratTagihanInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  cetakSuratTagihanPath = (nis) => {
    return "laporan/unduh/tagihan/" + nis + "?nis=" + nis;
  };

  getSuratTagihan = (instance, nis, callback) => {
    if (instance !== null) {
      let path = BASE_URL + this.cetakSuratTagihanPath(nis);
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
          if (response) {
            return response[0];
          }
        })
        .catch((error) => error);
    }
  };
}
