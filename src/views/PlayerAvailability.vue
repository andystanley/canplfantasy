<template>
  <v-container fluid>
    <h4 class="display-1 text-xs-center mb-4">Player Availabilty </h4>
    
    <v-layout justify-center>
      <v-flex xs12 sm10>
        <v-data-table :headers="headers" :items="unavailablePlayers" class="elevation-1" :pagination.sync="pagination" rows-per-page-text="" :rows-per-page-items="[0]">
          <template v-slot:items="props"> 
            <tr>
              <td nowrap>                
                <span class="hidden-xs-only">{{ props.item.first_name }} </span>
                <span>{{ props.item.last_name }} </span>
              </td>
              <td><v-img v-on="on" :src="props.item.team.shirt" style="cursor: pointer" max-width="35"></v-img></td>
              <td>
                <v-tooltip v-if="!props.item.availability" right>
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on" small color="green">check_circle</v-icon>
                  </template>
                  <span>Available</span>
                </v-tooltip>
                <v-tooltip v-else right>
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on" small :color="iconColor[props.item.availability.status.icon]">{{ props.item.availability.status.icon }}</v-icon>
                  </template>
                  <span>{{ props.item.availability.status.name }}</span>
                </v-tooltip>
              </td>
              <td nowrap>
                <span>{{ props.item.availability.latest_news }}</span>
                <v-btn v-if="props.item.availability.source" flat icon :href="props.item.availability.source" target="_blank">
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
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      iconColor: {
        'help': 'amber',
        'gavel': 'red',
        'report': 'red',
        'autorenew': 'grey darken-1',
        'swap_horiz': 'grey darken-1'
      },
      headers: [
        { text: 'Player', value: 'last_name'},
        { text: 'Team', value: 'team.shirt'},
        { text: 'Status', value: 'availability.status.name'},
        { text: 'Latest News', value: 'availability.latest_news'},
        { text: 'Return Date', value: 'availability.return_date'},
        { text: 'Last Updated', value: 'availability.last_updated'}
      ],
      pagination: {
        page: 1,
        rowsPerPage: 10,
        sortBy: 'availability.last_updated', 
        descending: true
      },
    }
  },

  computed: {
      ...mapGetters(['unavailablePlayers'])
  }
}
</script>
