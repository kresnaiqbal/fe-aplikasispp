import React from 'react';

const axios = require('axios');

const BASE_URL = "https://kota201.herokuapp.com/api/";

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