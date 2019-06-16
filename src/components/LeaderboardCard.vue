<template>
  <v-container flex>
    <v-card class="px-1">
      <v-card-title class="justify-center">
        <h6 class="title"> Leagues </h6>
        <v-divider></v-divider>
        <v-flex xs2> 
        <v-img src="/images/york9.png"></v-img>
        </v-flex>
      </v-card-title>
      <v-divider></v-divider>
      <v-container>
        <v-layout v-for="league in leagues" :key="league.id" justify-center >
          <v-btn flat to="/league/2">{{ league.name }}</v-btn>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    leagues: Array
  }
}
</script>
