<template>
  <v-app>
    <div class="background">
      <v-container fluid>
      <v-layout>
          <div class="optin">
            <v-flex xs12>
                <h1 v-if="demoMode === true" class="white--text scale-font" style="font-family: 'Lucida Bright',Georgia,serif;">{{title}}</h1>
                <h2 v-if="demoMode === true" style="font-family: 'Lucida Bright',Georgia,serif; font-size: 2vw; color: #a2b1c4">{{description}}</h2>

                <h1 v-if="demoMode === false" class="white--text scale-font" style="font-family: 'Lucida Bright',Georgia,serif;">{{ pagedata.title }}</h1>
                <h2 v-if="demoMode === false" style="font-family: 'Lucida Bright',Georgia,serif; font-size: 2vw; color: #a2b1c4">{{ pagedata.description }}</h2>
                  <!--<p>Name: {{ planedata.name }}</p>-->

                <v-divider class="my-3 white"></v-divider>

              <v-form v-model="valid">
            <v-flex xs12 class="text-xs-right">
              <v-text-field solo placeholder="example@mysite.com" class="theme--light" v-model="theEmail" :rules="filterRules"></v-text-field>
            </v-flex>
                <p class="text-xs-left" v-text="errorText" style="color: red"></p>
                <br/>
            <v-btn v-if="demoMode === true" large color="primary" @click.stop="saveEmail(theEmail)" class="mx-0">{{buttontext}}</v-btn>
            <v-btn v-if="demoMode === false" large color="primary" @click.stop="saveEmail(theEmail)" class="mx-0">{{pagedata.buttontext}}</v-btn>
              </v-form>
            </v-flex>
              </div>
            </v-layout>
      </v-container>
    </div>
  </v-app>
</template>

<script>
  import axios from 'axios'
  import auth from '../../auth'

  export default {
    name: 'PageBeach',
    data() {
      return {
        valid: false,
        pagedata: {},
        dialog2: false,
        demoMode: false,
        theEmail: '',
        title: "Relax.",
        description: "Receive 10% off your Hotel right now.",
        buttontext: "Save Now",
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

              if (this.eventdata.whatsChanging == 'description') {
                this.description = this.eventdata.changeTo
              } else if (this.eventdata.whatsChanging == 'title') {
                this.title = this.eventdata.changeTo
              } else if (this.eventdata.whatsChanging == 'buttontext') {
                this.buttontext = this.eventdata.changeTo
              } else {
              }
            }
          }catch(err){
          }
        }
        });
    },
    dataContract: {
      title: {
        name: "Title",
        type: String,
        default: "Relax."
      },
      description: {
        name: "Description",
        type: String,
        default: "Receive 10% off your Hotel right now.",
      },
      buttontext: {
        name: "Button Text",
        type: String,
        default: "Save Now"
      },
    }
  }
</script>

<style scoped>
  .background {
    background-image: url('/static/beachBack.jpg');
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: block;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    visibility: visible;
    opacity: 1;
  }
  .application--wrap{
    min-height: 0vh !important;
  }
  .optin{
    zoom: 0.9;
    -moz-transform: scale(0.9);
    padding-top: 10px;
    padding-bottom: 20px;
    padding-left: 25px;
    padding-right: 25px;
    border-radius: 15px;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
    -o-border-radius: 15px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 80px;
    text-align: center;
    background: rgba(0, 0, 0, 0.75);
  }
  .scale-font{
    font-size: 4vw;
  }
</style>
