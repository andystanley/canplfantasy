<template>
  <v-app>
    <NavBar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer justify-space-around color="#fafafa" class="mb-3">
      <v-layout justify-center>
        <a href="https://www.reddit.com/r/canplfantasy/" target="_blank">
          <img
            src="/images/redditImage.png"
            alt="reddit"
            height="35"
            width="35"
          />
        </a>

        <a href="https://github.com/andystanley/canplfantasy" target="_blank">
          <img
            src="/images/github.png"
            alt="logo"
            height="35"
            width="35"
            class="mx-1"
          />
        </a>

        <a href="https://twitter.com/canplfantasy" target="_blank">
          <img src="/images/twitter.png" alt="twitter" height="35" width="35" />
        </a>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import NavBar from "@/components/NavBar";

export default {
  name: "App",
  components: {
    NavBar
  },

  created() {
    this.getTeams();
    this.getPlayers();
  },

  methods: {
    ...mapActions(["getTeams", "getPlayers"])
  }
};
</script>
