<template>
  <nav>
    <v-toolbar flat dense app>
      <v-toolbar-side-icon class="grey--text hidden-md-and-up" v-if="isAuthenticated" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-img src="/images/logo.png" @click="$router.push('/')" max-width="45" class="mr-3" style="cursor: pointer"></v-img>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="link in links" :key="link.text" router :to="link.route">{{ link.text }}</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <LoginSignupPopup v-if="!isAuthenticated" />
      <v-btn v-if="isAuthenticated" @click="logout" flat class="primary">Logout</v-btn>
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" floating width="260" disable-resize-watcher>
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import LoginSignupPopup from '@/components/LoginSignupPopup'

export default {
  components: {
    LoginSignupPopup,
  },
  data() {
    return {
      drawer: false,
      links: [
        { icon: 'person', text: 'My Squad', route: '/squad' },
        { icon: 'looks_one', text: 'Points', route: '/points' },
        { icon: 'people', text: 'Leagues', route: '/leagues' },
        { icon: 'help', text: 'Help', route: '/help' }
      ],
    }
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
