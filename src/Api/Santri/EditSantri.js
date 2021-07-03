import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.herokuapp.com/api/";

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
    return "santri" + id;
  };

  editDataSantri = (
    instance,
    namaSantri,
    nis,
    gender,
    tanggalLahir,
    alamat,
    noHp,
    namaWali,
    jumlahTunggakan,
    kelas,
    subsidi,
    callback
  ) => {
    if (instance !== null) {
      let params = {
        nis: nis,
        nama_santri: namaSantri,
        tanggal_lahir: tanggalLahir,
        alamat: alamat,
        no_hp: noHp,
        nama_wali: namaWali,
        jenis_kelamin: gender,
        subsidi: subsidi,
        jumlah_tunggakan: jumlahTunggakan,
        nama_kelas: kelas,
      };
      let path = BASE_URL + this.editSantriPath();
      return instance
        .put(path, params)
        .then((response) => {
          console.log("ini update", response);
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
          for (let i = 0; i < response[0].data.santri.length; i++) {
            result.put(
              response[0].data.santri[i] ? response[0].data.santri[i] : null
            );
          }
          return result;
        })
        .catch((error) => error);
    }
  };

}