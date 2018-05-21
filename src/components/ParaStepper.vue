<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="e1 > 1" editable>Edit Page Info</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="e1 > 2" editable>Edit Page Continued</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3" :complete="e1 > 3" editable>Set Page Details</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1" >
          <v-form>
            <v-text-field
              label="Logo Text"
              v-model="logo"
              @keyup="sendChange('logo', logo)"
              required
            ></v-text-field>
            <v-text-field
              label="Main Headline"
              v-model="title"
              @keyup="sendChange('title', title)"
              required
            ></v-text-field>
            <v-text-field
              label="Main Subheading"
              v-model="description"
              @keyup="sendChange('description', description)"
              required
            ></v-text-field>
            <v-text-field
              label="Button Text"
              v-model="buttontext"
              @keyup="sendChange('buttontext', buttontext)"
              required
            ></v-text-field>
            <v-text-field
              label="Middle Headline"
              v-model="headline"
              @keyup="sendChange('headline', headline)"
              required
            ></v-text-field>
            <v-text-field
              label="Middle Subheading"
              v-model="subheading"
              @keyup="sendChange('subheading', subheading)"
              required
            ></v-text-field>
          </v-form>
        <v-btn color="primary" @click.native="e1 = 2">Continue</v-btn>
        <v-btn flat  to="/">Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-form>
          <v-text-field
            label="Feature One"
            v-model="feature1"
            @keyup="sendChange('feature1', feature1)"
            required
          ></v-text-field>
          <v-text-field
            label="Feature One Text"
            v-model="feature1text"
            @keyup="sendChange('feature1text', feature1text)"
            required
          ></v-text-field>
          <v-text-field
            label="Feature Two"
            v-model="feature2"
            @keyup="sendChange('feature2', feature2)"
            required
          ></v-text-field>
          <v-text-field
            label="Feature Two Text"
            v-model="feature2text"
            @keyup="sendChange('feature2text', feature2text)"
            required
          ></v-text-field>
          <v-text-field
            label="Feature Three"
            v-model="feature3"
            @keyup="sendChange('feature3', feature3)"
            required
          ></v-text-field>
          <v-text-field
            label="Feature Three Text"
            v-model="feature3text"
            @keyup="sendChange('feature3text', feature3text)"
            required
          ></v-text-field>
        </v-form>
        <v-btn color="primary" @click.native="e1 = 3">Continue</v-btn>
        <v-btn flat to="/">Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-form>
          <v-text-field
            label="Bottom Headline"
            v-model="bottomHeadline"
            @keyup="sendChange('bottomHeadline', bottomHeadline)"
            required
          ></v-text-field>
          <v-text-field
            label="Bottom Subdheading"
            v-model="bottomSubheading"
            @keyup="sendChange('bottomSubheading', bottomSubheading)"
            required
          ></v-text-field>
          <v-text-field
            label="Bottom Button"
            v-model="bottomButton"
            @keyup="sendChange('bottomButton', bottomButton)"
            required
          ></v-text-field>
          <v-text-field
            label="Page id (/JoeShmoe)"
            v-model="pageid"
            required
          ></v-text-field>
          <p class="text-xs-left" v-text="errorText" style="color: red"></p>
        </v-form>
        <v-btn color="primary" @click.native="hellow">Submit</v-btn>
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
        e1: 0,
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
        pageid: 'exampleText',
        errorText: ''
      }
    },
    methods:{
      hellow: function(){
        console.log(this.title+this.description+this.pageid)
        let theData = JSON.stringify({
          logo: this.logo,
          title: this.title,
          description: this.description,
          headline: this.headline,
          subheading: this.subheading,
          buttontext: this.buttontext,
          feature1: this.feature1,
          feature1text: this.feature1text,
          feature2: this.feature2,
          feature2text: this.feature2text,
          feature3: this.feature3,
          feature3text: this.feature3text,
          bottomHeadline: this.bottomHeadline,
          bottomSubheading: this.bottomSubheading,
          bottomButton: this.bottomButton,
        })

        let data = JSON.stringify({
          uniquename: this.pageid,
          themename: 'paralax',
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

        var iframeEl = document.getElementById('paraframe')

        iframeEl.contentWindow.postMessage(Data, '*');

      }
    }
  }
</script>
