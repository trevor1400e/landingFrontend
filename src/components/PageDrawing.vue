<template>
  <v-app>
    <v-container fluid fill-height justify-center>
      <v-layout align-center>
        <!--License: https://github.com/BlackrockDigital/startbootstrap-coming-soon/blob/master/LICENSE-->
          <video autoplay muted loop id="myVideo">
            <source src="../assets/bgvid.mp4" type="video/mp4">
          </video>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">

        <!-- Custom fonts for this template -->
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Merriweather:300,300i,400,400i,700,700i,900,900i" rel="stylesheet">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">

        <div class="overlay"></div>

        <div class="masthead">
          <div class="masthead-bg">
            <div class="container">
                  <div class="masthead-content white--text" style="position: absolute; top: 35%; left: 10%">
                    <h1 v-if="demoMode" style="font-size: 3vw;white-space: nowrap;" class="mb-3">{{title}}</h1>
                    <h1 v-if="!demoMode" style="font-size: 3vw;white-space: nowrap;" class="mb-3">{{pagedata.title}}</h1>
                    <p v-if="demoMode" class="mb-5" style="font-size: 1vw;">{{description}}</p>
                    <p v-if="!demoMode" class="mb-5" style="font-size: 1vw;">{{pagedata.description}}</p>
                    <div class="d-inline-flex">
                      <v-form v-model="valid">
                      <input v-model="theEmail" :rules="filterRules" id="styled-input" class="styled-input black--text theme--light" placeholder="Enter Email...">
                        <v-text-field v-model="theEmail" :rules="filterRules" class="hidden" v-show="false" placeholder=""></v-text-field>
                      </v-form>
                      <div>
                      <v-btn v-if="demoMode" @click.stop="saveEmail(theEmail)" class="white--text" style="background: #cd9557; height: 5vh; width: 6vw; font-size: 1.75vh; margin: 0">
                        <b>{{buttontext}}</b></v-btn>
                      </div>
                      <v-btn v-if="!demoMode" @click.stop="saveEmail(theEmail)" class="white--text" style="background: #cd9557; height: 5vh; width: 6vw; font-size: 1.75vh; margin: 0">
                        <b>{{pagedata.buttontext}}</b></v-btn>
                    </div>
                    <p class="text-xs-center" v-text="errorText" style="color: red"></p>
                  </div>
                  </div>
                  </div>
                </div>



        <div class="social-icons">
          <ul class="list-unstyled text-center mb-0">
            <v-btn v-if="!demoMode" :href="'https://twitter.com/'+pagedata.twitterUrl" fab dark large color="blue">
              <i class="fab fa-twitter fa-3x"></i>
            </v-btn>
            <v-btn v-if="demoMode" href="#" fab dark large color="blue">
              <i class="fab fa-twitter fa-3x"></i>
            </v-btn>
            <br/>
            <v-btn v-if="!demoMode" :href="'https://www.facebook.com/'+pagedata.facebookUrl" fab dark large color="blue darken-4">
              <i class="fab fa-facebook-f fa-3x"></i>
            </v-btn>
            <v-btn v-if="demoMode" href="#" fab dark large color="blue darken-4">
              <i class="fab fa-facebook-f fa-3x"></i>
            </v-btn>
            <br/>
            <v-btn v-if="!demoMode" :href="'https://www.instagram.com/'+pagedata.instagramUrl" fab dark large color="deep-purple darken-1">
              <i class="fab fa-instagram fa-3x"></i>
            </v-btn>
            <v-btn v-if="demoMode" href="#" fab dark large color="deep-purple darken-1">
              <i class="fab fa-instagram fa-3x"></i>
            </v-btn>
          </ul>
        </div>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
  import axios from 'axios'
  import auth from '../auth'
  import App from "../App";
  import {eventBus} from '../main';


  export default {
    name: 'PageDrawing',
    components: {App},
    data() {
      return {
        valid: false,
        pagedata: {},
        demoMode: false,
        theEmail: '',
        title: "Coming Soon!",
        description: "We're working hard to finish the development of this site. Our target launch date is October 2018! Sign up for updates using the form below!",
        buttontext: "NOTIFY ME",
        twitterUrl: '#',
        facebookUrl: '#',
        instagramUrl: '#',
        errorText: '',
        filterRules: [
          (v) => !!v || 'Email is required',
          (v) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Invalid email',
        ]
      }
    },

    created() {
      this.fetchData()
    },

    methods: {
      fetchData() {
        if(this.$route.params.id != null) {
          axios.get(auth.API.URL+'page/' + this.$route.params.id + '/data')
            .then((resp) => {
              console.log(resp)
              const myObjStr = JSON.stringify(resp.data);
              this.pagedata = JSON.parse(myObjStr)
            })
            .catch((err) => {
              console.log(err)
            })
        }else{
          this.demoMode = true
        }
      },
      saveEmail(theEmail){

        const self = this;

        if(this.$route.params.id != null) {
          if(this.valid){
            let data = { email: theEmail }

            axios.post(auth.API.URL+'page/' + this.$route.params.id + '/email', data)
            .then(function(response){
              window.location.href = self.pagedata.redirectUrl
            }).catch((err) => {
              console.log('Loading page data failed or invalid redirect.')
            });
          }else{
            this.errorText = 'Invalid Email.'
          }
        }else{
          this.errorText = 'You are in preview mode.'
        }
      },
      updateStuff(element, eventName, eventHandler){
        if (element.addEventListener) {
          element.addEventListener(eventName, eventHandler, false);
        } else if (element.attachEvent) {
          element.attachEvent('on' + eventName, eventHandler);
        }
      }
    },
    mounted(){
      // Listen to messages from parent window
      this.updateStuff(window, 'message', (e) => {
        if(e.data != null) {
          try{
            this.eventdata = JSON.parse(e.data)

            if (this.eventdata.whatsChanging != null) {

              if (this.eventdata.whatsChanging === 'description') {
                this.description = this.eventdata.changeTo
              } else if (this.eventdata.whatsChanging === 'title') {
                this.title = this.eventdata.changeTo
              } else if (this.eventdata.whatsChanging === 'buttontext') {
                this.buttontext = this.eventdata.changeTo
              } else if (this.eventdata.whatsChanging === 'twitterUrl') {
                this.twitterUrl = this.eventdata.changeTo
              } else if (this.eventdata.whatsChanging === 'facebookUrl') {
                this.facebookUrl = this.eventdata.changeTo
              } else if (this.eventdata.whatsChanging === 'instagramUrl') {
                this.instagramUrl = this.eventdata.changeTo
              } else {
              }
            }
          }catch(err){
          }
        }
      });
    }
  }
