<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer justify-space-around color="#fafafa" class="mb-3">
      <v-layout justify-center>
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
export default {
  name: "App"
};
</script>
