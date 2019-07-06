<template>
  <v-container fluid>
    <Loading :loading="loading" :error="error" :errorDetail="errorDetail" />

    <template v-if="league && league.profiles && league.profiles.length">
      <h4 class="display-1 text-xs-center mb-4">{{ league.name }}</h4>

      <v-layout justify-center>
        <v-flex xs12 sm10 md8 lg6>
          <v-data-table :headers="headers" :items="league.profiles" hide-actions :pagination.sync="pagination" class="elevation-1">
            <template v-slot:items="props">
              <tr @click="$router.push(`/view/points/${props.item.id}`)" style="cursor: pointer">
                <td>{{ props.item.squad_name }}</td>
                <td>{{ props.item.gameweek_points || 0 }}</td>
                <td>{{ props.item.points }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>

      <v-layout justify-center class="text-xs-center pt-2">
        <v-pagination v-model="pagination.page" :length="pages" circle></v-pagination>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import Loading from '@/components/Loading'
import api from '../api'

export default {
  components:{
    Loading
  },

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
      ],
      loading: true,
      error: '',
      errorDetail: ''
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
    .catch(() => {
      this.error = 'An error occurred :( Please try refreshing the page'
      this.errorDetail = 'If this continues, reach out to us on Reddit, Twitter or email contact@canplfantasy.ca'
    })
    .then(() => this.loading = false)
  }
}
</script>
