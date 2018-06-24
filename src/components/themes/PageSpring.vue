<template>
  <v-app class="background">
    <div class="spring-theme-content">
      <v-container fluid fill-height justify-center>
        <v-layout align-center>
          <v-flex xs6 offset-xs3 class="text-xs-center">
            <h1 class="white--text scale-font">{{ customData.title }}</h1>
            <h2 class="black--text" style="font-size: 2vw">{{ customData.description }}</h2>

            <v-divider class="my-3 white"></v-divider>
            <v-btn large color="primary" @click.stop="dialog2 = true" class="mx-0">
              {{customData.buttontext}}
            </v-btn>

            <v-dialog v-model="dialog2" max-width="500px">
              <v-card>
                <v-card-title>
                  <v-flex xs12>
                    <h3 class="display-2">{{customData.poptitle}}</h3>
                  </v-flex>
                </v-card-title>
                <h4>{{customData.popsub}}</h4>
                <v-form v-model="valid">
                  <v-flex xs12>
                    <v-text-field style="padding: 10px" :rules="emailRules" placeholder="example@mysite.com"
                                  v-model="theEmail"></v-text-field>
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
  import auth from '../../auth'
  import validations from '../../mixins/validationMixin';

  export default {
    mixins: [validations],
    props: ['propData'],
    data() {
      return {
        customData: {},
        valid: false,
        errorText: '',
        dialog2: false,
        theEmail: ''
      }
    },

    created() {
      if (this.$route.params.id) {
        this.fetchData();
      }
    },
    methods: {
      fetchData() {
        this.demoMode = false;
        axios.get(auth.API.URL + 'public/pageData/' + this.$route.params.id)
          .then((resp) => {
            const myObjStr = JSON.stringify(resp.data);
            this.customData = JSON.parse(myObjStr)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      saveEmail(theEmail) {

        const self = this;

        if (this.$route.params.id != null) {
          if (this.valid) {
            let data = JSON.stringify({email: theEmail})

            axios.post(auth.API.URL + 'page/' + this.$route.params.id + '/email', data, {
              headers: {"Content-Type": "application/json"}
            }).then(function (response) {
              console.log(response)
              window.location.href = self.customData.redirectUrl
            }).catch((err) => {
              console.log('Loading page data failed or invalid redirect.')
            });
          }
        } else {
          this.errorText = 'You are in preview mode.'
        }
      },
      updateStuff(element, eventName, eventHandler) {

      }
    },
    watch: {
      propData(val){
        this.customData = this.propData
      }
    },
    dataContract: {
      title: {
        type: String,
        name: 'Title',
        default: "Spring is Here"
      },
      description: {
        type: String,
        name: 'Description',
        default: "Sign Up"
      },
      buttontext: {
        type: String,
        name: 'Button Text',
        default: "Sign Up"
      },
      poptitle: {
        type: String,
        name: 'Popup Title',
        default: "Sign Up Now"
      },
      popsub: {
        type: String,
        name: 'Popup Subtitle',
        default: "Get 10% off your next order!"
      }
    }
  }
</script>np

<style scoped>

  .spring-theme-content {
    position: absolute;
    width: 100%;
    margin: auto;
    top: 0;
    bottom: 0;
  }

  .background {
    background-image: url('/static/spring.jpg');
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
  }

  .scale-font {
    font-size: 4vh
  }
</style>
