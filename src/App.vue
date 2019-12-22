<template>
  <v-app>
    <Schedule/>
  </v-app>
</template>

<script>

import Schedule from './components/Schedule'

export default {
  name: 'App',
  components: {
    Schedule
  }
}
</script>
<style>
  .v-btn{
    text-transform: initial;
    font-weight: normal;
  }
  .wf-loading, .wf-materialicons-n4-inactive {
    .material-icons {
      display: none;
    }
  }
</style>
