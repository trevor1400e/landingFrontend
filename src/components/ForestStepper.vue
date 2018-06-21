<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="e1 > 1" editable>Edit Page Info</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="e1 > 2" editable>Edit Page Info</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3" :complete="e1 > 3" editable>Set Page Details</v-stepper-step>
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
              label="Sub Title"
              v-model="subtitle"
              @keyup="sendChange('subtitle', subtitle)"
              :rules="filterRules"
              required
            ></v-text-field>
            <v-text-field
              label="Sub Description"
              v-model="subheader"
              @keyup="sendChange('subheader', subheader)"
              :rules="filterRules"
              required
            ></v-text-field>
            <v-text-field
              label="Email Header"
              v-model="emailheader"
              @keyup="sendChange('emailheader', emailheader)"
              :rules="filterRules"
              required
            ></v-text-field>
          </v-form>
        <v-btn color="primary" @click.native="e1 = 2" :disabled="!valid">Continue</v-btn>
        <v-btn flat  to="/">Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2" >
        <v-form v-model="valid">
          <v-text-field
            label="Button Text"
            v-model="buttontext"
            @keyup="sendChange('buttontext', buttontext)"
            :rules="filterRules"
            required
          ></v-text-field>
          <v-text-field
            label="Picture Block Title"
            v-model="pictureblocktitle"
            @keyup="sendChange('pictureblocktitle', pictureblocktitle)"
            :rules="filterRules"
            required
          ></v-text-field>
          <v-text-field
            label="Picture Block Description"
            v-model="pictureblockdescription"
            @keyup="sendChange('pictureblockdescription', pictureblockdescription)"
            :rules="filterRules"
            required
          ></v-text-field>
          <v-text-field
            label="Photo 1 Title"
            v-model="photo1title"
            @keyup="sendChange('photo1title', photo1title)"
            :rules="filterRules"
            required
          ></v-text-field>
          <v-text-field
            label="Photo 1 Text"
            v-model="photo1text"
            @keyup="sendChange('photo1text', photo1text)"
            :rules="filterRules"
            required
          ></v-text-field>
        </v-form>
        <v-btn color="primary" @click.native="e1 = 3" :disabled="!valid">Continue</v-btn>
        <v-btn flat  to="/">Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-form v-model="valid">
          <v-text-field
            label="Photo 2 Title"
            v-model="photo2title"
            @keyup="sendChange('photo2title', photo2title)"
            :rules="filterRules"
            required
          ></v-text-field>
          <v-text-field
            label="Photo 2 Text"
            v-model="photo2text"
            @keyup="sendChange('photo2text', photo2text)"
            :rules="filterRules"
            required
          ></v-text-field>
          <v-text-field
            label="Photo 3 Title"
            v-model="photo3title"
            @keyup="sendChange('photo3title', photo3title)"
            :rules="filterRules"
            required
          ></v-text-field>
          <v-text-field
            label="Photo 3 Text"
            v-model="photo3text"
            @keyup="sendChange('photo3text', photo3text)"
            :rules="filterRules"
            required
          ></v-text-field>
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
        <v-btn color="primary" @click.native="hellow" :disabled="!valid">Submit</v-btn>
        <v-btn flat to="/">Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  import axios from 'axios'
  import auth from '../auth'
  import {eventBus} from '../main';

  export default {
    data () {
      return {
        valid: false,
        e1: 0,
        pageid: 'exampleText',
        title: "Headline",
        description: "a Forest Theme",
        subtitle: "Fringilla Fermentum Tellus",
        subheader: "VEHICULA URNA SED JUSTO BIBENDUM",
        emailheader: "Sign up for 10% coupon on your next visit!",
        buttontext: "Join Now",
        pictureblocktitle: "Vestibulum Convallis",
        pictureblockdescription: "VEHICULA URNA SED JUSTO BIBENDUM",
        photo1title: "Viverra Hendrerit",
        photo1text: "Curabitur eget semper ante. Morbi eleifend ultricies est, a blandit diam vehicula vel. Vestibulum porttitor nisi quis viverra hendrerit. Suspendisse vel volutpat nibh, vel elementum lacus. Maecenas commodo pulvinar dui, at cursus metus imperdiet.",
        photo2title: "Curabitur Eget",
        photo2text: "Curabitur eget semper ante. Morbi eleifend ultricies est, a blandit diam vehicula vel. Vestibulum porttitor nisi quis viverra hendrerit. Suspendisse vel volutpat nibh, vel elementum lacus. Maecenas commodo pulvinar dui, at cursus metus imperdiet.",
        photo3title: "Morbi Eleifend",
        photo3text: "Curabitur eget semper ante. Morbi eleifend ultricies est, a blandit diam vehicula vel. Vestibulum porttitor nisi quis viverra hendrerit. Suspendisse vel volutpat nibh, vel elementum lacus. Maecenas commodo pulvinar dui, at cursus metus imperdiet.",
        errorText: '',
        redirectUrl: "http://www.google.com",
        filterRules: [
          (v) => !!v || 'Text is required',
          (v) => /^[ A-Za-z0-9_@!:%.,/#&+(?)=$'-]*$/.test(v) || 'Invalid character'
        ],
        pageIdRules: [
          (v) => !!v || 'Page id required',
          (v) => /^[A-Za-z0-9]*$/.test(v) || 'Text must contain alpha-numeric only'
        ]
      }
    },
    methods:{
      createPage: function(){
        let data = {
          name: this.pageid,
          themeName: 'forest',
          data: JSON.stringify({
            title: this.title,
            description: this.description,
            subtitle: this.subtitle,
            subheader: this.subheader,
            emailheader: this.emailheader,
            buttontext: this.buttontext,
            pictureblocktitle: this.pictureblocktitle,
            pictureblockdescription: this.pictureblockdescription,
            photo1title: this.photo1title,
            photo1text: this.photo1text,
            photo2title: this.photo2title,
            photo2text: this.photo2text,
            photo3title: this.photo3title,
            photo3text: this.photo3text,
            redirectUrl: this.redirectUrl
          })
        };

        const self = this;

        axios.post(auth.API.URL+'users/theme', data, {headers: {"Authorization": "Bearer " + localStorage.getItem('access_token')}
        }).then(function(response){
          console.log(response)
          if(response.data){
            window.location.href = auth.API.REDIRECT_URL
          }else{
            self.errorText = 'Page name already taken.'
          }
        });
      },
      sendChange(whatsChanging, changeTo) {
       // eventBus.$emit('beachChange', whatsChanging, changeTo)

        let data = JSON.stringify({
          whatsChanging: whatsChanging,
          changeTo: changeTo
        });

        var iframeEl = document.getElementById('forestframe')

        iframeEl.contentWindow.postMessage(data, '*');

      }
    }
  }
</script>
