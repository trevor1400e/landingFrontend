<template>
    <v-app light id="app" class="theme--light">
      <v-toolbar class="white">
        <v-toolbar-title v-show="demoMode === true">{{logo}}</v-toolbar-title>
        <v-toolbar-title v-show="demoMode === false">{{pagedata.logo}}</v-toolbar-title>
      </v-toolbar>
      <v-content>
        <section>
          <v-parallax :src="heroImage" height="600">
            <v-layout
              column
              align-center
              justify-center
              class="white--text"
            >
              <h1 v-show="demoMode === true" class="white--text scalesize" style="font-family: 'Lucida Bright',Georgia,serif;">{{title}}</h1>
              <h1 v-show="demoMode === false" class="white--text scalesize" style="font-family: 'Lucida Bright',Georgia,serif;">{{pagedata.title}}</h1>
              <!--<h1 class="white&#45;&#45;text mb-2 display-1 text-xs-center">Parallax Template</h1>-->
              <div class="mb-2 text-xs-center" style="font-size: 2vw">{{description}}
                <v-text-field v-show="demoMode === true" solo placeholder="example@mysite.com" class="theme--light" v-model="theEmail"></v-text-field>
                <v-text-field v-show="demoMode === false" solo placeholder="example@mysite.com" class="theme--light" v-model="theEmail"></v-text-field>
                <v-btn
                  v-show="demoMode === true"
                  class="blue lighten-2 mt-5"
                  dark
                  large
                  @click.stop="saveEmail(theEmail)">
                  {{buttontext}}
                </v-btn>
                <v-btn
                  v-show="demoMode === false"
                  class="blue lighten-2 mt-5"
                  dark
                  large
                  @click.stop="saveEmail(theEmail)">
                  {{pagedata.buttontext}}
                </v-btn>
              </div>

            </v-layout>
          </v-parallax>
        </section>

        <section>
          <v-layout
            column
            wrap
            class="my-5"
            align-center
          >
            <v-flex xs12 sm4 class="my-3">
              <div class="text-xs-center">
                <h2 v-show="demoMode === true" class="headline">{{headline}}</h2>
                <h2 v-show="demoMode === false" class="headline">{{pagedata.headline}}</h2>
                <span v-show="demoMode === true" class="subheading">
                {{subheading}}
              </span>
                <span v-show="demoMode === false" class="subheading">
                {{pagedata.subheading}}
              </span>
              </div>
            </v-flex>
            <v-flex xs12>
              <v-container grid-list-xl>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    <v-card class="elevation-0 transparent">
                      <v-card-text class="text-xs-center">
                        <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                      </v-card-text>
                      <v-card-title primary-title class="layout justify-center">
                        <div v-show="demoMode === true" class="headline text-xs-center">{{feature1}}</div>
                        <div v-show="demoMode === false" class="headline text-xs-center">{{pagedata.feature1}}</div>
                      </v-card-title>
                      <v-card-text v-show="demoMode === true">
                        {{feature1text}}
                      </v-card-text>
                      <v-card-text v-show="demoMode === false">
                        {{pagedata.feature1text}}
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-card class="elevation-0 transparent">
                      <v-card-text class="text-xs-center">
                        <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                      </v-card-text>
                      <v-card-title primary-title class="layout justify-center">
                        <div v-show="demoMode === true" class="headline">{{feature2}}</div>
                        <div v-show="demoMode === false" class="headline">{{pagedata.feature2}}</div>
                      </v-card-title>
                      <v-card-text v-show="demoMode === true">
                        {{feature2text}}
                      </v-card-text>
                      <v-card-text v-show="demoMode === false">
                        {{pagedata.feature2text}}
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-card class="elevation-0 transparent">
                      <v-card-text class="text-xs-center">
                        <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                      </v-card-text>
                      <v-card-title primary-title class="layout justify-center">
                        <div v-show="demoMode === true" class="headline text-xs-center">{{feature3}}</div>
                        <div v-show="demoMode === false" class="headline text-xs-center">{{pagedata.feature3}}</div>
                      </v-card-title>
                      <v-card-text v-show="demoMode === true">
                        {{feature3text}}
                      </v-card-text>
                      <v-card-text v-show="demoMode === false">
                        {{pagedata.feature3text}}
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
          </v-layout>
        </section>

        <section>
          <v-parallax :src="sectionImage" height="380">
            <v-layout column align-center justify-center>
              <div v-show="demoMode === true" class="headline white--text mb-3 text-xs-center">{{bottomHeadline}}</div>
              <div v-show="demoMode === false" class="headline white--text mb-3 text-xs-center">{{pagedata.bottomHeadline}}</div>
              <em v-show="demoMode === true">{{bottomSubheading}}</em>
              <em v-show="demoMode === false">{{pagedata.bottomSubheading}}</em>
              <v-btn
                v-show="demoMode === true"
                class="blue lighten-2 mt-5"
                dark
                large
                href="/pre-made-themes"
              >
                {{bottomButton}}
              </v-btn>
              <v-btn
                v-show="demoMode === false"
                class="blue lighten-2 mt-5"
                dark
                large
                href="/pre-made-themes"
              >
                {{pagedata.bottomButton}}
              </v-btn>
            </v-layout>
          </v-parallax>
        </section>

        <v-footer class="blue darken-2">
          <v-layout row wrap align-center>
            <v-flex xs12>
              <div class="white--text ml-3">
                Powered
                by <a class="white--text" href="https://github.com/vwxyzjn">LeadPages</a>
              </div>
            </v-flex>
          </v-layout>
        </v-footer>
      </v-content>
    </v-app>
