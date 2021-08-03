import React from 'react';

const axios = require('axios');

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiShowRiwayatPembayaran extends React.Component{

    static INSTANCE = null

    static getInstance(){
        if(ApiShowRiwayatPembayaran.INSTANCE === null){
            ApiShowRiwayatPembayaran.INSTANCE = new ApiShowRiwayatPembayaran()
        }
        return ApiShowRiwayatPembayaran.INSTANCE
    }

    getRiwayatPembayaranInstance = () =>{ 
        // Header API
        return axios.create({
            baseURL: `${BASE_URL}`,
          });    
    }

    showRiwayatPembayaranPath = (nis) => {
        return "transaksi/riwayat/" + nis
    }

    getDataRiwayatPembayaran = (instance, nis) => {
        if(instance !== null){
            let path = BASE_URL + this.showRiwayatPembayaranPath(nis)
            return instance.get(path)
            .then(response => response)
            .catch(err => alert(err.response.data.message))
        }
    }

    requestData = (data) => {
        if(Array.isArray(data)){
            return Promise.all(data).
            then(
                (response) => {
                    let result = []
                    console.log("res", response);
                    for(let i = 0; i < response[0].data.transaksi.length; i++){
                        result.push(response[0].data.transaksi[i] ? response[0].data.transaksi[i] : null)
                    }
                    return result
                }
                ).catch(
                    error => alert(error.response[0].data.message)
                    )
        }
    }
}