import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api";

export default class ApiShowRiwayatTransfer extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiShowRiwayatTransfer.INSTANCE === null) {
      ApiShowRiwayatTransfer.INSTANCE = new ApiShowRiwayatTransfer();
    }
    return ApiShowRiwayatTransfer.INSTANCE;
  }

  getRiwayatTransferInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  showRiwayatTransferPath = () => {
    return "/transfer";
  };

  getDataRiwayatTransfer = (instance) => {
    if (instance !== null) {
      let path = BASE_URL + this.showRiwayatTransferPath();
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
          // console.log('a', response[0].data.transfer[0])
          let result = [];
          console.log("bismillah", response);
          for (let i = 0; i < response[0].data.transfer.length; i++) {
            if (response[0].data.transfer[i].status_transfer !== "Gagal Verifikasi") {
              result.push(
                response[0].data.transfer[i]
                  ? response[0].data.transfer[i]
                  : null
              );
            }
          }
          console.log("bismillah", result);
          return result;
        })
        .catch((error) => alert(error.response.data.message));
    }
  };
}
