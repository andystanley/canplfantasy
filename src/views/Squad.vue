<template>
  <v-container fluid>
    <Loading :loading="loading" :error="error" :error-detail="errorDetail" />

    <template v-if="profile">
      <h4 class="display-1 text-xs-center">
        Gameweek {{ nextGameweek ? nextGameweek.number : "" }}
      </h4>

      <v-container grid-list-md>
        <v-layout wrap justify-center>
          <v-flex xs12 sm8 md6 lg5>
            <v-layout class="py-2" justify-space-between>
              <v-flex xs4 text-xs-center>
                <span>Budget</span>
                <h6 class="title font-weight-regular">
                  {{ budgetRemaining }}m
                </h6>
              </v-flex>
              <v-flex xs4 text-xs-center>
                <span>Deadline</span>
                <h6 class="title font-weight-regular">
                  {{ days > 0 ? `${days}d` : "" }}
                  {{ hours > 0 ? `${hours}h` : "" }}
                  {{ days === 0 && hours === 0 ? `${minutes}m` : "" }}
                  {{ days === 0 && hours === 0 ? `${seconds}s` : "" }}
                </h6>
              </v-flex>
              <v-flex xs4 text-xs-center>
                <span>Players</span>
                <h6 class="title font-weight-regular">
                  {{ squadSize }} / {{ maxSquadSize }}
                </h6>
              </v-flex>
            </v-layout>
            <div class="text-xs-center red white--text font-weight-medium">
              {{ squadError }}
            </div>
            <v-img src="/images/startingEleven.png">
              <v-container v-if="squad" fluid>
                <v-layout justify-space-around>
                  <v-flex
                    v-for="goalkeeper in squad.goalkeepers"
                    :key="goalkeeper.id"
                    xs2
                  >
                    <SelectPlayerPopup
                      position="goalkeeper"
                      :player="goalkeeper"
                      :players="availablePlayers(goalkeepers)"
                      v-bind="{ addPlayerToSquad, removePlayerFromSquad }"
                    />
                  </v-flex>
                </v-layout>

                <v-layout justify-space-around>
                  <v-flex
                    v-for="defender in squad.defenders"
                    :key="defender.id"
                    xs2
                  >
                    <SelectPlayerPopup
                      position="defender"
                      :player="defender"
                      :players="availablePlayers(defenders)"
                      v-bind="{ addPlayerToSquad, removePlayerFromSquad }"
                    />
                  </v-flex>
                </v-layout>

                <v-layout justify-space-around>
                  <v-flex
                    v-for="midfielder in squad.midfielders"
                    :key="midfielder.id"
                    xs2
                  >
                    <SelectPlayerPopup
                      position="midfielder"
                      :player="midfielder"
                      :players="availablePlayers(midfielders)"
                      v-bind="{ addPlayerToSquad, removePlayerFromSquad }"
                    />
                  </v-flex>
                </v-layout>

                <v-layout justify-space-around>
                  <v-flex
                    v-for="forward in squad.forwards"
                    :key="forward.id"
                    xs2
                  >
                    <SelectPlayerPopup
                      position="forward"
                      :player="forward"
                      :players="availablePlayers(forwards)"
                      v-bind="{ addPlayerToSquad, removePlayerFromSquad }"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>

            <div class="text-xs-center">
              <v-btn-toggle dark>
                <v-btn flat @click="setFormation(5, 4, 1)">5-4-1</v-btn>
                <v-btn flat @click="setFormation(5, 3, 2)">5-3-2</v-btn>
                <v-btn flat @click="setFormation(4, 5, 1)">4-5-1</v-btn>
                <v-btn flat @click="setFormation(4, 4, 2)">4-4-2</v-btn>
                <v-btn flat @click="setFormation(4, 3, 3)">4-3-3</v-btn>
                <v-btn flat @click="setFormation(3, 5, 2)">3-5-2</v-btn>
                <v-btn flat @click="setFormation(3, 4, 3)">3-4-3</v-btn>
              </v-btn-toggle>
            </div>

            <div class="text-xs-center">
              <v-btn color="grey white--text darken-2 mr-0" @click="setupSquad"
                >Reset</v-btn
              >
              <v-btn
                :disabled="!isValidSquad()"
                :loading="popupLoading"
                class="success"
                @click="save"
                >Save</v-btn
              >
            </div>
            <div class="grey--text text-xs-center caption">
              * You can make unlimited transfers until the gameweek deadline
            </div>

            <GameweeksTable :show-next-gameweek="true" />
          </v-flex>

          <v-flex v-if="profile" xs12 sm6 md5 lg4>
            <ProfileCard :profile="profile" />
            <LeaguesCard :leagues="profile.leagues" />
          </v-flex>
        </v-layout>
      </v-container>

      <v-snackbar
        v-model="successPopup"
        :timeout="3000"
        color="success"
        class="justify-center"
      >
        <v-layout justify-center>
          Squad saved!
        </v-layout>
      </v-snackbar>
      <v-snackbar
        v-model="errrorPopup"
        :timeout="3000"
        color="error"
        class="justify-center"
      >
        <v-layout justify-center>
          Unable to save squad. Please try again
        </v-layout>
      </v-snackbar>
    </template>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import SelectPlayerPopup from "@/components/SelectPlayerPopup";
