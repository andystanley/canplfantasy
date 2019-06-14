<template>
  <v-container fluid>
    <v-layout justify-center>
      <h4 class="display-1 mb-4">{{ league.name }}</h4>
    </v-layout>

    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <v-data-table :headers="headers" :items="league.profiles" hide-actions :pagination.sync="pagination" class="elevation-1">
          <template v-slot:items="props" >
            <td>{{ props.item.squad_name }}</td>
            <td>{{ props.item.points }}</td>
            <td>0</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <v-layout justify-center class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages" circle></v-pagination>
    </v-layout>
  </v-container>
</template>

<script>
import api from '../api'

export default {
  data() {
    return {
      league: {},
      pagination: {
          page: 1,
          rowsPerPage: 10,
          totalItems: 0,
          sortBy: 'points', 
          descending: true
      },
      headers: [
        { text: 'Squad', sortable: false, value: 'squad_name'},
        { text: 'Gameweek Points', value: 'gameweek_points' },
        { text: 'Total Points', value: 'points' }
      ]
    }
  },

  computed: {
    pages() {
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },

  watch: {
    league() {
      this.pagination.totalItems = this.league.profiles.length
    }
  },

  created() {
    const leagueId = this.$route.params.id
    
    api.getLeague(leagueId)
      .then(league => {
        this.league = league
      })
  }
}
</script>
