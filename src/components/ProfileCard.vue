<template>
  <v-container flex>
    <v-card class="px-1">
      <v-card-title>
        <v-flex class="pa-0">
          <h6 class="title">{{ profile.name }}</h6>
          <span class="subheading">{{ profile.squad_name }}</span>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs2>
          <v-img :src="profile.favorite_team.logo" max-width="45"></v-img>
        </v-flex>
      </v-card-title>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-content>Overall Points:</v-list-tile-content>
          <span>{{ profile.points }}</span>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Gameweek Points:</v-list-tile-content>
          <span>
            {{ profile.active_squad ? profile.active_squad.points : 0 }}
          </span>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
