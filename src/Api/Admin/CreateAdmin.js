const axios = require("axios");

export default function CreateSantri(
  username,
  nama_admin,
  role,
  paraf,
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
    .post("admin", {
      username: username,
      nama_admin: nama_admin,
      role: role,
      paraf: paraf,
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
