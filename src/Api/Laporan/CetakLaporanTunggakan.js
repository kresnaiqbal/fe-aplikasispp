import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiExportLaporanTunggakan extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiExportLaporanTunggakan.INSTANCE === null) {
      ApiExportLaporanTunggakan.INSTANCE = new ApiExportLaporanTunggakan();
    }
    return ApiExportLaporanTunggakan.INSTANCE;
  }

  getExportLaporanTunggakanInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  exportLaporanTunggakanPath = () => {
    return "laporan/unduh/tunggakan"
  };

  getExportLaporanTunggakan = (instance) => {
    if (instance !== null) {
      let path = BASE_URL + this.exportLaporanTunggakanPath();
      return instance
        .get(path)
        .then((response) => response)
        .catch((err) => err);
    }
  };

  requestData = (data) => {
    // if (Array.isArray(data)) 
    // {
      return Promise.all(data)
        .then((response) => {
          if(response){
           console.log("responT", response);
           return response;
         }
        })
        .catch((error) => error);
    // }
  };
}
