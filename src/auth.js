// src/auth/index.js

import router from './router/index'
import axios from 'axios'
import Vue from 'vue'

// URL and endpoint constants
const API_URL = 'http://localhost:8082/'
const LOGIN_URL = API_URL + 'users/signin'
const SIGNUP_URL = API_URL + 'users/signup'

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },



  // Send a request to the login URL and save the returned JWT
  login(context, creds, callback) {

    axios.post(LOGIN_URL, creds, {headers: {"Content-Type": "application/json"}
    }).then(function(response){
      localStorage.setItem('id_token', response.data)
      localStorage.setItem('access_token', response.data)

      window.location.href = "http://localhost:8080/#/dashboard"

      callback(true)
    }).catch(error => {
      callback(false)
    });
  },

  signup(context, creds, callback2) {
    axios.post(SIGNUP_URL, creds, {headers: {"Content-Type": "application/json"}
    }).then(function(response){
      localStorage.setItem('id_token', response.data)
      localStorage.setItem('access_token', response.data)

      window.location.href = "http://localhost:8080/#/dashboard"
      callback2(true)
    }).catch(error => {
      callback2(false)
    });
  },

  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    this.user.authenticated = false
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if(jwt) {
      this.user.authenticated = true
      console.log("authenticated is true")
    }
    else {
      this.user.authenticated = false
      console.log("authenticated is false")
    }
  },
  hellobish(header) {
    axios.get(API_URL+'users/hello', {headers: header}).then(function(response){
        console.log(response)
    })
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      "Authorization": "Bearer " + localStorage.getItem('access_token')
    }
  }
}
