const axios = require('axios');


export default function Login(username, password, callback) {
    
    const instance = axios.create({
        baseURL: 'https://kota201.herokuapp.com/api/',
        headers: {
        'Accept': 'application/json'},
        withCredentials : true
      });
    // Make a request for a user with a given ID
    instance.post('login', {
        username: username,
        password: password
    })
    .then(function (response) {
        // handle success
        callback()
        sessionStorage.setItem("token",response.data.token)
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error); 
    })
}
