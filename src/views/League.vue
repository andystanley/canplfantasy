<template>
  <v-container fluid>
    <v-layout justify-center>
      <h4 class="display-1 mb-4">{{ league.name }}</h4>
    </v-layout>

    <v-layout justify-center>
        <v-data-table :headers="headers" :items="league.profiles" hide-actions :pagination.sync="pagination" class="elevation-1">
          <template v-slot:items="props" >
            <td>{{ props.item.squad_name }}</td>
            <td>{{ props.item.points }}</td>
            <td>{{ props.item.points }}</td>
          </template>
        </v-data-table>
    </v-layout>

    <v-layout justify-center class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </v-layout>
  </v-container>
</template>

<script>
import api from '../api'

export default {
  data () {
    return {
      league: {},
      pagination: {
          rowsPerPage: 15
      },
      headers: [
        { text: 'Squad', sortable: false, value: 'squad_name'},
        { text: 'Total Points', value: 'points' },
        { text: 'Gameweek Points', value: 'points' }
      ]
    }
  },

  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
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
