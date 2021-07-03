
const axios = require('axios');

const BASE_URL = "https://kota201.herokuapp.com/api/";

export default function ShowRiwayatTransaksi(callback){

    const instance = axios.create({
        baseURL: `${BASE_URL}`,
      });

    // Make a request for a user with a given ID
    instance.get('transaksi', {
        
    })
    .then(function (response) {
        // handle success
        callback(response);
        const data = response.data;
        console.log(data);
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error); 
    })
}