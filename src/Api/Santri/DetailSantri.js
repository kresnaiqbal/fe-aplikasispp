import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiDetailSantri extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiDetailSantri.INSTANCE === null) {
      ApiDetailSantri.INSTANCE = new ApiDetailSantri();
    }
    return ApiDetailSantri.INSTANCE;
  }

  getSantriInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  getDetailSantriPath = (id) => {
    return "santri/" + id;
  };

  getDetailSantri = (instance, nis) => {
    if (instance !== null) {
      let path = BASE_URL + this.getDetailSantriPath(nis);
      return instance
        .get(path)
        .then((response) => response)
        .catch((err) => alert(err.response.data.message));
    }
  };

  requestData = (data) => {
    if (Array.isArray(data)) {
      // console.log('ini detail', data);
      return Promise.all(data)
        .then((response) => {
          if (response) {
            console.log("aw", response);
            return response;
          }
        })
        .catch((error) => alert(error.response.data.message));
    }
  };
}
