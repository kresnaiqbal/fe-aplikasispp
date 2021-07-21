import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiDetailAdmin extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiDetailAdmin.INSTANCE === null) {
      ApiDetailAdmin.INSTANCE = new ApiDetailAdmin();
    }
    return ApiDetailAdmin.INSTANCE;
  }

  getAdminInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  getDetailAdminPath = (id) => {
    return "admin/" + id;
  };

  getDetailAdmin = (instance, id_admin) => {
    if (instance !== null) {
      let path = BASE_URL + this.getDetailAdminPath(id_admin);
      return instance
        .get(path)
        .then((response) => response)
        .catch((err) => err);
    }
  };

  requestData = (data) => {
    if (Array.isArray(data)) {
      console.log('ini detail', data);
      return Promise.all(data)
        .then((response) => {
          if(response[0].data.admin){
              console.log('ini detail', response);
              return response[0].data.admin;
          }}
        )
        .catch((error) => error);
    }
  };
}
