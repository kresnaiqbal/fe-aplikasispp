import React from 'react';

const axios = require('axios');

const BASE_URL = "https://kota201.herokuapp.com/api/";

export default class ApiShowAdmin extends React.Component{

    static INSTANCE = null

    static getInstance(){
        if(ApiShowAdmin.INSTANCE === null){
            ApiShowAdmin.INSTANCE = new ApiShowAdmin()
        }
        return ApiShowAdmin.INSTANCE
    }

    getAdminInstance = () =>{ 
        // Header API
        return axios.create({
            baseURL: `${BASE_URL}`,
          });    
    }

    showAdminPath = () => {
        return 'admin'
    }

    getDataAdmin = (instance) => {
        if(instance !== null){
            let path = BASE_URL + this.showAdminPath()
            return instance.get(path).then(response => response).catch(err => err)
        }
    }

    requestData = (data) => {
        if(Array.isArray(data)){
            return Promise.all(data).then(
                response => {
                    let result = []
                    for(let i = 0; i< response[0].data.admin.length; i++){
                        result.push(response[0].data.admin[i] ? response[0].data.admin[i] : null)
                    }
                    return result
                }
            ).catch(
                error => error
            )
        }
    }
}