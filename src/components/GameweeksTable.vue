<template>
  <v-container fluid>
    <v-data-iterator
      :items="gameweeks"
      :pagination="pagination"
      rows-per-page-text=""
      :rows-per-page-items="[0]"
      hide-actions
    >
      <template v-slot:item="props">
        <v-card class="px-1">
          <v-card-title
            class="align-center justify-space-between row fill-height"
          >
            <h6 class="title">Home</h6>
            <h6 class="title">Gameweek {{ props.item.number }}</h6>
            <h6 class="title">Away</h6>
          </v-card-title>

          <v-divider></v-divider>

          <v-layout
            v-for="game in props.item.games"
            :key="game.id"
            justify-space-between
            class="pa-1"
          >
            <v-flex xs2>
              <v-img :src="game.home_team.shirt"></v-img>
            </v-flex>

            <v-flex xs2>
              <v-container fill-height>
                <v-layout justify-center align-center>
                  <span class="subheading">{{ game.home_score }}</span>
                </v-layout>
              </v-container>
            </v-flex>

            <v-flex xs4>
              <v-container fill-height>
                <v-layout justify-center align-center>
                  <v-chip>{{ game.date }}</v-chip>
                </v-layout>
              </v-container>
            </v-flex>

            <v-flex xs2>
              <v-container fill-height>
                <v-layout justify-center align-center>
                  <span class="subheading">{{ game.away_score }}</span>
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
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  props: {
    showNextGameweek: Boolean
  },

  data() {
    return {
      gameweeks: [],
      pagination: {
        page: 1,
        rowsPerPage: 1
      }
    };
  },

  computed: {
    ...mapState({ cachedGameweeks: "gameweeks" }),
    ...mapGetters(["activeGameweek", "nextGameweek"])
  },

  created() {
    if (this.cachedGameweeks.length) {
      this.gameweeks = this.cachedGameweeks;
      this.pagination.page = this.showNextGameweek
        ? this.nextGameweek.number
        : this.activeGameweek.number;
    } else {
      this.getGameweeks().then(() => {
        this.gameweeks = this.cachedGameweeks;
        this.pagination.page = this.showNextGameweek
          ? this.nextGameweek.number
          : this.activeGameweek.number;
      });
    }
  },

  methods: {
    ...mapActions(["getGameweeks"])
  }
};
</script>
