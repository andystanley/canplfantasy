<template>
  <v-container fluid>
    <Loading :loading="loading" :error="error" :error-detail="errorDetail" />

    <template v-if="squadExists">
      <h4 class="display-1 text-xs-center">
        Gameweek {{ activeGameweek ? activeGameweek.number : "" }}
      </h4>

      <v-container grid-list-md>
        <v-layout wrap justify-center>
          <v-flex xs12 sm8 md6 lg5>
            <v-img src="/images/startingEleven.png" max-width="600">
              <v-container fluid>
                <v-layout justify-space-around>
                  <v-flex
                    v-for="goalkeeper in squad.goalkeepers"
                    :key="goalkeeper.id"
                    xs2
                  >
                    <PlayerStatsPopup :player="goalkeeper" />
                  </v-flex>
                </v-layout>

                <v-layout justify-space-around class="mt-3">
                  <v-flex
                    v-for="defender in squad.defenders"
                    :key="defender.id"
                    xs2
                  >
                    <PlayerStatsPopup :player="defender" />
                  </v-flex>
                </v-layout>

                <v-layout justify-space-around class="mt-3">
                  <v-flex
                    v-for="midfielder in squad.midfielders"
                    :key="midfielder.id"
                    xs2
                  >
                    <PlayerStatsPopup :player="midfielder" />
                  </v-flex>
                </v-layout>

                <v-layout justify-space-around class="mt-3">
                  <v-flex
                    v-for="forward in squad.forwards"
                    :key="forward.id"
                    xs2
                  >
                    <PlayerStatsPopup :player="forward" />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>

            <GameweeksTable :show-next-gameweek="false" />
          </v-flex>

          <v-flex v-if="profile" xs12 sm6 md5 lg4>
            <ProfileCard :profile="profile" />
            <LeaguesCard :leagues="profile.leagues" />
          </v-flex>
        </v-layout>
      </v-container>
    </template>
  </v-container>
</template>

<script>
import api from "../api";
import { mapActions, mapGetters, mapState } from "vuex";
import PlayerStatsPopup from "@/components/PlayerStatsPopup";
import GameweeksTable from "@/components/GameweeksTable";
import ProfileCard from "@/components/ProfileCard";
import LeaguesCard from "@/components/LeaguesCard";
import Loading from "@/components/Loading";

export default {
  components: {
    PlayerStatsPopup,
    GameweeksTable,
    ProfileCard,
    LeaguesCard,
    Loading
  },
  data() {
    return {
      profile: null,
      squadExists: false,
      squad: {
        goalkeepers: [{ blank: true }],
        defenders: [
          { blank: true },
          { blank: true },
          { blank: true },
          { blank: true },
          { blank: true }
        ],
        midfielders: [
          { blank: true },
          { blank: true },
          { blank: true },
          { blank: true }
        ],
        forwards: [{ blank: true }]
      },
      loading: true,
      error: "",
      errorDetail: ""
    };
  },

  computed: {
    ...mapState({ cachedProfile: "profile", token: "token" }),
    ...mapGetters(["activeGameweek", "nextGameweek"])
  },

  created() {
    const profileId = this.$route.params.id;

    if (profileId) {
      api.setToken(this.token);
      api
        .getProfileById(profileId)
        .then(profile => {
          this.profile = profile;
          if (this.profile && !this.profile.active_squad) {
            this.error = `${this.profile.squad_name} has not entered a squad`;
          } else {
            this.setupSquad();
          }
        })
        .catch(() => {
          this.error = "An error occurred :( Please try refreshing the page";
          this.errorDetail =
            "If this continues, reach out to us on Reddit, Twitter or email contact@canplfantasy.ca";
        })
        .then(() => {
          this.loading = false;
        });
    } else {
      if (!this.cachedProfile) {
        this.getProfile()
          .then(() => {
            this.profile = this.cachedProfile;
            if (this.profile && !this.profile.active_squad) {
              this.error = `${this.profile.squad_name} has not entered a squad`;
            } else {
              this.setupSquad();
            }
          })
          .catch(() => {
            this.error = "An error occurred :( Please try refreshing the page";
            this.errorDetail =
              "If this continues, reach out to us on Reddit, Twitter or email contact@canplfantasy.ca";
          })
          .then(() => {
            this.loading = false;
          });
      } else {
        this.profile = this.cachedProfile;
        if (this.profile && !this.profile.active_squad) {
          this.error = `${this.profile.squad_name} has not entered a squad`;
        } else {
          this.setupSquad();
        }
        this.loading = false;
      }
    }
  },

  methods: {
    ...mapActions(["getProfile"]),

    setupSquad() {
      if (this.profile.active_squad) {
        const defenders = this.profile.active_squad.players.filter(
          player => player.position.short_name === "DEF"
        ).length;
        const midfielders = this.profile.active_squad.players.filter(
          player => player.position.short_name === "MID"
        ).length;
        const forwards = this.profile.active_squad.players.filter(
          player => player.position.short_name === "FW"
        ).length;
        this.setFormation(defenders, midfielders, forwards);

        this.profile.active_squad.players.map(player =>
          this.addPlayerToSquad(player)
        );

        this.squadExists = true;
      }
    },

    addPlayerToSquad(player) {
      if (player.position.short_name == "GK") {
        this.$set(this.squad.goalkeepers, 0, player);
      } else if (player.position.short_name == "DEF") {
        const index = this.squad.defenders.findIndex(defender =>
          Object.prototype.hasOwnProperty.call(defender, "blank")
        );
        this.$set(this.squad.defenders, index, player);
      } else if (player.position.short_name == "MID") {
        const index = this.squad.midfielders.findIndex(midfielder =>
          Object.prototype.hasOwnProperty.call(midfielder, "blank")
        );
        this.$set(this.squad.midfielders, index, player);
      } else {
        const index = this.squad.forwards.findIndex(forward =>
          Object.prototype.hasOwnProperty.call(forward, "blank")
        );
        this.$set(this.squad.forwards, index, player);
      }
      this.squadSize += 1;
      this.squadPrice -= Number(player.price);
    },

    setFormation(defenders, midfielders, forwards) {
      while (defenders !== this.squad.defenders.length) {
        if (defenders > this.squad.defenders.length) {
          this.squad.defenders.push({ blank: true });
        } else {
          const player = this.squad.defenders.pop();
          if (!Object.prototype.hasOwnProperty.call(player, "blank")) {
            this.removePlayerFromSquad(player);
          }
        }
      }

      while (midfielders !== this.squad.midfielders.length) {
        if (midfielders > this.squad.midfielders.length) {
          this.squad.midfielders.push({ blank: true });
        } else {
          const player = this.squad.midfielders.pop();
          if (!Object.prototype.hasOwnProperty.call(player, "blank")) {
            this.removePlayerFromSquad(player);
          }
        }
      }

      while (forwards !== this.squad.forwards.length) {
        if (forwards > this.squad.forwards.length) {
          this.squad.forwards.push({ blank: true });
        } else {
          const player = this.squad.forwards.pop();
          if (!Object.prototype.hasOwnProperty.call(player, "blank")) {
            this.removePlayerFromSquad(player);
          }
        }
      }
    }
  }
};
</script>
