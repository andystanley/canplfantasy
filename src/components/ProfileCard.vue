<template>
  <v-container flex>
    <v-card class="px-1">
      <v-card-title>
        <v-flex class="pa-0">
          <h6 class="title">{{ name }}</h6>
          <span class="subheading">{{ squadName }}</span>
        </v-flex>
        <v-flex xs3> 
          <v-img :src="team.shirt"></v-img>
        </v-flex>
      </v-card-title>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-content>Overall Points:</v-list-tile-content>
          <span>{{ points }}</span>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Gameweek Points:</v-list-tile-content>
          <span>{{ gameweekPoints }}</span>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    name: String,
    squadName: String,
    team: Object,
    points: Number,
    gameweekPoints: Number
  }
}
</script>
