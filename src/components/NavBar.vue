<template>
  <nav>
    <v-app-bar flat dense>
      <v-app-bar-nav-icon
        class="grey--text hidden-md-and-up"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-img
        src="/images/logo.png"
        max-width="45"
        class="mr-3"
        style="cursor: pointer"
        @click="$router.push('/')"
      ></v-img>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="link in links"
          :key="link.text"
          :to="link.route"
          text
          router
          >{{ link.text }}</v-btn
        >
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <LoginSignupPopup v-if="!isAuthenticated" />
      <v-btn v-if="isAuthenticated" text class="primary" @click="logoutUser"
        >Logout</v-btn
      >
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      floating
      width="260"
      disable-resize-watcher
    >
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          :to="link.route"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import LoginSignupPopup from "@/components/LoginSignupPopup";

export default {
  components: {
    LoginSignupPopup
  },
  data() {
    return {
      drawer: false,
      links: [
        { icon: "person", text: "My Squad", route: "/squad" },
        { icon: "looks_one", text: "Points", route: "/points" },
        { icon: "people", text: "Leagues", route: "/leagues" },
        {
          icon: "check_circle",
          text: "Availability",
          route: "/player-availability"
        },
        { icon: "help", text: "Help", route: "/help" }
      ]
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  },
  methods: {
    ...mapActions(["logout"]),

    logoutUser() {
      this.logout().then(() => this.$router.push("/"));
    }
  }
};
</script>