</script>


<style scoped>

  #myVideo {
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    margin: auto;
    position: absolute;
    z-index: 0; top: 100%; left: 50%; transform: translate(-50%, -50%);
    object-fit: fill;
  }

  .styled-input{
    height: 5vh;
    width: 15vw;
    font-size: 2vh;
    resize: both;
    min-height: 0;
    background-color: white;
    padding-left: 10px;
  }

  .overlay {
    position: absolute;
    height: 100%;
    min-height: 35rem;
    width: 100%;
    background-color: #cd9557;
    opacity: 0.75;
    z-index: 0;
  }

  @media (min-width: 768px) {
    .overlay {
      min-height: 0;
    }
  }

  .masthead {
    overflow: hidden;
    padding-bottom: 3rem;
    z-index: 1;
  }

  .masthead .masthead-bg {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 35%;
    min-height: 35rem;
    height: 100%;
    background-color: rgba(0, 46, 102, 0.8);
    transform: skewY(4deg);
    transform-origin: bottom right;
  }


  @media (min-width: 768px) {
    .masthead {
      height: 100%;
      min-height: 0;
      width: 40.5rem;
      padding-bottom: 0;
    }
    .masthead .masthead-bg {
      min-height: 0;
      transform: skewX(-8deg);
      transform-origin: top right;
    }
    .masthead .masthead-content {
      padding-left: 3rem;
      padding-right: 10rem;
    }
    .masthead .masthead-content h1 {
      font-size: 3.5rem;
    }
    .masthead .masthead-content p {
      font-size: 1.3rem;
    }
  }

  .social-icons {
    position: absolute;
    margin-bottom: 2rem;
    width: 100%;
  }

  .social-icons ul {
    margin-top: 2rem;
    width: 100%;
    text-align: center;
  }

  .social-icons ul > li {
    margin-left: 1rem;
    margin-right: 1rem;
    display: inline-block;
  }

  .social-icons ul > li > a {
    display: block;
    color: white;
    background-color: rgba(0, 46, 102, 0.8);
    border-radius: 100%;
    font-size: 2rem;
    line-height: 4rem;
    height: 4rem;
    width: 4rem;
  }

  @media (min-width: 768px) {
    .social-icons {
      margin: 0;
      position: absolute;
      right: 2.5rem;
      bottom: 2rem;
      width: auto;
    }
    .social-icons ul {
      margin-top: 0;
      width: auto;
    }
    .social-icons ul > li {
      display: block;
      margin-left: 0;
      margin-right: 0;
      margin-bottom: 2rem;
    }
    .social-icons ul > li:last-child {
      margin-bottom: 0;
    }
    .social-icons ul > li > a {
      transition: all 0.2s ease-in-out;
      font-size: 2rem;
      line-height: 4rem;
      height: 4rem;
      width: 4rem;
    }
    .social-icons ul > li > a:hover {
      background-color: #002E66;
    }
  }

  .btn-secondary {
    background-color: #cd9557;
    border-color: #cd9557;
  }

  .btn-secondary:active, .btn-secondary:focus, .btn-secondary:hover {
    background-color: #ba7c37 !important;
    border-color: #ba7c37 !important;
  }

  .input {
    font-weight: 300 !important;
  }
</style>
