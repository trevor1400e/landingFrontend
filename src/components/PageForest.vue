<template>
    <div>

      <body class="background">
      <!-- Header -->
      <header id="header">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" crossorigin="anonymous">
        <div v-if="demoMode === true" class="logo"><a href="#">{{title}}<span>{{description}}</span></a></div>
        <div v-if="demoMode === false" class="logo"><a href="#">{{pagedata.title}}<span>{{pagedata.description}}</span></a></div>
      </header>

      <!-- Main -->
      <section id="main">
        <div class="inner">

          <!-- One -->
          <section id="one" class="wrapper style1">

            <div class="image fit flush">
              <img src="../assets/forrest/pic02.jpg" alt="" />
            </div>
            <header class="special">
              <h2 v-if="demoMode === true">{{subtitle}}</h2>
              <p v-if="demoMode === true">{{subheader}}</p>
              <h2 v-if="demoMode === false">{{pagedata.subtitle}}</h2>
              <p v-if="demoMode === false">{{pagedata.subheader}}</p>
            </header>
            <div class="content">
              <v-flex xs4 offset-xs4>
              <v-form v-model="valid">
                <v-flex xs12 class="text-xs-center">
                  <h4 v-if="demoMode === true">{{emailheader}}</h4>
                  <h4 v-if="demoMode === false">{{pagedata.emailheader}}</h4>
                  <v-text-field solo placeholder="example@mysite.com" class="theme--light" v-model="theEmail" :rules="filterRules" style="color: green"></v-text-field>
                </v-flex>
                <p class="text-xs-left" v-text="errorText" style="color: red"></p>
                <v-btn v-if="demoMode === true" large color="green darken-4" style="font-size: 18px" @click.stop="saveEmail(theEmail)" class="mx-0">{{buttontext}}</v-btn>
                <v-btn v-if="demoMode === false" large color="green darken-4" style="font-size: 18px" @click.stop="saveEmail(theEmail)" class="mx-0">{{pagedata.buttontext}}</v-btn>
              </v-form>
              </v-flex>
            </div>
          </section>

          <!-- Two -->
          <section id="two" class="wrapper style2">
            <header>
              <h2 v-if="demoMode === true">{{pictureblocktitle}}</h2>
              <p v-if="demoMode === true">{{pictureblockdescription}}</p>
              <h2 v-if="demoMode === false">{{pagedata.pictureblocktitle}}</h2>
              <p v-if="demoMode === false">{{pagedata.pictureblockdescription}}</p>
            </header>
            <div class="content">
              <div class="gallery">
                <div>
                  <div class="image fit flush">
                    <a href="../assets/forrest/pic03.jpg"><img src="../assets/forrest/pic03.jpg" alt="" /></a>
                  </div>
                </div>
                <div>
                  <div class="image fit flush">
                    <a href="../assets/forrest/pic01.jpg"><img src="../assets/forrest/pic01.jpg" alt="" /></a>
                  </div>
                </div>
                <div>
                  <div class="image fit flush">
                    <a href="../assets/forrest/pic04.jpg"><img src="../assets/forrest/pic04.jpg" alt="" /></a>
                  </div>
                </div>
                <div>
                  <div class="image fit flush">
                    <a href="../assets/forrest/pic05.jpg"><img src="../assets/forrest/pic05.jpg" alt="" /></a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Three -->
          <section id="three" class="wrapper">
            <div class="spotlight">
              <div class="image flush"><img src="../assets/forrest/pic06.jpg" alt="" /></div>
              <div class="inner">
                <h3 v-if="demoMode === true">{{photo1title}}</h3>
                <p v-if="demoMode === true">{{photo1text}}</p>
                <h3 v-if="demoMode === false">{{pagedata.photo1title}}</h3>
                <p v-if="demoMode === false">{{pagedata.photo1text}}</p>
              </div>
            </div>
            <div class="spotlight alt">
              <div class="image flush"><img src="../assets/forrest/pic07.jpg" alt="" /></div>
              <div  class="inner">
                <h3 v-if="demoMode === true">{{photo2title}}</h3>
                <p v-if="demoMode === true">{{photo2text}}</p>
                <h3 v-if="demoMode === false">{{pagedata.photo2title}}</h3>
                <p v-if="demoMode === false">{{pagedata.photo2text}}</p>
              </div>
            </div>
            <div class="spotlight">
              <div class="image flush"><img src="../assets/forrest/pic08.jpg" alt="" /></div>
              <div class="inner">
                <h3 v-if="demoMode === true">{{photo3title}}</h3>
                <p v-if="demoMode === true">{{photo3text}}</p>
                <h3 v-if="demoMode === false">{{pagedata.photo3title}}</h3>
                <p v-if="demoMode === false">{{pagedata.photo3text}}</p>
              </div>
            </div>
          </section>

        </div>
      </section>

      </body>
    </div>
