import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiDeleteAdmin extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiDeleteAdmin.INSTANCE === null) {
      ApiDeleteAdmin.INSTANCE = new ApiDeleteAdmin();
    }
    return ApiDeleteAdmin.INSTANCE;
  }

  getAdminInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  deleteAdminPath = (id) => {
    return "admin/" + id;
  };

  deleteDataAdmin = (instance, id_admin) => {
    if (instance !== null) {
      let params = {
        id_admin: id_admin,
      };
      let path = BASE_URL + this.deleteAdminPath(id_admin);
      return instance
        .delete(path, params)
        .then((response) => {
          console.log("ini awalan", response);
          return response;
        })
        .catch((err) => alert(err.response.data.message));
    }
  };

  requestData = (data) => {
    if (Array.isArray(data)) {
      return Promise.all(data)
        .then((response) => {
          if (response[0].data.message === "Data Admin Berhasil Dihapus") {
            return response[0];
          }
        })
        .catch((error) => alert(error.response.data.message));
    }
  };
}
