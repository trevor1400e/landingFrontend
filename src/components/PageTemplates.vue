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
            <v-btn flat @click="$emit('showView', 'EditPage', 'Plane')">Use</v-btn>
            <v-btn flat to="/plane" color="blue">Preview</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="show = !show">
              <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="show">
              I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
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
              I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    <v-flex xs12 sm4 class="smallspace">
      <v-card>
        <v-card-media
          :src="paraImage"
          height="200px"
        >
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <div class="headline text-xs-left">Paralax Theme</div>
            <span class="grey--text">Paralax beautiful premium theme.</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat @click="$emit('showView', 'EditPage', 'Para')" :disabled="!premium">Use</v-btn>
          <v-btn flat color="blue" to="/paralax">Preview</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="show3 = !show3">
            <v-icon>{{ show3 ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="show3">
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
    <v-layout row style="padding: 20px; padding-top: 10px">
      <v-flex xs12 sm4 class="smallspace">
        <v-card>
          <v-card-media
            :src="drawingImage"
            height="200px"
          >
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <div class="headline text-xs-left">Drawing Theme</div>
              <span class="grey--text">Paralax beautiful premium theme.</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat @click="$emit('showView', 'EditPage', 'Drawing')" :disabled="!premium">Use</v-btn>
            <v-btn flat color="blue" to="/drawing">Preview</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="show4 = !show4">
              <v-icon>{{ show4 ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="show4">
              I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
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
  import paraImage from "../assets/paratheme.png"
  import drawingImage from "../assets/drawingtheme.png"
  import axios from 'axios'

  export default {
    data: () => ({
      show: false,
      show2: false,
      show3: false,
      show4: false,
      springImage: springImage,
      beachImage: beachImage,
      paraImage: paraImage,
      drawingImage: drawingImage,
      premium: false
    }),
    created(){
      this.fetchData()
    },
    methods: {
      fetchData() {
        axios.get('http://localhost:8082/users/me', {headers: {"Authorization": "Bearer " + localStorage.getItem('access_token')}
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
