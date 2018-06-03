<template>
  <div>
    <!--<h1 class="text-xs-left">Account Settings</h1>-->
    <!--<v-divider></v-divider>-->
    <br/>
    <v-flex xs6 offset-xs3>
      <v-card class="elevation-12" style="border-radius: 5px">
        <v-toolbar dark color="primary">
          <v-flex xs12>
          <v-toolbar-title>Account Settings</v-toolbar-title>
          </v-flex>
        </v-toolbar>
        <br/>
        <h1>Account Name: {{theUser.username}}</h1>
        <h1>Account Email: {{theUser.email}}</h1>
        <h1>Account Role: {{theUser.roles}} <v-btn color="info" @click="$emit('showView', 'Upgrade')">Upgrade</v-btn></h1>
        <h1>Premium Status: {{theUser.premiumstatus}}</h1>
        <br/>
      </v-card>
    </v-flex>



  </div>
</template>

<script>
  import axios from 'axios'
  import auth from '../auth'

  export default {
    data () {
      return {
        theUser: {},
        premium: "loading"
      }
    },
    created(){
      this.fetchData()
    },
    methods: {
      fetchData() {
        axios.get(auth.API.URL+'users/me', {headers: {"Authorization": "Bearer " + localStorage.getItem('access_token')}
        }).then((resp) => {
          this.theUser = JSON.parse(JSON.stringify(resp.data))

          this.premium = resp.data.premiumstatus

        })
          .catch((err) => {
            console.log(err)
            this.premium = "unpaid"
          })
      }
    }
  }
</script>
