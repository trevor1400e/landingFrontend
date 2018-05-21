<template>
  <div>
    <v-alert type="info" dismissible v-model="alert">
      We are currently in beta, if you find a bug please let us know(:
    </v-alert>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        alert: true
      }
    }
  }
</script>
