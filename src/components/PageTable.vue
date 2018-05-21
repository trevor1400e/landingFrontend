<template>
  <v-card>
    <v-card-title>
      Landing Pages
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.URL }}</td>
        <td class="text-xs-center">{{ props.item.conversions }}</td>
        <td class="text-xs-center">{{ props.item.impressions }}</td>
        <td class="text-xs-center">{{ props.item.emails }} <a v-if="props.item.emails > 0" @click="getEmails(props.item.name)">Download</a></td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Name',
            align: 'left',
            value: 'name'
          },
          { text: 'URL', value: 'URL', align: 'center' },
          { text: 'Conversions', value: 'conversions', align: 'center' },
          { text: 'Impressions', value: 'impressions', align: 'center' },
          { text: 'Email Count', value: 'emails', align: 'center' }
        ],
        items: [
          {
            value: false,
            name: 'New One',
            URL: 'www.com',
            conversions: 5,
            impressions: 69,
            emails: 6969
          }
        ]
      }
    },
    created(){
      this.fetchData()
    },
    methods: {
      fetchData() {
        axios.get('http://localhost:8082/users/table', {headers: {"Authorization": "Bearer " + localStorage.getItem('access_token')}
        }).then((resp) => {
          var i;
          var arrayOfJson = []
          for (i in resp.data) {
            arrayOfJson.push(JSON.parse(resp.data[i]))
          }

          this.items = arrayOfJson

          })
          .catch((err) => {
            console.log(err)
          })
      },
      getEmails(unique){
        axios.get('http://localhost:8082/users/txt/'+unique, {headers: {"Authorization": "Bearer " + localStorage.getItem('access_token')}, responseType: 'blob'
        }).then((resp) => {
          let blob = new Blob([resp.data], { type:   'text/plain' } )
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = unique+'.txt'
          link.click()
        })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
</script>
