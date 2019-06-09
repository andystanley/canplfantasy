<template>
  <nav>
    <v-toolbar flat app>
      <v-layout>
        <v-img src="/images/logo.png" max-width="60"></v-img>
      </v-layout> 
      
      <v-layout v-if="isAuthenticated" class="px-5">
        <v-btn  flat to="squad">My Squad</v-btn>
        <v-btn flat to="points">Points</v-btn>
         <v-btn flat to="rules">Rules</v-btn>
      </v-layout>
      <v-layout justify-end>
        <LoginSignupPopup v-if="!isAuthenticated" />
        <v-btn 
          v-if="isAuthenticated"
          @click="logout" 
          flat 
          class="primary">
          Logout
        </v-btn>
      </v-layout>
    </v-toolbar>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import LoginSignupPopup from '@/components/LoginSignupPopup'

export default {
  components: { 
    LoginSignupPopup,
  },
  methods: {
    ...mapActions([
      'logout'
    ])
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
    ])
  },
}
</script>
