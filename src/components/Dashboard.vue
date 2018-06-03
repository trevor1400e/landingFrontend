<template>
  <div>
    <div v-if="authenticated === true">
    <v-app id="inspire" v-bind:dark="isdark">
      <v-navigation-drawer
        clipped
        fixed
        v-model="drawer"
        app
      >
        <v-list dense>
          <v-list-tile @click="showView('Dash')">
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="showView('Temp')">
            <v-list-tile-action>
              <v-icon>create</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Create New</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="showView('Acct')">
            <v-list-tile-action>
              <v-icon>settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Account Settings</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="showView('Upgrade')">
            <v-list-tile-action>
              <v-icon>payment</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Upgrade</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-flex xs12 offset-xs3>
          <v-switch
            :label="'Dark theme'"
            v-model="isdark"
          ></v-switch></v-flex>
      </v-navigation-drawer>
      <v-toolbar app fixed clipped-left>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>LeadLucky</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn @click="logout" round color="blue darken-3" class="white--text" to="/">
          Logout
        <v-icon right dark>account_circle</v-icon>
        </v-btn>

      </v-toolbar>
      <v-content>

        <alertmessage></alertmessage>
        <PageTable v-if="display === 'Dash'"></PageTable>
        <PageTemplates @showView="showView" v-if="display === 'Temp'"></PageTemplates>
        <EditPage  v-if="display === 'EditPage'" :parentData="themeName"></EditPage>
        <PageAccount @showView="showView" v-if="display === 'Acct'"></PageAccount>
        <PageUpgrade v-if="display === 'Upgrade'"></PageUpgrade>
      </v-content>
      <v-footer app fixed style="color: #7c7c7c">
        <span>LeadLucky &copy; 2018</span>
        <v-spacer></v-spacer>
        <span>Support@LeadLucky.com</span>
      </v-footer>
    </v-app>
    </div>
    <div v-if="authenticated === false">
      <h1>Please login, redirecting...</h1>
    </div>
  </div>
</template>


<script>
  import Hello from './HelloWorld'
  import alertmessage from './alertmessage'
  import PageTable from './PageTable'
  import PageTemplates from './PageTemplates'
  import PagePlane from './PageSpring'
  import auth from '../auth'
  import EditPage from './EditPage'
  import PageAccount from './PageAccount'
  import PageUpgrade from './PageUpgrade'
  import axios from 'axios'
  import {eventBus} from '../main';


  export default {
    name: 'Dashboard',
    components: {
      Hello, alertmessage, PageTable, PageTemplates, PagePlane, EditPage, PageAccount, PageUpgrade
    },
    data: () => ({
      drawer: true,
      display: 'Dash',
      isdark: false,
      user2: auth.user,
      themeName: '',
      authenticated: true
    }),
    methods: {
      showView(viewName, themeName) {
        this.display = viewName
        if(themeName != null){
          this.themeName = themeName
        }
      },
      logout(){
        auth.logout()
      },
      fetchData() {
        axios.get(auth.API.URL+'users/me', {headers: {"Authorization": "Bearer " + localStorage.getItem('access_token')}
        }).then((resp) => {
          this.theUser = JSON.parse(JSON.stringify(resp.data))

          this.authenticated = true

        })
          .catch((err) => {
            console.log(err)
            this.authenticated = false
            window.location.href = auth.API.REDIRECT_URL
          })
      }
    },
    created(){
      auth.checkAuth()
      if(auth.user.authenticated === true){
        this.fetchData()
      }else{
        this.authenticated = false
        window.location.href = auth.API.REDIRECT_URL
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }
</style>
