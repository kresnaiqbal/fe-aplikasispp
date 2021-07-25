import React from "react";
const axios = require("axios");
const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default function ApiLogin(username, password, callback) {

  const instance = axios.create({
    baseURL: "https://kota201.xyz/aplikasi_spp/public/api/",
    headers: {
      Accept: "application/json",
    },
    withCredentials: true,
  });
  // Make a request for a user with a given ID
  instance
    .post("admin/login", {
      username: username,
      password: password,
    })
    .then(function (response) {
      // handle success
      callback();
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("id_admin", response.data.id_admin);
      sessionStorage.setItem("permission", JSON.stringify(response.data.list_menu));
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
