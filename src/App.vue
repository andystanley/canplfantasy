<template>
  <v-app>
    <NavBar />
    <v-content class="ma-5">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import NavBar from '@/components/NavBar'

export default {
  name: 'App',
  components: { 
    NavBar
  },
  methods: {
    ...mapActions([
      'getTeams',
      'getPlayers'
    ]),
  },
  created() {
    this.getTeams()
    this.getPlayers()
  }
}
</script>
