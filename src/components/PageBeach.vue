<template>
  <v-app class="background">
      <v-container fluid>
      <v-layout>
          <div class="optin">
            <v-flex xs12>
                <h1 v-show="demoMode === true" class="white--text scalesize" style="font-family: 'Lucida Bright',Georgia,serif;">{{title}}</h1>
                <h2 v-show="demoMode === true" style="font-family: 'Lucida Bright',Georgia,serif; font-size: 2vw; color: #a2b1c4">{{description}}</h2>

                <h1 v-show="demoMode === false" class="white--text scalesize" style="font-family: 'Lucida Bright',Georgia,serif;">{{ pagedata.title }}</h1>
                <h2 v-show="demoMode === false" style="font-family: 'Lucida Bright',Georgia,serif; font-size: 2vw; color: #a2b1c4">{{ pagedata.description }}</h2>
                  <!--<p>Name: {{ planedata.name }}</p>-->

                <v-divider class="my-3 white"></v-divider>

            <v-flex xs12 class="text-xs-right">
              <v-text-field solo placeholder="example@mysite.com" class="theme--light" v-model="theEmail"></v-text-field>
            </v-flex>
            <br/>
            <v-btn v-show="demoMode === true" large color="primary" @click.stop="saveEmail(theEmail)" class="mx-0">{{buttontext}}</v-btn>
            <v-btn v-show="demoMode === false" large color="primary" @click.stop="saveEmail(theEmail)" class="mx-0">{{pagedata.buttontext}}</v-btn>


                      <!--<v-btn color="primary" flat @click.stop="saveEmail(theEmail)">Submit</v-btn>-->

            </v-flex>
              </div>
            </v-layout>
      </v-container>
  </v-app>
</template>

<script>
  import axios from 'axios'
  import App from "../App";
  import {eventBus} from '../main';


  export default {
    name: 'PageBeach',
    components: {App},
    data() {
      return {
        pagedata: {},
        dialog2: false,
        demoMode: false,
        theEmail: '',
        title: "Relax.",
        description: "Receive 10% off your Hotel right now.",
        buttontext: "Save Now",
      }
    },

    created() {
      this.fetchData()
    },

    methods: {
      fetchData() {
        if(this.$route.params.id != null) {
          axios.get('http://localhost:8082/page/' + this.$route.params.id + '/')
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
          console.log('demoMode == true')
        }
      },
      saveEmail(theEmail){
        if(this.$route.params.id != null) {
          let data = JSON.stringify({
            uniquename: this.$route.params.id,
            email: theEmail
          })

          axios.post('http://localhost:8082/page/email', data, {headers: {"Content-Type": "application/json"}
          }).then(function(response){
            console.log(response)
            window.location.href = "http://localhost:8080/#/"
            //TODO: set redirect URL as field
          });
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
                console.log('NoThInG ChAnGeD')
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
  .background {
    background-image: url('../assets/beachBack.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
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
  .scalesize{
    font-size: 4vw;
  }
</style>
