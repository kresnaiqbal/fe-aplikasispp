import React from 'react';

const axios = require('axios');

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api";

export default class ApiShowRiwayatTransaksi extends React.Component{

    static INSTANCE = null

    static getInstance(){
        if(ApiShowRiwayatTransaksi.INSTANCE === null){
            ApiShowRiwayatTransaksi.INSTANCE = new ApiShowRiwayatTransaksi()
        }
        return ApiShowRiwayatTransaksi.INSTANCE
    }

    getRiwayatTransaksiInstance = () =>{ 
        // Header API
        return axios.create({
            baseURL: `${BASE_URL}`,
          });    
    }

    showRiwayatTransaksiPath = () => {
        return '/transaksi'
    }

    getDataRiwayatTransaksi = (instance) => {
        if(instance !== null){
            let path = BASE_URL + this.showRiwayatTransaksiPath()
            return instance.get(path).then(response => response).catch(err => err)
        }
    }

    requestData = (data) => {
        if(Array.isArray(data)){
            return Promise.all(data).then(
                response => {
                    let result = []
                    for(let i = 0; i < response[0].data.transaksi.length; i++){
                        result.push(response[0].data.transaksi[i] ? response[0].data.transaksi[i] : null)
                    }
                    return result
                }
                ).catch(
                    error => error
                    )
        }
    }
}