import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api";

export default class ApiShowRejectedTransfer extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiShowRejectedTransfer.INSTANCE === null) {
      ApiShowRejectedTransfer.INSTANCE = new ApiShowRejectedTransfer();
    }
    return ApiShowRejectedTransfer.INSTANCE;
  }

  getRejectedTransferInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  showRejectedTransferPath = () => {
    return "/transfer/failed";
  };

  getDataRejectedTransfer = (instance) => {
    if (instance !== null) {
      let path = BASE_URL + this.showRejectedTransferPath();
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
          let result = [];
          for (let i = 0; i < response[0].data.transfer.length; i++) {
            if (response[0].data.transfer[i].status_transfer === "Gagal Verifikasi") {
              result.push(
                response[0].data.transfer[i]
                  ? response[0].data.transfer[i]
                  : null
              );
            }
          }
          return result;
        })
        .catch((error) => alert(error.response.data.message));
    }
  };
}
