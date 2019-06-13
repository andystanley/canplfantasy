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
                <h5 class="headline">{{ league.name }}</h5>
                <span :class="{'hide-text': league.name === 'Overall'}" class="grey--text">Fan League</span>
              </div>
              </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Players:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ league.profiles.length }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Leader:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ league.profiles.length ? league.profiles[0].squad_name : '' }}</v-list-tile-content>
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
    this.getLeagues()
  }
}
</script>

<style scoped>
  .hide-text {
    opacity: 0;
  }
</style>
