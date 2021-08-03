import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiEditAdmin extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiEditAdmin.INSTANCE === null) {
      ApiEditAdmin.INSTANCE = new ApiEditAdmin();
    }
    return ApiEditAdmin.INSTANCE;
  }

  getAdminInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  editAdminPath = (id) => {
    return "admin/" + id;
  };

  editDataAdmin = (instance, dataAdmin, namaAdmin, username, role, paraf, callback) => {
    if (instance !== null) {
      let params = {
        nama_admin: namaAdmin,
        username: username,
        role: role,
        paraf: paraf,
      };
      let path = BASE_URL + this.editAdminPath(dataAdmin.id_admin);
      return instance
        .put(path, params)
        .then((response) => {
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
          return result;
        })
        .catch((error) => alert(error.response.data.message));
    }
  };
}
