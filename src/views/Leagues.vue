<template>
  <v-container>
    <v-layout justify-center>
      <h4 class="display-1">Leagues</h4>
    </v-layout>

    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex v-for="league in leagues" :key="league.id" align-center xs12 sm6 md4 lg3 class="mb-4">
          <v-card>
            <v-card-title>
              <div>
                <h5 class="headline">{{ league.short_name }}</h5>
                <span :class="{'hide-text': league.short_name === 'Overall'}" class="grey--text">Fan League</span>
              </div>
              </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Players:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ league.profiles_count }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Total Points:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ league.points }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Leader:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ league.leader_profile ? league.leader_profile.squad_name : '' }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-layout justify-end>
              <v-btn flat color="primary" :to="`league/${league.id}`">
                View
              </v-btn>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  components: { },

  computed: {
    ...mapState(['leagues'])
  },
  
  methods: {
    ...mapActions(['getLeagues'])
  },

  created() {
    if (!this.leagues.length) {
      this.getLeagues()
    }
  }
}
</script>

<style scoped>
  .hide-text {
    opacity: 0;
  }
</style>