import GameweeksTable from "@/components/GameweeksTable";
import ProfileCard from "@/components/ProfileCard";
import LeaguesCard from "@/components/LeaguesCard";
import Loading from "@/components/Loading";

export default {
  components: {
    SelectPlayerPopup,
    GameweeksTable,
    ProfileCard,
    LeaguesCard,
    Loading
  },
  data() {
    return {
      pagination: {
        page: 1,
        rowsPerPage: 10,
        descending: true
      },
      squad: null,
      squadSize: 0,
      maxSquadSize: 11,
      budget: 75.0,
      budgetRemaining: 75.0,
      successPopup: false,
      errrorPopup: false,
      popupLoading: false,
      squadError: "",
      loading: true,
      error: "",
      errorDetail: "",
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  },
  computed: {
    ...mapState(["profile"]),
    ...mapGetters([
      "goalkeepers",
      "defenders",
      "midfielders",
      "forwards",
      "nextGameweek"
    ])
  },

  created() {
    if (!this.profile) {
      this.getProfile()
        .then(() => {
          this.setupSquad();
        })
        .catch(() => {
          this.error = "An error occurred :( Please try refreshing the page";
          this.errorDetail =
            "If this continues, reach out to us on Reddit, Twitter or email contact@canplfantasy.ca";
        })
        .then(() => (this.loading = false));
    } else {
      this.setupSquad();
      this.loading = false;
    }

    setInterval(() => {
      if (this.nextGameweek) {
        this.countDown(this.nextGameweek.start_date);
      }
    }, 1000);
  },
  methods: {
    ...mapActions(["getProfile", "saveSquad"]),

    setupSquad() {
      this.squad = {
        goalkeepers: [{ blank: true }],
        defenders: [
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
        forwards: [{ blank: true }, { blank: true }]
      };

      this.squadSize = 0;
      this.budgetRemaining = this.budget;

      if (this.profile.next_squad) {
        const defenders = this.profile.next_squad.players.filter(
          player => player.position.short_name === "DEF"
        ).length;
        const midfielders = this.profile.next_squad.players.filter(
          player => player.position.short_name === "MID"
        ).length;
        const forwards = this.profile.next_squad.players.filter(
          player => player.position.short_name === "FW"
        ).length;
        this.setFormation(defenders, midfielders, forwards);

        this.profile.next_squad.players.map(player =>
          this.addPlayerToSquad(player)
        );
      }
    },

    setFormation(defenders, midfielders, forwards) {
      while (defenders !== this.squad.defenders.length) {
        if (defenders > this.squad.defenders.length) {
          this.squad.defenders.push({ blank: true });
        } else {
          const player = this.squad.defenders.pop();
          if (!player.hasOwnProperty("blank")) {
            this.removePlayerFromSquad(player);
          }
        }
      }

      while (midfielders !== this.squad.midfielders.length) {
        if (midfielders > this.squad.midfielders.length) {
          this.squad.midfielders.push({ blank: true });
        } else {
          const player = this.squad.midfielders.pop();
          if (!player.hasOwnProperty("blank")) {
            this.removePlayerFromSquad(player);
          }
        }
      }

      while (forwards !== this.squad.forwards.length) {
        if (forwards > this.squad.forwards.length) {
          this.squad.forwards.push({ blank: true });
        } else {
          const player = this.squad.forwards.pop();
          if (!player.hasOwnProperty("blank")) {
            this.removePlayerFromSquad(player);
          }
        }
      }
    },

    selectedPlayers() {
      if (!this.squad) {
        return [];
      }

      const selectedPlayers = [
        ...this.squad.goalkeepers,
        ...this.squad.defenders,
        ...this.squad.midfielders,
        ...this.squad.forwards
      ];
      return selectedPlayers.filter(player => !player.hasOwnProperty("blank"));
    },

    selectedPlayerIds() {
      const selectedPlayers = this.selectedPlayers();
      return new Set(selectedPlayers.map(player => player.id));
    },

    maxTeamPlayers() {
      const selectedPlayers = this.selectedPlayers();
      const teamPlayers = new Map();
      for (let player of selectedPlayers) {
        let players = teamPlayers.get(player.team.name) || 0;
        teamPlayers.set(player.team.name, ++players);
      }
      return [...teamPlayers.entries()].reduce(
        (a, b) => (b[1] > a[1] ? b : a),
        ["", 0]
      );
    },

    addPlayerToSquad(player) {
      if (player.position.short_name == "GK") {
        this.$set(this.squad.goalkeepers, 0, player);
      } else if (player.position.short_name == "DEF") {
        const index = this.squad.defenders.findIndex(defender =>
          defender.hasOwnProperty("blank")
        );
        this.$set(this.squad.defenders, index, player);
      } else if (player.position.short_name == "MID") {
        const index = this.squad.midfielders.findIndex(midfielder =>
          midfielder.hasOwnProperty("blank")
        );
        this.$set(this.squad.midfielders, index, player);
      } else {
        const index = this.squad.forwards.findIndex(forward =>
          forward.hasOwnProperty("blank")
        );
        this.$set(this.squad.forwards, index, player);
      }
      this.squadSize += 1;
      this.budgetRemaining -= Number(player.price);

      const [team, players] = this.maxTeamPlayers();
      if (players > 4) {
        this.squadError = `Too many players selected from ${team}`;
      }
    },

    removePlayerFromSquad(player) {
      if (player.position.short_name === "GK") {
        this.$set(this.squad.goalkeepers, 0, { blank: true });
      } else if (player.position.short_name === "DEF") {
        const index = this.squad.defenders.findIndex(
          defender => defender.id === player.id
        );
        this.$set(this.squad.defenders, index, { blank: true });
      } else if (player.position.short_name === "MID") {
        const index = this.squad.midfielders.findIndex(
          midfielder => midfielder.id === player.id
        );
        this.$set(this.squad.midfielders, index, { blank: true });
      } else {
        const index = this.squad.forwards.findIndex(
          forward => forward.id === player.id
        );
        this.$set(this.squad.forwards, index, { blank: true });
      }
      this.squadSize -= 1;
      this.budgetRemaining += Number(player.price);

      const players = this.maxTeamPlayers()[1];
      if (players <= 4) {
        this.squadError = "";
      }
    },

    isValidSquad() {
      const players = this.maxTeamPlayers()[1];
      if (players > 4) {
        return false;
      }
      return this.squadSize === 11 && this.budgetRemaining >= 0;
    },

    availablePlayers(players) {
      const selectedPlayerIds = this.selectedPlayerIds();
      return players.filter(
        player => !selectedPlayerIds.has(player.id) && !player.deleted
      );
    },

    save() {
      this.popupLoading = true;
      const players = [...this.selectedPlayerIds()];
      this.saveSquad({ players })
        .then(() => {
          this.successPopup = true;
          this.getProfile();
        })
        .catch(() => (this.errorPopup = true))
        .then(() => (this.popupLoading = false));
    },

    countDown(endDate) {
      if (!endDate) {
        return;
      }

      const startTime = new Date().getTime();
      const endTime = new Date(endDate).getTime();
      const remainingTime = endTime - startTime;

      if (remainingTime > 0) {
        const seconds = Math.floor(remainingTime / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        this.days = Math.floor(hours / 24);
        this.hours = hours % 24;
        this.minutes = minutes % 60;
        this.seconds = seconds % 60;
      } else {
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
      }
    }
  }
};
</script>
