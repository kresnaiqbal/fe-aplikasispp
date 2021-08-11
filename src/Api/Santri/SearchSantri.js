import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiSearchSantri extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiSearchSantri.INSTANCE === null) {
      ApiSearchSantri.INSTANCE = new ApiSearchSantri();
    }
    return ApiSearchSantri.INSTANCE;
  }

  getSearchSantriInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  searchSantriPath = (santri) => {
    return "santri/cari/" + santri;
  };

  getSearchSantri = (instance, namaSantri, callback) => {
    if (instance !== null) {
      let santri = namaSantri;
      let path = BASE_URL + this.searchSantriPath(santri);
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
          if (response) {
            //  console.log("responz", response);
            return response;
          }
        })
        .catch((error) => alert(error.response.data.message));
    }
  };
}
