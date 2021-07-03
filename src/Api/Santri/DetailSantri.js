const axios = require("axios");

export default function CreateSantri(
  nis,
  nama_santri,
  tanggal_lahir,
  alamat,
  no_hp,
  nama_wali,
  jenis_kelamin,
  subsidi,
  jumlah_tunggakan,
  nama_kelas,
  callback
) {
  const instance = axios.create({
    baseURL: "https://kota201.herokuapp.com/api/",
    headers: {
      Accept: "application/json",
    },
    withCredentials: true,
  });
  // Make a request for a user with a given ID
  instance
    .put(`santri/${nis}`, {
      nis: nis,
      nama_santri: nama_santri,
      tanggal_lahir: tanggal_lahir,
      alamat: alamat,
      no_hp: no_hp,
      nama_wali: nama_wali,
      jenis_kelamin: jenis_kelamin,
      subsidi: subsidi,
      jumlah_tunggakan: jumlah_tunggakan,
      nama_kelas: nama_kelas,
    })
    .then(function (response) {
      // handle success
      callback();

      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
