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
    return "Admin/" + id;
  };

  editDataAdmin = (
    instance,
    dataAdmin,
    role,
    username,
    password,
    callback,
  ) => {
    if (instance !== null) {
      let params = {
        nama_admin: dataAdmin.nama_admin,
        role: role,
        username: username,
        password: password,
      };
      let path = BASE_URL + this.editAdminPath(dataAdmin.id_admin);
      return instance
        .put(path, params)
        .then((response) => {
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
          return result;
        })
        .catch((error) => error);
    }
  };

}