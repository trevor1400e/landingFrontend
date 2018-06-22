<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="e1 > 1" editable>Edit Page Info</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="e1 > 2" editable>Set Page Details</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1" >
          <v-form v-model="valid">
            <v-text-field
              label="Title"
              v-model="title"
              @keyup="sendChange('title', title)"
              :rules="filterRules"
              required
            ></v-text-field>
            <v-text-field
              label="Description"
              v-model="description"
              @keyup="sendChange('description', description)"
              :rules="filterRules"
              required
            ></v-text-field>
            <v-text-field
              label="ButtonText"
              v-model="buttontext"
              @keyup="sendChange('buttontext', buttontext)"
              :rules="filterRules"
              required
            ></v-text-field>
            <v-text-field
              label="PopTitle"
              v-model="poptitle"
              @keyup="sendChange('poptitle', poptitle)"
              :rules="filterRules"
              required
            ></v-text-field>
            <v-text-field
              label="PopSub"
              v-model="popsub"
              @keyup="sendChange('popsub', popsub)"
              :rules="filterRules"
              required
            ></v-text-field>
          </v-form>
        <v-btn color="primary" @click.native="e1 = 2" :disabled="!valid">Continue</v-btn>
        <v-btn flat  to="/">Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-form v-model="valid">
          <v-text-field
            label="Email Submit Redirect Url"
            v-model="redirectUrl"
            :rules="filterRules"
            required
          ></v-text-field>
          <v-text-field
            label="Page id (/JoeShmoe)"
            v-model="pageid"
            :rules="pageIdRules"
            prefix="/"
            required
          ></v-text-field>
          <p class="text-xs-left" v-text="errorText" style="color: red"></p>
        </v-form>
        <v-btn color="primary" @click.native="createPage" :disabled="!valid">Submit</v-btn>
        <v-btn flat to="/">Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  import axios from 'axios'
  import auth from '../auth'
  import {eventBus} from '../main';
  import validation from '../mixins/validationMixin'

  export default {
    mixins: [validation],
    data () {
      return {
        valid: false,
        e1: 0,
        title: "Spring is Here",
        description: "Receive 10% off your next order",
        pageid: 'exampleText',
        buttontext: "Sign Up",
        poptitle: "Sign Up Now",
        popsub: "Get 10% off your next order!",
        redirectUrl: "http://www.google.com",
        errorText: ''
      }
    },
    methods:{
      createPage: function(){
        let data = {
          name: this.pageid,
          themeName: 'spring',
          data: JSON.stringify({
            title: this.title,
            description: this.description,
            buttontext: this.buttontext,
            poptitle: this.poptitle,
            popsub: this.popsub,
            redirectUrl: this.redirectUrl
          })
        };

        const self = this;

        axios.post(auth.API.URL+'users/theme', data, {headers: {"Authorization": "Bearer " + localStorage.getItem('access_token')}
        }).then(function(response){
          console.log(response);
          if(response.data){
            window.location.href = auth.API.REDIRECT_URL
          }else{
            self.errorText = 'Page name already taken.'
          }
        });
      },
      sendChange(whatsChanging, changeTo) {
        // eventBus.$emit('beachChange', whatsChanging, changeTo)

        let Data = JSON.stringify({
          whatsChanging: whatsChanging,
          changeTo: changeTo
        })

        var iframeEl = document.getElementById('springframe')

        iframeEl.contentWindow.postMessage(Data, '*');

      }
    }
  }
</script>
