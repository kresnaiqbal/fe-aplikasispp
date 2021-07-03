import React from "react";

const axios = require("axios");

const BASE_URL = "https://kota201.herokuapp.com/api/";

export default class ApiCreateSantri extends React.Component {
  static INSTANCE = null;

  static getInstance() {
    if (ApiCreateSantri.INSTANCE === null) {
      ApiCreateSantri.INSTANCE = new ApiCreateSantri();
    }
    return ApiCreateSantri.INSTANCE;
  }

  getSantriInstance = () => {
    // Header API
    return axios.create({
      baseURL: `${BASE_URL}`,
    });
  };

  createSantriPath = () => {
    return "santri";
  };

  createDataSantri = (
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
      let path = BASE_URL + this.createSantriPath();
      return instance
        .post(path, params)
        .then((response) => {
          console.log("ini awalan", response);
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
            result.push(
              response[0].data.santri[i] ? response[0].data.santri[i] : null
            );
          }
          return result;
        })
        .catch((error) => error);
    }
  };

  // const instance = axios.create({
  //     baseURL: `${BASE_URL}`,
  //   });

  // // Make a request for a user with a given ID
  // instance.get('santri', {

  // })
  // .then(function (response) {
  //     // handle success
  //     // callback(response);
  //     // const data = response.data;
  //     // console.log(data);
  //     if(response){
  //         // response.then((data) => {
  //             if(response.status === 200 && response.statusText === "OK"){
  //                 console.log('ini awal',response);
  //                 return response
  //             }
  //         // }
  //         // )
  //     }
  // })
  // .catch(function (error) {
  //     // handle error
  //     console.log(error);
  // })
}

// export function requestData(data){
//     console.log("MASUKK", data)
//     if(Array.isArray(data)){
//         return Promise.all(data).then(
//             response => {
//                 let result = []
//                 for(let i = 0; i< response.data; i++){
//                     result.push(response.data[i] ? response.data[i] : null)
//                 }
//                 return result
//             }
//         ).catch(
//             error => error
//         )
//     }
// }

// export default function CreateSantri(
//   nis,
//   nama_santri,
//   tanggal_lahir,
//   alamat,
//   no_hp,
//   nama_wali,
//   jenis_kelamin,
//   subsidi,
//   jumlah_tunggakan,
//   nama_kelas,
//   callback
// ) {
//   const instance = axios.create({
//     baseURL: "https://kota201.herokuapp.com/api/",
//     headers: {
//       Accept: "application/json",
//     },
//     withCredentials: true,
//   });
//   // Make a request for a user with a given ID
//   instance
//     .post("santri", {
//       nis: nis,
//       nama_santri: nama_santri,
//       tanggal_lahir: tanggal_lahir,
//       alamat: alamat,
//       no_hp: no_hp,
//       nama_wali: nama_wali,
//       jenis_kelamin: jenis_kelamin,
//       subsidi: subsidi,
//       jumlah_tunggakan: jumlah_tunggakan,
//       nama_kelas: nama_kelas,
//     })
//     .then(function (response) {
//       // handle success
//       callback();

//       console.log(response);
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     });
// }
