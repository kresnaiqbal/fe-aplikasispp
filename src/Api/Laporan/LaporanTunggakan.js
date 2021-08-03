import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiShowLaporanTunggakan extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiShowLaporanTunggakan.INSTANCE === null) {
      ApiShowLaporanTunggakan.INSTANCE = new ApiShowLaporanTunggakan();
    }
    return ApiShowLaporanTunggakan.INSTANCE;
  }

  getLaporanTunggakanInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  showLaporanTunggakanPath = () => {
    return "laporan/tunggakan";
  };

  getDataLaporanTunggakan = (instance) => {
    if (instance !== null) {
      let path = BASE_URL + this.showLaporanTunggakanPath();
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
          // console.log("awe", response);
          if(response){
            // console.log("responz", response);
            return response;
          }
          // return result;
        })
        .catch((error) => alert(error.response.data.message));
    }
  };
}