</template>

<script>
  import axios from 'axios'
  import App from "../App";
  import {eventBus} from '../main';
  import heroImage from '../assets/hero.jpeg'
  import sectionImage from '../assets/section.jpg'
  import vuetifyImage from '../assets/vuetify.png'

  export default {
    name: 'PagePara',
    components: {App},
    data() {
      return {
        pagedata: {},
        eventdata: {},
        dialog2: false,
        demoMode: false,
        theEmail: '',
        logo: 'Logo Text',
        title: "Your Main Headline",
        description: "Convincing SubHeading Here",
        headline: "More information about your product.",
        subheading: "Remember to post important features",
        buttontext: "GET STARTED",
        feature1: "Material Design",
        feature1text: "Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.",
        feature2: "Fast Development",
        feature2text: "Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.",
        feature3: "Completely Open Sourced",
        feature3text: "Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.",
        bottomHeadline: "Web development has never been easier",
        bottomSubheading: "Kick-start your application today",
        bottomButton: "GET STARTED",
        heroImage: heroImage,
        sectionImage: sectionImage,
        vuetifyImage: vuetifyImage
      }
    },

    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        if (this.$route.params.id != null) {
          axios.get('http://localhost:8082/page/' + this.$route.params.id + '/')
            .then((resp) => {
              console.log(resp)
              const myObjStr = JSON.stringify(resp.data);
              this.pagedata = JSON.parse(myObjStr)
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          this.demoMode = true
          console.log('demoMode == true')
        }
      },
      saveEmail(theEmail) {
        if (this.$route.params.id != null) {
          let data = JSON.stringify({
            uniquename: this.$route.params.id,
            email: theEmail
          })

          axios.post('http://localhost:8082/page/email', data, {
            headers: {"Content-Type": "application/json"}
          }).then(function (response) {
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
            try {
              this.eventdata = JSON.parse(e.data)

              if (this.eventdata.whatsChanging != null) {

                if (this.eventdata.whatsChanging == 'description') {
                  this.description = this.eventdata.changeTo
                } else if (this.eventdata.whatsChanging == 'title') {
                  this.title = this.eventdata.changeTo
                } else if (this.eventdata.whatsChanging == 'logo') {
                  this.logo = this.eventdata.changeTo
                } else if (this.eventdata.whatsChanging == 'headline') {
                  this.headline = this.eventdata.changeTo
                } else if (this.eventdata.whatsChanging == 'subheading') {
                  this.subheading = this.eventdata.changeTo
                } else if (this.eventdata.whatsChanging == 'buttontext') {
                  this.buttontext = this.eventdata.changeTo
                } else if (this.eventdata.whatsChanging == 'feature1') {
                  this.feature1 = this.eventdata.changeTo
                } else if (this.eventdata.whatsChanging == 'feature1text') {
                  this.feature1text = this.eventdata.changeTo
                } else if (this.eventdata.whatsChanging == 'feature2') {
                  this.feature2 = this.eventdata.changeTo
                } else if (this.eventdata.whatsChanging == 'feature2text') {
                  this.feature2text = this.eventdata.changeTo
                } else if (this.eventdata.whatsChanging == 'feature3') {
                  this.feature3 = this.eventdata.changeTo
                } else if (this.eventdata.whatsChanging == 'feature3text') {
                  this.feature3text = this.eventdata.changeTo
                } else if (this.eventdata.whatsChanging == 'bottomHeadline') {
                  this.bottomHeadline = this.eventdata.changeTo
                } else if (this.eventdata.whatsChanging == 'bottomSubheading') {
                  this.bottomSubheading = this.eventdata.changeTo
                } else if (this.eventdata.whatsChanging == 'bottomButton') {
                  this.bottomButton = this.eventdata.changeTo
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

  .scalesize{
    font-size: 4vw;
    /*zoom: 0.9;*/
    /*-moz-transform: scale(0.9);*/
  }
</style>
