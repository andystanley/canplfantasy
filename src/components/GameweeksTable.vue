<template>
  <v-container fluid>
      <v-data-iterator :items="gameweeks" :pagination.sync="pagination" rows-per-page-text="" :rows-per-page-items="[0]">
        <template v-slot:item="props">
            <v-card class="px-1">
              <v-card-title class="justify-center"><h2>Gameweek {{ props.item.number }}</h2></v-card-title>
              <v-divider></v-divider>
                <v-layout v-for="game in props.item.games" :key="game.id" justify-space-between class="pa-1">
                  <v-flex xs2>
                    <v-img :src="game.home_team.shirt"></v-img>
                  </v-flex>
                  <v-flex xs2>
                    <v-container fill-height>
                      <v-layout justify-center align-center>
                        <h5 class="headline">{{ game.home_score }}</h5>
                      </v-layout>
                    </v-container>
                  </v-flex>
                  <v-flex xs4>
                    <v-container fill-height>
                      <v-layout justify-center align-center>
                        <v-chip dark>{{ game.date }}</v-chip>
                      </v-layout>
                    </v-container>
                  </v-flex>
                  <v-flex xs2>
                    <v-container fill-height>
                      <v-layout justify-center align-center>
                        <h5 class="headline">{{ game.away_score }}</h5>
                      </v-layout>
                    </v-container>
                  </v-flex>
                  <v-flex xs2>
                    <v-img :src="game.away_team.shirt"></v-img>
                  </v-flex>
                </v-layout>
            </v-card>
        </template>
      </v-data-iterator>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      pagination: {
        page: 1,
        rowsPerPage: 1
      }
    }
  },
  computed: {
    ...mapState(['gameweeks'])
  },
  methods: {
    ...mapActions(['getGameweeks']),
  },
  created() {
    this.getGameweeks()
  },
}
</script>
