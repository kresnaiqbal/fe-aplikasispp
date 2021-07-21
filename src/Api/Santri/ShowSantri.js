import React from 'react';

const axios = require('axios');

const BASE_URL = "https://kota201.xyz/aplikasi_spp/public/api/";

export default class ApiShowSantri extends React.Component{

    static INSTANCE = null

    static getInstance(){
        if(ApiShowSantri.INSTANCE === null){
            ApiShowSantri.INSTANCE = new ApiShowSantri()
        }
        return ApiShowSantri.INSTANCE
    }

    getSantriInstance = () =>{ 
        // Header API
        return axios.create({
            baseURL: `${BASE_URL}`,
          });    
    }

    showSantriPath = () => {
        return 'santri'
    }

    getDataSantri = (instance) => {
        if(instance !== null){
            let path = BASE_URL + this.showSantriPath()
            return instance.get(path).then(response => response).catch(err => err)
        }
    }

    requestData = (data) => {
        if(Array.isArray(data)){
            return Promise.all(data).then(
                response => {
                    let result = []
                    for(let i = 0; i< response[0].data.santri.length; i++){
                        result.push(response[0].data.santri[i] ? response[0].data.santri[i] : null)
                    }
                    return result
                }
            ).catch(
                error => error
            )
        }
    }
}