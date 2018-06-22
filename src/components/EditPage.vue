<template>
  <div>
    <PreviewPage
      :component="currentThemeComponent"
      :customData="pageData"
      :fullscreen="fullscreen"
      :forceUpdate="flipper"/>

    <v-card class="page-menu" :style="`opacity: ${controls ? 1 : 0.2}`">
      <v-card-actions>
        <v-switch label="Fullscreen" v-model="fullscreen"></v-switch>
        <v-switch label="Controls" v-model="controls"></v-switch>
      </v-card-actions>
      <v-stepper v-model="stepperStep" v-if="controls">
        <v-stepper-header>
          <v-stepper-step step="1" :complete="stepperStep > 1" editable>Edit Page Info</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" :complete="stepperStep > 2" editable>Set Page Details</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-form v-model="valid">
              <v-text-field v-for="fieldName in Object.keys(currentDataContracts)"
                            :label="currentDataContracts[fieldName].name"
                            @input="updatePageData(fieldName, $event)"
                            :value="pageData[fieldName]"
                            :rules="required(currentDataContracts[fieldName].name)"
                            required>
              </v-text-field>
            </v-form>
            <v-btn color="primary" @click.native="stepperStep = 2" :disabled="!valid">Continue</v-btn>
            <v-btn flat to="/">Cancel</v-btn>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-text-field
              label="Email Submit Redirect Url"
              v-model="redirectUrl"
              :rules="urlRule"
              required
            ></v-text-field>
            <v-form v-model="valid">
              <v-text-field
                label="Page id (/JoeShmoe)"
                v-model="pageid"
                :rules="pageIdRule"
                prefix="/"
                required
              ></v-text-field>
              <p class="text-xs-left" v-text="errorText" style="color: red"></p>
            </v-form>
            <v-btn v-if="stepperStep === 2" flat @click="stepperStep = 1">back</v-btn>
            <v-btn color="primary" @click.native="createPage" :disabled="!valid">Submit</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>

  </div>
</template>

<script>
  import vuetify from 'vuetify'
  import springStepper from './SpringStepper'
  import beachStepper from './BeachStepper'
  import paraStepper from './ParaStepper'
  import drawingStepper from './DrawingStepper'
  import forestStepper from './ForestStepper'
  import PageSpring from './PageSpring';
  import PageBeach from './PageBeach';
  import PagePara from './PagePara';
  import PageDrawing from './PageDrawing';
  import validation from '../mixins/validationMixin';
  import PreviewPage from './PreviewPage';
  import axios from 'axios'
  import auth from '../auth'
  import themes from '../themes'

  import {eventBus} from '../main';

  export default {
    name: 'EditPage',
    mixins: [validation],
    components: {
      PageSpring, PageBeach, PagePara, PageDrawing,
      vuetify, springStepper, beachStepper, paraStepper, drawingStepper, forestStepper, PreviewPage
    },
    mounted() {
      this.loadDefaults();
    },
    data() {
      return {
        valid: false,
        planedata: {},
        display: '',
        stepperStep: 1,
        redirectUrl: 'https://google.com',
        pageid: 'mySite',
        errorText: '',
        pageData: {},
        fullscreen: false,
        controls: true,
        flipper: false
      }
    },
    computed: {
      currentDataContracts() {
        return themes[this.$route.params.themeName].dataContract;
      },
      currentThemeComponent() {
        return themes[this.$route.params.themeName];
      }
    },
    watch: {
      $route() {
        this.loadDefaults()
      },
      fullscreen(val) {
        eventBus.$emit('fullscreen', val)
      }
    },
    methods: {
      updatePageData(fieldName, value) {
        this.flipper = !this.flipper
        this.$set(this.pageData, fieldName, value)
      }
      ,
      loadDefaults() {
        this.pageData = {};
        const self = this;
        Object.keys(this.currentDataContracts).forEach(fieldName => {
          self.pageData[fieldName] = this.currentDataContracts[fieldName].default
        })
      }
      ,
      createPage() {
        let payload = {
          name: this.pageid,
          themeName: this.$route.params.themeName,
          data: JSON.stringify(this.pageData)
        };

        const self = this;

        axios.post(auth.API.URL + 'pages', payload, {
          headers: {"Authorization": "Bearer " + localStorage.getItem('access_token')}
        }).then(function (response) {
          if (response.data) {
            window.location.href = auth.API.REDIRECT_URL
          } else {
            self.errorText = 'Page name already taken.'
          }
        });
      }
      ,
    }
  }
</script>

<style scoped>
  > > > .application--wrap {
    min-height: 0px;
  }

  .page-menu {
    position: fixed;
    width: 450px;
    top: 96px;
    right: 16px;
  }
</style>
