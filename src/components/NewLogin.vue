<template>
  <v-app id="inspire">
    <v-content class="background">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12" style="background: rgba(255,255,255,0.6);" v-if="display === 'login'">
              <!--<v-toolbar dark style="background: rgb(0,100,230);">-->
                <!--<v-toolbar-title class="text-center">Login form</v-toolbar-title>-->
                <!--<v-spacer></v-spacer>-->
                <!--<v-tooltip bottom>-->
                  <!--<span>Source</span>-->
                <!--</v-tooltip>-->

              <!--</v-toolbar>-->
              <v-card-text>
                <h1 class="fancy">Welcome</h1>
                <v-form>
                  <v-text-field v-model="credentials.username" v-on:keyup.enter="submit" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field v-model="credentials.password" v-on:keyup.enter="submit" prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <p class="text-xs-left" v-text="errorLogin" style="color: red"></p>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="switchpage('register')">Register</v-btn>
                <v-btn color="info" @click="submit">Login</v-btn>
              </v-card-actions>
            </v-card>
            <v-card class="elevation-12" style="background: rgba(255,255,255,0.6);" v-if="display === 'register'">
              <!--<v-toolbar dark style="background: rgb(0,100,230);">-->
              <!--<v-toolbar-title class="text-center">Login form</v-toolbar-title>-->
              <!--<v-spacer></v-spacer>-->
              <!--<v-tooltip bottom>-->
              <!--<span>Source</span>-->
              <!--</v-tooltip>-->

              <!--</v-toolbar>-->
              <v-card-text>
                <h1 class="fancy">Register</h1>
                <v-form>
                  <v-text-field v-model="credentials.username" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field v-model="credentials.postEmail" prepend-icon="email" name="email" label="Email" type="text"></v-text-field>
                  <v-text-field v-model="credentials.password" prepend-icon="lock" name="password" label="Password" id="regpassword" type="password"></v-text-field>
                  <v-text-field v-model="credentials.passveri" v-on:keyup.enter="register" prepend-icon="lock" name="password" label="Repeat Password" id="regpassword2" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <p class="text-xs-left" v-text="errorText" style="color: red"></p>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="info" @click="register">Register</v-btn>
                <v-btn color="primary" @click="switchpage('login')">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import auth from '../auth'

  export default {
    data: () => ({
      drawer: null,
      display: 'login',
      errorText: '',
      errorLogin: '',
      credentials: {
        username: '',
        password: '',
        passveri: '',
        postEmail: ''
      }
    }),
    props: {
      source: String
    },
    methods: {
      submit() {
        let data = JSON.stringify({
          username: this.credentials.username,
          password: this.credentials.password
        })

        var self = this

        auth.login(this, data, success =>{
          if(!success){
            self.errorLogin = 'Incorrect username or password.'
          }
        })
      },
      register() {
        if(this.credentials.password == this.credentials.passveri) {
          let data = JSON.stringify({
            username: this.credentials.username,
            password: this.credentials.password,
            email: this.credentials.postEmail
          })
          // We need to pass the component's this context
          // to properly make use of http in the auth service
          var self = this

          auth.signup(this, data, success =>{
            if(!success){
              self.errorText = 'Username or Email already exists.'
            }
          })
        }else{
          this.errorText = 'Passwords don\'t match.'
        }
      },
      switchpage(page){
        this.display = page
      }
    },
    beforeMount(){
      auth.checkAuth()
      if(auth.user.authenticated == true){
        window.location.href = "http://localhost:8080/#/dashboard"
      }
    }
  }
</script>

<style>
  .background {
    background-image: url('../assets/background.jpeg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .fancy{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 40px;
  }
</style>
