<template>
  <v-container flex>
    <v-card class="px-1">
      <v-card-title class="justify-center">
        <h6 class="title"> DiddleDore </h6>
        <v-divider></v-divider>
        <v-flex xs2> 
        <v-img src="/images/york9.png"></v-img>
        </v-flex>
      </v-card-title>
      <v-divider></v-divider>
      <br>
      <v-container>
        <v-layout justify-center>
          <span class="subheading">Overall Points: {{ points }}</span>
        </v-layout>
        <br>
        <v-layout justify-center>
          <span class="subheading">Gameweek Points: {{ gameweekPoints }}</span>
          <br> <br>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    points: Number,
    gameweekPoints: Number
  }
}
</script>
