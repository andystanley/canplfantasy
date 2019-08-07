<template>
  <v-container fluid>
    <Loading :loading="loading" :error="error" :error-detail="errorDetail" />

    <template v-if="leagues.length">
      <h4 class="display-1 text-xs-center">Leagues</h4>

      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex
            v-for="league in leagues"
            :key="league.id"
            align-center
            xs12
            sm6
            md4
            lg3
            class="mb-4"
          >
            <v-card>
              <v-card-title>
                <v-layout>
                  <v-flex>
                    <h5 class="headline">{{ league.short_name }}</h5>
                    <span
                      :class="{ 'hide-text': league.short_name === 'Overall' }"
                      class="grey--text"
                      >Fan League</span
                    >
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs2>
                    <v-img
                      :src="league.team ? league.team.logo : '/images/logo.png'"
                      max-width="45"
                    ></v-img>
                  </v-flex>
                </v-layout>
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-content>Players:</v-list-tile-content>
                  <span>{{ league.profiles_count }}</span>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Total Points:</v-list-tile-content>
                  <span>{{ league.points }}</span>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Leader:</v-list-tile-content>
                  <span>
                    {{
                      league.leader_profile
                        ? league.leader_profile.squad_name
                        : ""
                    }}
                  </span>
                </v-list-tile>
              </v-list>
              <v-divider></v-divider>
              <v-layout justify-end>
                <v-btn flat color="primary" :to="`league/${league.id}`"
                  >View</v-btn
                >
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </template>
  </v-container>
</template>

<script>
import Loading from "@/components/Loading";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    Loading
  },

  data() {
    return {
      loading: true,
      error: "",
      errorDetail: ""
    };
  },

  computed: {
    ...mapState(["leagues"])
  },

  created() {
    if (!this.leagues.length) {
      this.getLeagues()
        .catch(() => {
          this.error = "An error occurred :( Please try refreshing the page";
          this.errorDetail =
            "If this continues, reach out to us on Reddit, Twitter or email contact@canplfantasy.ca";
        })
        .then(() => (this.loading = false));
    } else {
      this.loading = false;
    }
  },

  methods: {
    ...mapActions(["getLeagues"])
  }
};
</script>

<style scoped>
.hide-text {
  opacity: 0;
}
</style>