</template>

<script>
  import axios from 'axios'
  import auth from '../auth'
  import App from "../App";
  import {eventBus} from '../main';


  export default {
    name: 'PageForest',
    components: {App},
    data() {
      return {
        valid: false,
        pagedata: {},
        dialog2: false,
        demoMode: false,
        theEmail: '',
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
            let data = { email: theEmail };

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
              } else if (this.eventdata.whatsChanging === 'subtitle') {
                this.subtitle = this.eventdata.changeTo
              } else if (this.eventdata.whatsChanging === 'subheader') {
                this.subheader = this.eventdata.changeTo
              } else if (this.eventdata.whatsChanging === 'emailheader') {
                this.emailheader = this.eventdata.changeTo
              } else if (this.eventdata.whatsChanging === 'buttontext') {
                this.buttontext = this.eventdata.changeTo
              } else if (this.eventdata.whatsChanging === 'pictureblocktitle') {
                this.pictureblocktitle = this.eventdata.changeTo
              } else if (this.eventdata.whatsChanging === 'pictureblockdescription') {
                this.pictureblockdescription = this.eventdata.changeTo
              } else if (this.eventdata.whatsChanging === 'photo1title') {
                this.photo1title = this.eventdata.changeTo
              } else if (this.eventdata.whatsChanging === 'photo1text') {
                this.photo1text = this.eventdata.changeTo
              } else if (this.eventdata.whatsChanging === 'photo2title') {
                this.photo2title = this.eventdata.changeTo
              } else if (this.eventdata.whatsChanging === 'photo2text') {
                this.photo2text = this.eventdata.changeTo
              } else if (this.eventdata.whatsChanging === 'photo3title') {
                this.photo3title = this.eventdata.changeTo
              } else if (this.eventdata.whatsChanging === 'photo3text') {
                this.photo3text = this.eventdata.changeTo
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
  /*
	Caminar by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

  /* Reset */

  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
  }


  body, input, select, textarea {
    font-family: "Poppins", sans-serif;
    font-weight: 300;
    font-size: 1rem;
    line-height: 1.65;
  }

  a {
    text-decoration: underline;
  }

  a:hover {
    text-decoration: none;
  }

  strong, b {
    font-weight: 600;
  }

  em, i {
    font-style: italic;
  }

  p {
    margin: 0 0 2rem 0;
  }

  p:last-child {
    margin: 0;
  }

  p.special {
    text-transform: uppercase;
    font-size: .75rem;
    font-weight: 300;
    margin: 0 0 .5rem 0;
    padding: 0 0 1rem 0;
    letter-spacing: .25rem;
  }

  p.special:after {
    content: '';
    position: absolute;
    margin: auto;
    right: 0;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.125);
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.5;
    margin: 0 0 1rem 0;
  }

  h1 a, h2 a, h3 a, h4 a, h5 a, h6 a {
    color: inherit;
    text-decoration: none;
  }

  h2 {
    font-size: 1.75rem;
  }

  h3 {
    font-size: 1.35rem;
  }

  h4 {
    font-size: 1.1rem;
  }

  h5 {
    font-size: 0.9rem;
  }

  h6 {
    font-size: 0.7rem;
  }

  sub {
    font-size: 0.8rem;
    position: relative;
    top: 0.5rem;
  }

  sup {
    font-size: 0.8rem;
    position: relative;
    top: -0.5rem;
  }

  blockquote {
    border-left: solid 4px;
    font-style: italic;
    margin: 0 0 2rem 0;
    padding: 0.5rem 0 0.5rem 2rem;
  }

  code {
    border-radius: 4px;
    border: solid 1px;
    font-family: "Courier New", monospace;
    font-size: 0.9rem;
    margin: 0 0.25rem;
    padding: 0.25rem 0.65rem;
  }

  pre {
    -webkit-overflow-scrolling: touch;
    font-family: "Courier New", monospace;
    font-size: 0.9rem;
    margin: 0 0 2rem 0;
  }

  pre code {
    display: block;
    line-height: 1.75;
    padding: 1rem 1.5rem;
    overflow-x: auto;
  }

  hr {
    border: 0;
    border-bottom: solid 1px;
    margin: 2rem 0;
  }

  input, select, textarea {
    color: #1e1f23;
  }

  a {
    color: #54a354;
  }

  strong, b {
    color: #1e1f23;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #1e1f23;
  }

  blockquote {
    border-left-color: rgba(144, 144, 144, 0.25);
  }

  code {
    background: rgba(144, 144, 144, 0.075);
    border-color: rgba(144, 144, 144, 0.25);
  }

  hr {
    border-bottom-color: rgba(144, 144, 144, 0.25);
  }

  /* Box */

  .box .image.fit {
    margin: 0;
    border-radius: 0;
  }

  .box .image.fit img {
    border-radius: 0;
  }

  .box header {
    margin: 0 0 2rem 0;
  }

  .box header h2 {
    margin-bottom: 1rem;
    position: relative;
    padding-bottom: 1rem;
    font-weight: 700;
  }

  .box header h2:after {
    content: '';
    position: absolute;
    margin: auto;
    right: 0;
    bottom: 0;
    left: 0;
    width: 10%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.125);
  }

  .box header p {
    text-transform: uppercase;
    font-size: .75rem;
    font-weight: 300;
    margin: 1rem 0;
    padding: 0;
    letter-spacing: .25rem;
  }

  .box .content {
    padding: 3rem;
  }

  .box > :last-child,
  .box > :last-child > :last-child,
  .box > :last-child > :last-child > :last-child {
    margin-bottom: 0;
  }


  /* Button */


  input[type="submit"].icon:before,
  input[type="reset"].icon:before,
  input[type="button"].icon:before,
  button.icon:before,
  .button.icon:before {
    margin-right: 0.5rem;
  }

  input[type="submit"].fit,
  input[type="reset"].fit,
  input[type="button"].fit,
  button.fit,
  .button.fit {
    display: block;
    margin: 0 0 1rem 0;
    width: 100%;
  }

  input[type="submit"].small,
  input[type="reset"].small,
  input[type="button"].small,
  button.small,
  .button.small {
    font-size: 0.8rem;
  }

  input[type="submit"].big,
  input[type="reset"].big,
  input[type="button"].big,
  button.big,
  .button.big {
    font-size: 1.35rem;
  }

  input[type="submit"].disabled, input[type="submit"]:disabled,
  input[type="reset"].disabled,
  input[type="reset"]:disabled,
  input[type="button"].disabled,
  input[type="button"]:disabled,
  button.disabled,
  button:disabled,
  .button.disabled,
  .button:disabled {
    -moz-pointer-events: none;
    -webkit-pointer-events: none;
    -ms-pointer-events: none;
    pointer-events: none;
    opacity: 0.25;
  }

  @media screen and (max-width: 480px) {

    input[type="submit"],
    input[type="reset"],
    input[type="button"],
    button,
    .button {
      padding: 0;
      width: 100%;
    }

  }

  input[type="submit"],
  input[type="reset"],
  input[type="button"],
  button,
  .button {
    background-color: #f2f2f2;
    color: #000 !important;
  }

  input[type="submit"]:hover,
  input[type="reset"]:hover,
  input[type="button"]:hover,
  button:hover,
  .button:hover {
    background-color: white;
  }

  input[type="submit"]:active,
  input[type="reset"]:active,
  input[type="button"]:active,
  button:active,
  .button:active {
    background-color: #e5e5e5;
  }

  input[type="submit"].alt,
  input[type="reset"].alt,
  input[type="button"].alt,
  button.alt,
  .button.alt {
    background-color: transparent;
    box-shadow: inset 0 0 0 2px rgba(144, 144, 144, 0.25);
    color: #1e1f23 !important;
  }

  input[type="submit"].alt:hover,
  input[type="reset"].alt:hover,
  input[type="button"].alt:hover,
  button.alt:hover,
  .button.alt:hover {
    background-color: rgba(144, 144, 144, 0.075);
  }

  input[type="submit"].alt:active,
  input[type="reset"].alt:active,
  input[type="button"].alt:active,
  button.alt:active,
  .button.alt:active {
    background-color: rgba(144, 144, 144, 0.2);
  }

  input[type="submit"].alt.icon:before,
  input[type="reset"].alt.icon:before,
  input[type="button"].alt.icon:before,
  button.alt.icon:before,
  .button.alt.icon:before {
    color: #bbb;
  }

  input[type="submit"].special,
  input[type="reset"].special,
  input[type="button"].special,
  button.special,
  .button.special {
    background-color: #54a354;
    color: #ffffff !important;
  }

  input[type="submit"].special:hover,
  input[type="reset"].special:hover,
  input[type="button"].special:hover,
  button.special:hover,
  .button.special:hover {
    background-color: #62ae62;
  }

  input[type="submit"].special:active,
  input[type="reset"].special:active,
  input[type="button"].special:active,
  button.special:active,
  .button.special:active {
    background-color: #4b924b;
  }

  /* Form */

  form {
    margin: 0 0 2rem 0;
  }

  label {
    display: block;
    font-size: 0.9rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
  }

  input[type="text"],
  input[type="password"],
  input[type="email"],
  select,
  textarea {
    -moz-appearance: none;
    -webkit-appearance: none;
    -ms-appearance: none;
    appearance: none;
    border-radius: 4px;
    border: none;
    border: solid 1px;
    color: inherit;
    display: block;
    outline: 0;
    padding: 0 1rem;
    text-decoration: none;
    width: 100%;
  }

  input[type="text"]:invalid,
  input[type="password"]:invalid,
  input[type="email"]:invalid,
  select:invalid,
  textarea:invalid {
    box-shadow: none;
  }

  .select-wrapper {
    text-decoration: none;
    display: block;
    position: relative;
  }

  .select-wrapper:before {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    text-transform: none !important;
  }

  .select-wrapper:before {
    content: '\f078';
    display: block;
    height: 2.75rem;
    line-height: 2.75rem;
    pointer-events: none;
    position: absolute;
    right: 0;
    text-align: center;
    top: 0;
    width: 2.75rem;
  }

  .select-wrapper select::-ms-expand {
    display: none;
  }

  input[type="text"],
  input[type="password"],
  input[type="email"],
  select {
    height: 2.75rem;
  }

  textarea {
    padding: 0.75rem 1rem;
  }

  input[type="checkbox"],
  input[type="radio"] {
    -moz-appearance: none;
    -webkit-appearance: none;
    -ms-appearance: none;
    appearance: none;
    display: block;
    float: left;
    margin-right: -2rem;
    opacity: 0;
    width: 1rem;
    z-index: -1;
  }

  input[type="checkbox"] + label,
  input[type="radio"] + label {
    text-decoration: none;
    cursor: pointer;
    display: inline-block;
    font-size: 1rem;
    font-weight: 300;
    padding-left: 2.4rem;
    padding-right: 0.75rem;
    position: relative;
  }

  input[type="checkbox"] + label:before,
  input[type="radio"] + label:before {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    text-transform: none !important;
  }

  input[type="checkbox"] + label:before,
  input[type="radio"] + label:before {
    border-radius: 4px;
    border: solid 1px;
    content: '';
    display: inline-block;
    height: 1.65rem;
    left: 0;
    line-height: 1.58125rem;
    position: absolute;
    text-align: center;
    top: 0;
    width: 1.65rem;
  }

  input[type="checkbox"]:checked + label:before,
  input[type="radio"]:checked + label:before {
    content: '\f00c';
  }

  input[type="checkbox"] + label:before {
    border-radius: 4px;
  }

  input[type="radio"] + label:before {
    border-radius: 100%;
  }

  ::-webkit-input-placeholder {
    opacity: 1.0;
  }

  :-moz-placeholder {
    opacity: 1.0;
  }

  ::-moz-placeholder {
    opacity: 1.0;
  }

  :-ms-input-placeholder {
    opacity: 1.0;
  }

  .formerize-placeholder {
    opacity: 1.0;
  }

  label {
    color: #1e1f23;
  }

  input[type="text"],
  input[type="password"],
  input[type="email"],
  select,
  textarea {
    background: rgba(144, 144, 144, 0.075);
    border-color: rgba(144, 144, 144, 0.25);
  }

  input[type="text"]:focus,
  input[type="password"]:focus,
  input[type="email"]:focus,
  select:focus,
  textarea:focus {
    border-color: #54a354;
    box-shadow: 0 0 0 1px #54a354;
  }

  .select-wrapper:before {
    color: rgba(144, 144, 144, 0.25);
  }

  input[type="checkbox"] + label,
  input[type="radio"] + label {
    color: rgba(0, 0, 0, 0.5);
  }

  input[type="checkbox"] + label:before,
  input[type="radio"] + label:before {
    background: rgba(144, 144, 144, 0.075);
    border-color: rgba(144, 144, 144, 0.25);
  }

  input[type="checkbox"]:checked + label:before,
  input[type="radio"]:checked + label:before {
    background-color: #54a354;
    border-color: #54a354;
    color: #ffffff;
  }

  input[type="checkbox"]:focus + label:before,
  input[type="radio"]:focus + label:before {
    border-color: #54a354;
    box-shadow: 0 0 0 1px #54a354;
  }

  ::-webkit-input-placeholder {
    color: #bbb !important;
  }

  :-moz-placeholder {
    color: #bbb !important;
  }

  ::-moz-placeholder {
    color: #bbb !important;
  }

  :-ms-input-placeholder {
    color: #bbb !important;
  }

  .formerize-placeholder {
    color: #bbb !important;
  }

  /* Gallery */

  .gallery {
    width: 100%;
    margin: 0;
    display: -moz-flex;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    -moz-flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -moz-align-items: stretch;
    -webkit-align-items: stretch;
    -ms-align-items: stretch;
    align-items: stretch;
  }

  .gallery .image.fit {
    margin: 0;
  }

  .gallery > * {
    -moz-flex-shrink: 1;
    -webkit-flex-shrink: 1;
    -ms-flex-shrink: 1;
    flex-shrink: 1;
    -moz-flex-grow: 0;
    -webkit-flex-grow: 0;
    -ms-flex-grow: 0;
    flex-grow: 0;
  }

  .gallery > * {
    width: 50%;
  }

  @media screen and (max-width: 980px) {

    .gallery > * {
      width: 100%;
    }

  }

  /* Icon */

  .icon {
    text-decoration: none;
    border-bottom: none;
    position: relative;
  }

  .icon:before {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    text-transform: none !important;
  }

  .icon > .label {
    display: none;
  }

  /* Image */

  .image {
    display: inline-block;
    position: relative;
  }

  .image.flush {
    margin: 0 !important;
  }

  .image img {
    display: block;
  }

  .image.left, .image.right {
    max-width: 50%;
  }

  .image.left img, .image.right img {
    width: 100%;
  }

  .image.left {
    float: left;
    margin: 0 1rem 1rem 0;
    top: 0.25rem;
  }

  .image.right {
    float: right;
    margin: 0 0 1rem 1rem;
    top: 0.25rem;
  }

  .image.fit {
    display: block;
    margin: 0 0 2rem 0;
    width: 100%;
  }

  .image.fit img {
    width: 100%;
  }

  .image.main {
    display: block;
    margin: 0 0 3rem 0;
    width: 100%;
  }

  .image.main img {
    width: 100%;
  }

  /* List */

  ol {
    list-style: decimal;
    margin: 0 0 2rem 0;
    padding-left: 1.25rem;
  }

  ol li {
    padding-left: 0.25rem;
  }

  ul {
    list-style: disc;
    margin: 0 0 2rem 0;
    padding-left: 1rem;
  }

  ul li {
    padding-left: 0.5rem;
  }

  ul.alt {
    list-style: none;
    padding-left: 0;
  }

  ul.alt li {
    border-top: solid 1px;
    padding: 0.5rem 0;
  }

  ul.alt li:first-child {
    border-top: 0;
    padding-top: 0;
  }

  ul.icons {
    cursor: default;
    list-style: none;
    padding-left: 0;
  }

  ul.icons li {
    display: inline-block;
    padding: 0 1rem 0 0;
  }

  ul.icons li:last-child {
    padding-right: 0;
  }

  ul.icons li .icon:before {
    font-size: 2rem;
  }

  ul.actions {
    cursor: default;
    list-style: none;
    padding-left: 0;
  }

  ul.actions li {
    display: inline-block;
    padding: 0 1rem 0 0;
    vertical-align: middle;
  }

  ul.actions li:last-child {
    padding-right: 0;
  }

  ul.actions.small li {
    padding: 0 0.5rem 0 0;
  }

  ul.actions.vertical li {
    display: block;
    padding: 1rem 0 0 0;
  }

  ul.actions.vertical li:first-child {
    padding-top: 0;
  }

  ul.actions.vertical li > * {
    margin-bottom: 0;
  }

  ul.actions.vertical.small li {
    padding: 0.5rem 0 0 0;
  }

  ul.actions.vertical.small li:first-child {
    padding-top: 0;
  }

  ul.actions.fit {
    display: table;
    margin-left: -1rem;
    padding: 0;
    table-layout: fixed;
    width: calc(100% + 1rem);
  }

  ul.actions.fit li {
    display: table-cell;
    padding: 0 0 0 1rem;
  }

  ul.actions.fit li > * {
    margin-bottom: 0;
  }

  ul.actions.fit.small {
    margin-left: -0.5rem;
    width: calc(100% + 0.5rem);
  }

  ul.actions.fit.small li {
    padding: 0 0 0 0.5rem;
  }

  @media screen and (max-width: 480px) {

    ul.actions {
      margin: 0 0 2rem 0;
    }

    ul.actions li {
      padding: 1rem 0 0 0;
      display: block;
      text-align: center;
      width: 100%;
    }

    ul.actions li:first-child {
      padding-top: 0;
    }

    ul.actions li > * {
      width: 100%;
      margin: 0 !important;
    }

    ul.actions li > *.icon:before {
      margin-left: -2rem;
    }

    ul.actions.small li {
      padding: 0.5rem 0 0 0;
    }

    ul.actions.small li:first-child {
      padding-top: 0;
    }

  }

  dl {
    margin: 0 0 2rem 0;
  }

  dl dt {
    display: block;
    font-weight: 700;
    margin: 0 0 1rem 0;
  }

  dl dd {
    margin-left: 2rem;
  }

  ul.alt li {
    border-top-color: rgba(144, 144, 144, 0.25);
  }

  /* Section/Article */

  section.special, article.special {
    text-align: center;
  }

  header p {
    position: relative;
    margin: 0 0 1.5rem 0;
  }

  header h2 + p {
    font-size: 1.25rem;
    margin-top: -1rem;
  }

  header h3 + p {
    font-size: 1.1rem;
    margin-top: -0.8rem;
  }

  header h4 + p,
  header h5 + p,
  header h6 + p {
    font-size: 0.9rem;
    margin-top: -0.6rem;
  }

  header p {
    color: #bbb;
  }

  /*Spotlight */

  .spotlight {
    display: -moz-flex;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    -moz-flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -moz-align-items: center;
    -webkit-align-items: center;
    -ms-align-items: center;
    align-items: center;
  }

  .spotlight > * {
    -moz-flex-shrink: 1;
    -webkit-flex-shrink: 1;
    -ms-flex-shrink: 1;
    flex-shrink: 1;
    -moz-flex-grow: 0;
    -webkit-flex-grow: 0;
    -ms-flex-grow: 0;
    flex-grow: 0;
  }

  .spotlight > * {
    width: 50%;
  }

  .spotlight p:last-child {
    margin: 0;
  }

  .spotlight .inner {
    padding: 6rem;
  }

  .spotlight .image {
    margin: 0;
  }

  .spotlight .image img {
    width: 100%;
  }

  .spotlight.alt {
    background: #1e1f23;
    color: rgba(255, 255, 255, 0.25);
    display: -moz-flex;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    -moz-flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -moz-align-items: center;
    -webkit-align-items: center;
    -ms-align-items: center;
    align-items: center;
    text-align: right;
  }

  .spotlight.alt > * {
    -moz-flex-shrink: 1;
    -webkit-flex-shrink: 1;
    -ms-flex-shrink: 1;
    flex-shrink: 1;
    -moz-flex-grow: 0;
    -webkit-flex-grow: 0;
    -ms-flex-grow: 0;
    flex-grow: 0;
  }

  .spotlight.alt h3 {
    color: #FFF;
  }

  .spotlight.alt .image {
    -moz-order: 2;
    -webkit-order: 2;
    -ms-order: 2;
    order: 2;
  }

  @media screen and (max-width: 1280px) {

    .spotlight .inner {
      padding: 4rem;
    }

  }

  @media screen and (max-width: 980px) {

    .spotlight {
      display: -moz-flex;
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      -moz-flex-wrap: wrap;
      -webkit-flex-wrap: wrap;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      -moz-align-items: center;
      -webkit-align-items: center;
      -ms-align-items: center;
      align-items: center;
      text-align: center;
    }

    .spotlight > * {
      -moz-flex-shrink: 1;
      -webkit-flex-shrink: 1;
      -ms-flex-shrink: 1;
      flex-shrink: 1;
      -moz-flex-grow: 0;
      -webkit-flex-grow: 0;
      -ms-flex-grow: 0;
      flex-grow: 0;
    }

    .spotlight > * {
      width: 100%;
    }

    .spotlight.alt {
      display: -moz-flex;
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      -moz-flex-wrap: wrap;
      -webkit-flex-wrap: wrap;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      -moz-align-items: center;
      -webkit-align-items: center;
      -ms-align-items: center;
      align-items: center;
      text-align: center;
    }

    .spotlight.alt > * {
      -moz-flex-shrink: 1;
      -webkit-flex-shrink: 1;
      -ms-flex-shrink: 1;
      flex-shrink: 1;
      -moz-flex-grow: 0;
      -webkit-flex-grow: 0;
      -ms-flex-grow: 0;
      flex-grow: 0;
    }

    .spotlight.alt .image {
      -moz-order: 0;
      -webkit-order: 0;
      -ms-order: 0;
      order: 0;
    }

  }

  @media screen and (max-width: 736px) {

    .spotlight .inner {
      padding: 2rem;
    }

  }

  /* Table */

  .table-wrapper {
    -webkit-overflow-scrolling: touch;
    overflow-x: auto;
  }

  table {
    margin: 0 0 2rem 0;
    width: 100%;
  }

  table tbody tr {
    border: solid 1px;
    border-left: 0;
    border-right: 0;
  }

  table td {
    padding: 0.75rem 0.75rem;
  }

  table th {
    font-size: 0.9rem;
    font-weight: 700;
    padding: 0 0.75rem 0.75rem 0.75rem;
    text-align: left;
  }

  table thead {
    border-bottom: solid 2px;
  }

  table tfoot {
    border-top: solid 2px;
  }

  table.alt {
    border-collapse: separate;
  }

  table.alt tbody tr td {
    border: solid 1px;
    border-left-width: 0;
    border-top-width: 0;
  }

  table.alt tbody tr td:first-child {
    border-left-width: 1px;
  }

  table.alt tbody tr:first-child td {
    border-top-width: 1px;
  }

  table.alt thead {
    border-bottom: 0;
  }

  table.alt tfoot {
    border-top: 0;
  }

  table tbody tr {
    border-color: rgba(144, 144, 144, 0.25);
  }

  table tbody tr:nth-child(2n + 1) {
    background-color: rgba(144, 144, 144, 0.075);
  }

  table th {
    color: #1e1f23;
  }

  table thead {
    border-bottom-color: rgba(144, 144, 144, 0.25);
  }

  table tfoot {
    border-top-color: rgba(144, 144, 144, 0.25);
  }

  table.alt tbody tr td {
    border-color: rgba(144, 144, 144, 0.25);
  }

  /* Header */

  body {
    background-color: #1e1f23;
    padding-top: 8rem;
  }

  body.is-loading:after {
    visibility: hidden;
    opacity: 0;
  }

  .background {
    background-image: url('../assets/forrest/bg.jpg');
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: block;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    visibility: visible;
    opacity: 1;
  }

  @media screen and (max-width: 980px) {

    body:after {
      background-attachment: scroll;
      background-position: top;
      background-size: 100%;
    }

  }

  #header {
    color: #a6a6a6;
    cursor: default;
    position: relative;
    text-align: center;
    z-index: 10001;
  }

  #header > .logo {
    margin: 0 0 4rem 0;
    padding: 0;
  }

  #header > .logo a {
    font-size: 4rem;
    font-weight: 700;
    color: #FFF;
    text-decoration: none;
    line-height: 1rem;
  }

  #header > .logo span {
    font-weight: 300;
    font-size: 1rem;
    display: block;
    color: rgba(255, 255, 255, 0.65);
  }

  @media screen and (max-width: 1280px) {

    body {
      padding-top: 6rem;
      background-attachment: scroll;
      background-size: auto;
      background-position: top;
    }

  }

  @media screen and (max-width: 736px) {

    #header > .logo {
      margin: 0 0 2rem 0;
    }

    #header > .logo a {
      font-size: 3rem;
    }

  }

  /* Main */

  #main > .inner {
    margin: 0 auto;
    width: 80rem;
    max-width: 90%;
    margin-bottom: 2rem;
    background: rgba(255, 255, 255, 0.95);
    -webkit-box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.75);
    border-radius: 4px;
  }

  @media screen and (max-width: 980px) {

    #main .image {
      width: 100%;
      min-width: 100%;
      float: none;
      margin: 0 0 2rem 0;
    }

    #main .image img {
      width: 100%;
    }

  }

  .wrapper > header {
    text-align: center;
    background: #FFF;
    padding: 2rem;
    margin: 0;
  }

  .wrapper > header h2 {
    position: relative;
    padding-bottom: .75rem;
  }

  .wrapper > header h2:after {
    content: '';
    position: absolute;
    margin: auto;
    right: 0;
    bottom: 0;
    left: 0;
    width: 10%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.125);
  }

  .wrapper > header p {
    text-transform: uppercase;
    font-weight: 300;
    font-size: .8rem;
    letter-spacing: .25rem;
    margin: 0;
  }

  .wrapper > header.special {
    padding: 4rem 2rem;
  }

  @media screen and (max-width: 980px) {

    .wrapper > header.special {
      padding: 3rem 2rem;
    }

  }

  @media screen and (max-width: 736px) {

    .wrapper > header {
      padding: 1.5rem;
    }

    .wrapper > header h2 {
      font-size: 1.5rem;
    }

    .wrapper > header h2:after {
      width: 50%;
    }

  }

  .wrapper.style1 .content {
    padding: 6rem;
  }

  @media screen and (max-width: 1280px) {

    .wrapper.style1 .content {
      padding: 4rem;
    }

  }

  @media screen and (max-width: 736px) {

    .wrapper.style1 .content {
      padding: 2rem;
    }

  }

  .wrapper.style2 {
    background: #1e1f23;
    padding: 6rem;
  }

  .wrapper.style2 header {
    background: #121315;
    border-radius: 4px 4px 0 0;
  }

  .wrapper.style2 header h2 {
    color: #FFF;
  }

  .wrapper.style2 header h2:after {
    background-color: rgba(255, 255, 255, 0.125);
  }

  .wrapper.style2 header p {
    color: rgba(255, 255, 255, 0.25);
  }

  @media screen and (max-width: 1280px) {

    .wrapper.style2 {
      padding: 4rem;
    }

  }

  @media screen and (max-width: 736px) {

    .wrapper.style2 {
      padding: 2rem;
    }

  }

  /* Footer */

  #footer {
    padding: 2rem 0 0.1rem 0 ;
    text-align: center;
  }

  #footer a {
    color: rgba(255, 255, 255, 0.75);
  }

  #footer a:hover {
    color: #FFF;
  }

  #footer .copyright {
    color: #bbb;
    font-size: 0.9rem;
    margin: 0 0 2rem 0;
    padding: 0 1rem;
    text-align: center;
  }

  @media screen and (max-width: 736px) {

    #footer {
      padding: 1rem 0 0.1rem 0 ;
    }

  }

</style>
