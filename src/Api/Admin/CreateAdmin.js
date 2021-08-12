import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiCreateAdmin extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiCreateAdmin.INSTANCE === null) {
      ApiCreateAdmin.INSTANCE = new ApiCreateAdmin();
    }
    return ApiCreateAdmin.INSTANCE;
  }

  getAdminInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  createAdminPath = () => {
    return "admin";
  };

  createDataAdmin = (
    instance,
    username,
    namaAdmin,
    role,
    paraf,
    password,
    callback
  ) => {
    if (instance !== null) {
      let params = {
        id_admin: 2,
        username: username,
        nama_admin: namaAdmin,
        role: role,
        password: password,
        paraf: paraf,
      };
      let path = BASE_URL + this.createAdminPath();
      return instance
        .post(path, params)
        .then((response) => {
          console.log("cekpw", response);
          callback();
        })

        .catch((err) => alert(err.response.data.message));
    }
  };

  requestData = (data) => {
    if (Array.isArray(data)) {
      return Promise.all(data)
        .then((response) => {
          console.log("ini create Admin", response);
          let result = [];
          for (let i = 0; i < response[0].data.admin.length; i++) {
            result.push(
              response[0].data.admin[i] ? response[0].data.admin[i] : null
            );
          }
          return result;
        })
        .catch((error) => alert(error.response.data.message));
    }
  };
}
