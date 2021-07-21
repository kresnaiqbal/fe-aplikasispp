import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiEditSantri extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiEditSantri.INSTANCE === null) {
      ApiEditSantri.INSTANCE = new ApiEditSantri();
    }
    return ApiEditSantri.INSTANCE;
  }

  getSantriInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  editSantriPath = (id) => {
    return "santri/" + id;
  };

  editDataSantri = (
    instance,
    dataSantri,
    alamat,
    noHp,
    jumlahTunggakan,
    kelas,
    subsidi,
    callback
  ) => {
    if (instance !== null) {
      let params = {
        nis: dataSantri.nis,
        nama_santri: dataSantri.nama_santri,
        tanggal_lahir: dataSantri.tanggal_lahir,
        alamat: alamat,
        no_hp: noHp,
        nama_wali: dataSantri.nama_wali,
        jenis_kelamin: dataSantri.jenis_kelamin,
        subsidi: subsidi,
        jumlah_tunggakan: jumlahTunggakan,
        nama_kelas: kelas,
      };
      let path = BASE_URL + this.editSantriPath(dataSantri.nis);
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