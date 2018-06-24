// src/auth/index.js

import axios from 'axios'
import store from './store'

// URL and endpoint constants

var demomode = true
var API_URL;
var REDIRECT_URL;

if(!demomode){
  API_URL = 'http://65.151.191.49:8082/'
  REDIRECT_URL = 'http://leadlucky.com/#/'
}else{
  API_URL = 'http://localhost:8082/'
  REDIRECT_URL = 'http://localhost:8080/#/'
}
const LOGIN_URL = API_URL + 'users/signin'
const SIGNUP_URL = API_URL + 'users/signup'

export default {

  API:{
    URL: API_URL,
    REDIRECT_URL: REDIRECT_URL
  },

  // Send a request to the login URL and save the returned JWT
  login(creds, callback) {
    axios.post(LOGIN_URL, creds, {headers: {"Content-Type": "application/json"}}).then(res => {
      localStorage.setItem('id_token', res.data);
      localStorage.setItem('access_token', res.data);

      window.location.href = window.location.href+"dashboard";
      callback(true)
    }).catch(error => {
      callback(
        false,
        (error.response && error.response.data && error.response.data.message)
        || error.message
      )
    });
  },

  signup(creds, callback) {
    axios.post(SIGNUP_URL, creds, {headers: {"Content-Type": "application/json"}}).then(res => {
      localStorage.setItem('id_token', res.data);
      localStorage.setItem('access_token', res.data);

      window.location.href = window.location.href+"dashboard";
      callback(true)
    }).catch(error => {
      callback(
        false,
        (error.response && error.response.data && error.response.data.message)
        || error.message
      )
    });
  },

  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    store.userData.user = null;
  },

  refreshAuth(callback) {
    callback = callback || function(){};
    const jwt = localStorage.getItem('id_token');
    if(jwt) {
      axios.get(this.API.URL + 'users/me', {headers: this.getAuthHeader()}).then((res) => {
        store.userData.user = res.data;
        callback(store.userData.user)
      }).catch((err) => {
        store.userData.user = null;
        console.error(err);
        callback(null)
      })
    }
    else {
      store.userData.user = null;
      callback(null)
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      "Authorization": "Bearer " + localStorage.getItem('access_token')
    }
  }
}
