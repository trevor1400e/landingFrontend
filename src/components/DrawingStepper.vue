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
          </v-form>
        <v-btn color="primary" @click.native="e1 = 2" :disabled="!valid">Continue</v-btn>
        <v-btn flat  to="/">Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-form v-model="valid">
          <v-text-field
            label="Twitter Url"
            v-model="twitterUrl"
            @keyup="sendChange('twitterUrl', twitterUrl)"
            :rules="pageIdRules"
            prefix="Twitter.com/"
            required
          ></v-text-field>
          <v-text-field
            label="Facebook Url"
            v-model="facebookUrl"
            @keyup="sendChange('facebookUrl', facebookUrl)"
            :rules="pageIdRules"
            prefix="Facebook.com/"
            required
          ></v-text-field>
          <v-text-field
            label="Instagram Url"
            v-model="instagramUrl"
            @keyup="sendChange('instagramUrl', instagramUrl)"
            :rules="pageIdRules"
            prefix="Instagram.com/"
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
        <v-btn color="primary" @click.native="hellow" :disabled="!valid">Submit</v-btn>
        <v-btn flat to="/">Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  import axios from 'axios'
  import {eventBus} from '../main';

  export default {
    data () {
      return {
        valid: false,
        e1: 0,
        pageid: 'exampleText',
        title: "Coming Soon!",
        description: "We're working hard to finish the development of this site. Our target launch date is October 2018! Sign up for updates using the form below!",
        buttontext: "NOTIFY ME",
        twitterUrl: 'YOURUSERNAME',
        facebookUrl: 'PAGEID',
        instagramUrl: 'YOURUSERNAME',
        errorText: '',
        filterRules: [
          (v) => !!v || 'Text is required',
          (v) => /^[ A-Za-z0-9_@!:%.#&+(?)=$'-]*$/.test(v) || 'Invalid character'
        ],
        pageIdRules: [
          (v) => !!v || 'Page id required',
          (v) => /^[A-Za-z0-9]*$/.test(v) || 'Text must contain alpha-numeric only'
        ]
      }
    },
    methods:{
      hellow: function(){
        console.log(this.title+this.description+this.pageid)
        let theData = JSON.stringify({
          title: this.title,
          description: this.description,
          buttontext: this.buttontext,
          twitterUrl: this.twitterUrl,
          facebookUrl: this.facebookUrl,
          instagramUrl: this.instagramUrl
        })

        debugger

        let data = JSON.stringify({
          uniquename: this.pageid,
          themename: 'drawing',
          data: theData
        })

        var self = this

        axios.post('http://localhost:8082/users/theme', data, {headers: {"Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('access_token')}
        }).then(function(response){
          console.log(response)
          if(response.data){
            window.location.href = "http://localhost:8080/#/"
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

        var iframeEl = document.getElementById('drawingframe')

        iframeEl.contentWindow.postMessage(Data, '*');

      }
    }
  }
</script>
