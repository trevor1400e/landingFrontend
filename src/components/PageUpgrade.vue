<template>
  <div>
    <h1 class="text-xs-left">Upgrade Page</h1>
    <v-divider></v-divider>
    <br/>
    <v-flex xs4 offset-xs4>
      <v-card class="elevation-12" style="border-radius: 15px">
        <v-toolbar dark color="primary">
          <v-flex xs12><v-toolbar-title>1 Month Subscription</v-toolbar-title></v-flex>
        </v-toolbar>
        <br/>
        <h1>$9.95/Month</h1>
        <br/>
        <h2>•Access Premium Themes</h2>
        <h2>•View Statistics on Visitors/Conversions</h2>
        <h2>•Locked in at Limited Time Price Offer </h2>
        <h2>•No Email Collection Limit Per Theme </h2>
        <h2>•Edit Themes (coming soon)</h2>
        <h2>•Mobile Optimized Themes (coming soon)</h2>
        <h2>•Collect More Than Just Emails (coming soon)</h2>
        <h2>•Email & Funnel Marketing Tools (coming soon)</h2>
        <br/>
        <v-card-actions>
          <v-flex xs12><v-btn color="info" @click="checkout">Upgrade
          <v-icon>add</v-icon>
          </v-btn></v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
  import axios from 'axios'
  import auth from '../auth'
  import Vue from 'vue';
  import VueStripeCheckout from 'vue-stripe-checkout';

  const options = {
    key: 'pk_live_kkSqdBAPflkE9ZmersucM463',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/GreenButton_UpArrow.svg/110px-GreenButton_UpArrow.svg.png',
    locale: 'auto',
    currency: 'USD',
    billingAddress: true,
    panelLabel: 'Subscribe {{amount}}'
  }

  Vue.use(VueStripeCheckout, options);

  export default {
    data () {
      return {
        user: {}
      }
    },
    created(){
      //this.fetchData()
    },
    methods: {
      fetchData() {
        axios.get(auth.API.URL+'users/me', {
          headers: {"Authorization": "Bearer " + localStorage.getItem('access_token')}
        }).then((resp) => {
          this.user = JSON.parse(JSON.stringify(resp.data))

        })
          .catch((err) => {
            console.log(err)
          })
      },
      checkout() {
        // this.$checkout.close()
        // is also available.
        this.$checkout.open({
          name: '1 Month Subscription',
          currency: 'USD',
          amount: 995,
          livemode: true,
          token: (token) => {
            // Send the token to your server
            // for payment or subscription handling,
            // or do whatever you want with it
            // I don't really care.
            var usertoken = token.id
            let data = JSON.stringify({
              chargetoken: usertoken,
              email: "test@gmail.com"
            })

            axios.post(auth.API.URL+'users/upgrade', data, {headers: {"Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('access_token')}
            }).then(function(response){
              // TODO maybe handle success or errors?
            });
          }
        });
      }},
      components: {
        'stripe-checkout': VueStripeCheckout
      }
    }

</script>

