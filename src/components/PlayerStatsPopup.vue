<template>
  <v-dialog v-model="popupOpen" max-width="400">
    <template v-slot:activator="{ on }">
      <v-layout justify-center>
        <v-img
          :src="player.team.shirt"
          style="cursor: pointer"
          max-width="80"
          v-on="on"
        ></v-img>
      </v-layout>
      <div class="darkGreen">
        <v-layout justify-center>
          <span class="font-weight-regular white--text text-xs-center">{{
            player.last_name
          }}</span>
        </v-layout>
        <hr />
        <v-layout justify-center>
          <span class="font-weight-medium white--text">{{
            activePoints(player.active_stats)
          }}</span>
        </v-layout>
      </div>
    </template>
    <v-card>
      <v-card-title class="pt-4">
        <div>
          <h6 class="title">
            {{ `${player.first_name} ${player.last_name} (${player.price}m)` }}
          </h6>
          <span class="subheading grey--text"
            >{{ activePoints(player.active_stats) }} points</span
          >
        </div>
      </v-card-title>
      <v-card-text>
        <v-list dense>
          <v-list-group
            v-for="stat in player.active_stats"
            :key="stat.id"
            no-action
          >
            <template v-slot:activator>
              <v-list-tile class="py-1">
                <span class="subheading"
                  >{{
                    player.team.name === stat.game.home_team.name
                      ? stat.game.home_score
                      : stat.game.away_score
                  }}
                  -
                  {{
                    player.team.name === stat.game.home_team.name
                      ? stat.game.away_score
                      : stat.game.home_score
                  }}</span
                >
                <v-img
                  max-width="35"
                  class="mx-2"
                  :src="
                    player.team.name === stat.game.home_team.name
                      ? stat.game.away_team.shirt
                      : stat.game.home_team.shirt
                  "
                ></v-img>
                <v-list-tile-content>
                  <v-list-tile-title class="subheading"
                    >{{ stat.points }} points</v-list-tile-title
                  >
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile
              v-for="(value, key) in prettyStat(stat)"
              :key="value.id"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ key }}: {{ value }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    player: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      popupOpen: false
    };
  },

  methods: {
    activePoints(stats) {
      return stats.reduce((a, b) => a + b.points, 0);
    },

    prettyStat(stat) {
      const hideKeys = new Set(["id", "game", "points"]);
      const pretty = {};

      for (const key in stat) {
        if (!hideKeys.has(key)) {
          let prettyKey = key.replace(/_/g, " ");
          prettyKey = prettyKey.charAt(0).toUpperCase() + prettyKey.slice(1);

          if (stat[key] !== 0) {
            pretty[prettyKey] = stat[key];
          }
        }
      }
      return pretty;
    }
  }
};
</script>
