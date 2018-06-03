<template>
  <v-app>
    <div class="background">
      <v-container fluid fill-height justify-center>
      <v-layout align-center>
        <v-flex xs6 offset-xs3 class="text-xs-center">
              <h1 v-if="demoMode === true" class="white--text scalesize">{{title}}</h1>
              <h2 v-if="demoMode === true" class="black--text" style="font-size: 2vw">{{description}}</h2>

              <h1 v-if="demoMode === false" class="white--text scalesize">{{ planedata.title }}</h1>
              <h2 v-if="demoMode === false" class="black--text" style="font-size: 2vw">{{ planedata.description }}</h2>
              <!--<p>Name: {{ planedata.name }}</p>-->

              <v-divider class="my-3 white"></v-divider>
              <v-btn v-if="demoMode === true" large color="primary" @click.stop="dialog2 = true" class="mx-0">{{buttontext}}</v-btn>
              <v-btn v-if="demoMode === false" large color="primary" @click.stop="dialog2 = true" class="mx-0">{{planedata.buttontext}}</v-btn>

        <v-dialog v-model="dialog2" max-width="500px">
                  <v-card>
                    <v-card-title>
                        <v-flex xs12>
                          <h3 v-if="demoMode === true" class="display-2">{{poptitle}}</h3>
                          <h3 v-if="demoMode === false" class="display-2">{{planedata.poptitle}}</h3>
                        </v-flex>
                    </v-card-title>
                    <h4 v-if="demoMode === true">{{popsub}}</h4>
                    <h4 v-if="demoMode === false">{{planedata.popsub}}</h4>
                    <v-form v-model="valid">
                    <v-flex xs12>
                    <v-text-field style="padding: 10px" :rules="filterRules" placeholder="example@mysite.com" v-model="theEmail"></v-text-field>
                      <p class="text-xs-left" v-text="errorText" style="color: red; padding-left: 10px"></p>
                    </v-flex>

                    <v-card-actions>
                      <v-flex xs6 offset-xs6>
                      <v-btn color="primary" flat @click.stop="dialog2=false">Close</v-btn>
                      <v-btn color="primary" flat @click.stop="saveEmail(theEmail)">Submit</v-btn>
                      </v-flex>
                    </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
      </v-container>
    </div>
  </v-app>
</template>

<script>
  import axios from 'axios'
  import auth from '../auth'
  import App from "../App";
  import springback from '../assets/spring.jpg'
  import {eventBus} from '../main';


  export default {
    name: 'PageSpring',
    components: {App},
    data() {
      return {
        planedata: {},
        valid: false,
        errorText: '',
        springback: springback,
        dialog2: false,
        demoMode: false,
        theEmail: '',
        title: "Spring is Here",
        description: "Receive 10% off your next order",
        buttontext: "Sign Up",
        poptitle: "Sign Up Now",
        popsub: "Get 10% off your next order!",
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
          axios.get(auth.API.URL+'page/' + this.$route.params.id + '/')
            .then((resp) => {
              const myObjStr = JSON.stringify(resp.data);
              this.planedata = JSON.parse(myObjStr)
            })
            .catch((err) => {
              console.log(err)
            })
        }else{
          this.demoMode = true
        }
      },
      saveEmail(theEmail){

        var self = this;

        if(this.$route.params.id != null) {
          if(this.valid){
            let data = JSON.stringify({
              uniquename: this.$route.params.id,
              email: theEmail
            })

            axios.post(auth.API.URL+'page/email', data, {headers: {"Content-Type": "application/json"}
            }).then(function(response){
              console.log(response)
              window.location.href = self.planedata.redirectUrl
            }).catch((err) => {
              console.log('Loading page data failed or invalid redirect.')
            });
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
              }else if(this.eventdata.whatsChanging == 'poptitle'){
                this.poptitle = this.eventdata.changeTo
              }else if(this.eventdata.whatsChanging == 'popsub'){
                this.popsub = this.eventdata.changeTo
              }else{
              }
            }
          }catch(err){
          }
        }
      });
    }
  }
</script>np

<style scoped>
  .background {
    background-image: url('../assets/spring.jpg');
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

  .scalesize{
    font-size: 4vw;
  }
</style>
