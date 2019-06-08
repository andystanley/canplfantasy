<template>
  <v-app>
    <NavBar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer justify-center color="#fafafa" class="mb-3">
      <v-layout justify-center>
        <v-img src="/images/logoCanpl.png" max-width="60"></v-img>
      </v-layout>
    </v-footer>
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
