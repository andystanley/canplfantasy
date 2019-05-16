<template>
  <nav>
    <v-toolbar flat app>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="primary--text">CPL</span>
        <span class="accent--text">Fantasy</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <LoginSignup v-if="!isAuthenticated" />
      <v-btn 
        v-if="isAuthenticated"
        @click="logout" 
        flat 
        class="primary">
        Logout
      </v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import LoginSignup from '@/components/LoginSignup'

export default {
  components: { 
    LoginSignup,
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
