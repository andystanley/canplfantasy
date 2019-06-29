<template>
  <v-app>
    <NavBar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer justify-space-around color="#fafafa" class="mb-3">
      <v-layout justify-center>
        <a href="https://www.reddit.com/r/canplfantasy/">
          <img src="/images/redditImage.png" alt="reddit" height="39" width="39" >
        </a>  
       
          <img src="/images/logo.png" alt="Logo" height="42" width="42">
        
        <a href="https://twitter.com/canplfantasy">
          <img src="/images/Twitter.png" alt="twitter" height="39" width="39" >
        </a>

        
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
