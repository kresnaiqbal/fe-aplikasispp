import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiApprovalTransaksi extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiApprovalTransaksi.INSTANCE === null) {
      ApiApprovalTransaksi.INSTANCE = new ApiApprovalTransaksi();
    }
    return ApiApprovalTransaksi.INSTANCE;
  }

  getApprovalInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  editApprovalPath = (id, admin_id) => {
    return "transfer/" + id + "?id_admin=" + admin_id;
  };

  editDataApproval = (instance, admin_id, id_tf) => {
    if (instance !== null) {
      let path = BASE_URL + this.editApprovalPath(id_tf, admin_id);
      return instance
        .delete(path)
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
          if (response) {
            return response[0];
          }
        })
        .catch((error) => alert(error.response.data.message));
    }
  };
}
