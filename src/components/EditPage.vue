<template>
  <v-container grid-list fill-height>
    <v-layout row>
    <v-flex sm8>
        <iframe v-if="display === 'Plane'" id="springframe" src="/#/plane" style="height: 500px; width: 90%; min-height: 0vh"></iframe>
        <iframe v-if="display === 'Beach'" id="beachframe" src="/#/beach" style="height: 500px; width: 90%; min-height: 0vh"></iframe>
        <iframe v-if="display === 'Para'" id="paraframe" src="/#/paralax" style="height: 500px; width: 90%; min-height: 0vh"></iframe>
        <iframe v-if="display === 'Drawing'" id="drawingframe" src="/#/drawing" style="height: 500px; width: 90%; min-height: 0vh"></iframe>
        <!--<PagePara v-if="display === 'Para'" class="application&#45;&#45;wrap" style="height: 500px; width: 90%; min-height: 0vh"></PagePara>-->
    </v-flex>
      <v-spacer></v-spacer>
    <v-flex sm4>
      <!-- - add validation to text fields-->
      <!-- - fill out dashboard fields from Theme table lookup-->
      <springStepper v-if="display === 'Plane'"></springStepper>
      <beachStepper v-if="display === 'Beach'"></beachStepper>
      <paraStepper v-if="display === 'Para'"></paraStepper>
      <drawingStepper v-if="display === 'Drawing'"></drawingStepper>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import auth from '../auth'
  import vuetify from 'vuetify'
  import springStepper from './SpringStepper'
  import beachStepper from './BeachStepper'
  import paraStepper from './ParaStepper'
  import drawingStepper from './DrawingStepper'
  import PagePlane from './PagePlane';
  import PageBeach from './PageBeach';
  import PagePara from './PagePara';
  import PageDrawing from './PageDrawing';
  import {eventBus} from '../main';

  export default {
    name: 'EditPage',

    data() {
      return {
        planedata: {},
        display: '',
      }
    },
    components: {
      PagePlane, PageBeach, PagePara, PageDrawing,
      vuetify, springStepper, beachStepper, paraStepper, drawingStepper
    },
    props: {
      parentData: {
        type: String,
        default() {
          return ''
        }
      }
    },
    beforeMount() {
     this.display = this.parentData
     },
    methods: {
      }
  }
</script>

<style scoped>
   >>> .application--wrap{
     min-height: 0px ;
   }
</style>
