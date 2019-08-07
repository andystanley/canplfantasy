<template>
  <v-container fluid>
    <Loading
      :loading="!unavailablePlayers.length"
      :error="error"
      :error-detail="errorDetail"
    />

    <template v-if="unavailablePlayers.length">
      <h4 class="display-1 text-xs-center mb-4">Player Availabilty</h4>

      <v-layout justify-center>
        <v-flex xs12 sm10>
          <div id="legend">
            <v-btn v-for="item in legend" :key="item.text" flat small>
              <v-icon left small :color="iconColor[item.icon]">{{
                item.icon
              }}</v-icon>
              {{ item.text }}
            </v-btn>
          </div>
          <v-data-table
            :headers="headers"
            :items="unavailablePlayers"
            class="elevation-1"
            :pagination.sync="pagination"
            rows-per-page-text
            :rows-per-page-items="[0]"
          >
            <template v-slot:items="props">
              <tr>
                <td nowrap>
                  <span class="hidden-xs-only">
                    {{ props.item.first_name }}
                  </span>
                  <span>{{ props.item.last_name }}</span>
                </td>
                <td>
                  <v-img :src="props.item.team.shirt" max-width="35"></v-img>
                </td>
                <td>
                  <v-tooltip v-if="!props.item.availability" right>
                    <template v-slot:activator="{ on }">
                      <v-icon small color="green" v-on="on"
                        >check_circle</v-icon
                      >
                    </template>
                    <span>Available</span>
                  </v-tooltip>
                  <v-tooltip v-else right>
                    <template v-slot:activator="{ on }">
                      <v-icon
                        small
                        :color="iconColor[props.item.availability.status.icon]"
                        v-on="on"
                        >{{ props.item.availability.status.icon }}</v-icon
                      >
                    </template>
                    <span>{{ props.item.availability.status.name }}</span>
                  </v-tooltip>
                </td>
                <td nowrap>
                  <span>{{ props.item.availability.latest_news }}</span>
                  <v-btn
                    v-if="props.item.availability.source"
                    icon
                    small
                    :href="props.item.availability.source"
                    target="_blank"
                  >
                    <v-icon small>open_in_new</v-icon>
                  </v-btn>
                </td>
                <td>{{ props.item.availability.return_date || "Unknown" }}</td>
                <td>{{ props.item.availability.last_updated }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import Loading from "@/components/Loading";
import { mapGetters } from "vuex";

export default {
  components: {
    Loading
  },
  data() {
    return {
      iconColor: {
        help: "amber",
        gavel: "red",
        report: "red",
        autorenew: "grey darken-1",
        swap_horiz: "grey darken-1"
      },
      legend: [
        { text: "Injured", icon: "report" },
        { text: "Doubt (% of availability)", icon: "help" },
        { text: "Disciplinary", icon: "gavel" },
        { text: "On Loan", icon: "autorenew" },
        { text: "Transferred", icon: "swap_horiz" }
      ],
      headers: [
        { text: "Player", value: "last_name" },
        { text: "Team", value: "team.shirt" },
        { text: "Status", value: "availability.status.name" },
        { text: "Latest News", value: "availability.latest_news" },
        { text: "Return Date", value: "availability.return_date" },
        { text: "Last Updated", value: "availability.last_updated" }
      ],
      pagination: {
        page: 1,
        rowsPerPage: 10,
        sortBy: "availability.last_updated",
        descending: true
      },
      error: "",
      errorDetail: ""
    };
  },

  computed: {
    ...mapGetters(["unavailablePlayers"])
  }
};
</script>

<style scoped>
#legend button {
  pointer-events: none;
}
</style>
