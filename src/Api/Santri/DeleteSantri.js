import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiDeleteSantri extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiDeleteSantri.INSTANCE === null) {
      ApiDeleteSantri.INSTANCE = new ApiDeleteSantri();
    }
    return ApiDeleteSantri.INSTANCE;
  }

  getSantriInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  deleteSantriPath = (id) => {
    return "santri/" + id;
  };

  deleteDataSantri = (instance, nis) => {
    if (instance !== null) {
      let params = {
        nis: nis,
      };
      let path = BASE_URL + this.deleteSantriPath(nis);
      return instance
        .delete(path, params)
        .then((response) => {
          console.log("ini awalan", response);
          return response;
        })

        .catch((err) => err);
    }
  };

  requestData = (data) => {
    if (Array.isArray(data)) {
      return Promise.all(data)
        .then((response) => {
          if (response[0].data.message === "Data Santri Berhasil Dihapus") {
            return response[0];
          }
        })
        .catch((error) => error);
    }
  };
}
