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
        <h1>Premium Exp: {{theUser.premexp}}</h1>
        <h1>Are you premium: {{premium}}</h1>
        <br/>
      </v-card>
    </v-flex>



  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        theUser: {},
        premium: false
      }
    },
    created(){
      this.fetchData()
    },
    methods: {
      fetchData() {
        axios.get('http://localhost:8082/users/me', {headers: {"Authorization": "Bearer " + localStorage.getItem('access_token')}
        }).then((resp) => {
          this.theUser = JSON.parse(JSON.stringify(resp.data))

          if(resp.data.premexp != null) {
            var date1 = new Date(resp.data.premexp);

            var date = new Date();

            //mydate=new Date('2016-09-13');

            if (date < date1) {
              this.premium = true
            }
            else {
              this.premium = false
            }
          }



        })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
</script>
