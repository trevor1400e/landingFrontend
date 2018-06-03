<template>
  <div>
  <v-layout row style="padding: 20px">
      <v-flex xs12 sm4 class="smallspace">
        <v-card>
          <v-card-media
            :src="springImage"
            height="200px"
          >
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <div class="headline text-xs-left">Spring Theme</div>
              <span class="grey--text">Get leads with this relaxing universal theme.</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat @click="$emit('showView', 'EditPage', 'Spring')">Use</v-btn>
            <v-btn flat to="/spring" color="blue">Preview</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="show = !show">
              <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="show">
              Free Theme.
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>

      <v-flex xs12 sm4 class="smallspace">
        <v-card>
          <v-card-media
            :src="beachImage"
            height="200px"
          >
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <div class="headline text-xs-left">Beach Theme</div>
              <span class="grey--text">Great theme for travel niche.</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat @click="$emit('showView', 'EditPage', 'Beach')">Use</v-btn>
            <v-btn flat color="blue" to="/beach">Preview</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="show2 = !show2">
              <v-icon>{{ show2 ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="show2">
              Free Theme.
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    <v-flex xs12 sm4 class="smallspace">
      <v-card>
        <v-card-media
          v-if="!premium"
          :src="paraLockedImage"
          height="200px"
        >
        </v-card-media>
          <v-card-media
            v-if="premium"
            :src="paraImage"
            height="200px"
          >
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <div class="headline text-xs-left">Paralax Theme</div>
            <span class="grey--text">Paralax+Mobile optimized theme.</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat @click="$emit('showView', 'EditPage', 'Para')" v-if="premium">Use</v-btn>
          <v-btn flat @click="$emit('showView', 'Upgrade')" v-if="!premium">Upgrade</v-btn>
          <v-btn flat color="blue" to="/paralax">Preview</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="show3 = !show3">
            <v-icon>{{ show3 ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="show3">
            Premium Theme.
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
    <v-layout row style="padding: 20px; padding-top: 10px">
      <v-flex xs12 sm4 class="smallspace">
        <v-card>
          <v-card-media
            v-if="premium"
            :src="drawingImage"
            height="200px"
          >
          </v-card-media>
          <v-card-media
            v-if="!premium"
            :src="drawingLockedImage"
            height="200px"
          >
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <div class="headline text-xs-left">Drawing Theme</div>
              <span class="grey--text">Video animation background.</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat @click="$emit('showView', 'EditPage', 'Drawing')" v-if="premium">Use</v-btn>
            <v-btn flat @click="$emit('showView', 'Upgrade')" v-if="!premium">Upgrade</v-btn>
            <v-btn flat color="blue" to="/drawing">Preview</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="show4 = !show4">
              <v-icon>{{ show4 ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="show4">
              Premium Theme.
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
      <v-flex xs12 sm4 class="smallspace">
        <v-card>
          <v-card-media
            v-if="premium"
            :src="forestImage"
            height="200px"
          >
          </v-card-media>
          <v-card-media
            v-if="!premium"
            :src="forestLockedImage"
            height="200px"
          >
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <div class="headline text-xs-left">Forest Theme</div>
              <span class="grey--text">Calming forest theme.</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat @click="$emit('showView', 'EditPage', 'Forest')" v-if="premium">Use</v-btn>
            <v-btn flat @click="$emit('showView', 'Upgrade')" v-if="!premium">Upgrade</v-btn>
            <v-btn flat color="blue" to="/forest">Preview</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="show5 = !show5">
              <v-icon>{{ show5 ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="show5">
              Premium Theme.
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import springImage from "../assets/springtheme4.png"
  import beachImage from "../assets/beachBackground.png"
  import paraImage from "../assets/paralaxbg4.png"
  import drawingImage from "../assets/drawingtheme.png"
  import drawingLockedImage from "../assets/drawingLockedtheme.png"
  import forestImage from "../assets/forrest/forestbg.png"
  import forestLockedImage from "../assets/forrest/forestLockedbg.png"
  import paraLockedImage from "../assets/paralaxLocked.png"
  import axios from 'axios'
  import auth from '../auth'

  export default {
    data: () => ({
      show: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      springImage: springImage,
      beachImage: beachImage,
      paraImage: paraImage,
      paraLockedImage: paraLockedImage,
      drawingImage: drawingImage,
      drawingLockedImage: drawingLockedImage,
      forestImage: forestImage,
      forestLockedImage: forestLockedImage,
      premium: false
    }),
    created(){
      this.fetchData()
    },
    methods: {
      fetchData() {
        axios.get(auth.API.URL+'users/me', {headers: {"Authorization": "Bearer " + localStorage.getItem('access_token')}
        }).then((resp) => {
          this.theUser = JSON.parse(JSON.stringify(resp.data))

          if(resp.data.premiumstatus === "active"){
            this.premium = true
          }

        })
          .catch((err) => {
            console.log(err)
            this.premium = false
          })
      }
    }
  }
</script>

<style>
  .smallspace{
    padding: 10px;
  }
</style>
