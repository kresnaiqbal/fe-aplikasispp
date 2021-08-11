import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiRejectTransfer extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiRejectTransfer.INSTANCE === null) {
      ApiRejectTransfer.INSTANCE = new ApiRejectTransfer();
    }
    return ApiRejectTransfer.INSTANCE;
  }

  getRejectTransferInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  rejectTransferPath = (id) => {
    return "transfer/" + id;
  };

  rejectTransfer = (instance, id_transfer) => {
    if (instance !== null) {
      let params = {
        id_transfer: id_transfer,
      };
      let path = BASE_URL + this.rejectTransferPath(id_transfer);
      return instance
        .put(path, params)
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
            if (response[0].data.message === "Transfer Tidak Valid, Silahkan Hubungi Admin") {
                console.log("masuk apa ngga", response[0]);
                return response;
          }
        })
        .catch((error) => alert(error.response.data.message));
    }
  };
}
