<template>
  <v-dialog max-width="600" v-model="popupOpen">
    <template v-slot:activator="{ on }">
    <v-layout justify-center>
      <v-img v-on="on" :src="player.team.shirt" style="cursor: pointer" max-width="80"></v-img>  
    </v-layout>
    <div class="darkGreen">
      <v-layout justify-center>
        <span :class="{'hide-text': !player}" class="font-weight-regular white--text text-xs-center">{{ player.last_name }}</span>
      </v-layout>
      <hr>
      <v-layout justify-center>
        <span :class="{'hide-text': !player}" class="font-weight-medium white--text">{{ player.points }}</span>
      </v-layout>
    </div>
    </template>
      <v-card>
        <v-card-title>
          <h6 class="title">{{ `${player.first_name} ${player.last_name}` }}</h6>
        </v-card-title>
      <v-card-text>
        <v-data-table :headers="getHeaders" :items="player.stats" :pagination.sync="pagination" class="elevation-1">
          <template v-slot:items="props" :headers="headers" class="elevation-1"> 
            <tr>
              <td>{{ props.item.game.gameweek.number }}</td>
              <td>{{ props.item.points }}</td>
              <td>{{ props.item.minutes_played }}</td>
              <template v-if="player.position.short_name === 'GK'">
                <td>{{ props.item.saves }}</td>
                <td>{{ props.item.clean_sheets }}</td>
                <td>{{ props.item.yellow_cards }}</td>
                <td>{{ props.item.red_cards }}</td>
                <td>{{ props.item.goals }}</td>
                <td>{{ props.item.assists }}</td>
              </template>
              <template v-if="player.position.short_name === 'DEF'">
                <td>{{ props.item.clean_sheets }}</td>
                <td>{{ props.item.goals }}</td>
                <td>{{ props.item.assists }}</td>
                <td>{{ props.item.yellow_cards }}</td>
                <td>{{ props.item.red_cards }}</td>
              </template>
              <template v-if="player.position.short_name === 'MID'">
                <td>{{ props.item.goals }}</td>
                <td>{{ props.item.assists }}</td>
                <td>{{ props.item.yellow_cards }}</td>
                <td>{{ props.item.red_cards }}</td>
                <td>{{ props.item.clean_sheets }}</td>
              </template>
              <template v-if="player.position.short_name === 'FW'">
                <td>{{ props.item.goals }}</td>
                <td>{{ props.item.assists }}</td>
                <td>{{ props.item.yellow_cards }}</td>
                <td>{{ props.item.red_cards }}</td>
              </template>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    initialPlayer: Object,
    position: String,
    players: Array
  },
   data () {
    return {
      popupOpen: false,
      player: !this.initialPlayer.hasOwnProperty('blank') ? this.initialPlayer : null,
      pagination: {'sortBy': 'game.gameweek.number', 'descending': true}
    }
  },
  computed:{
    getHeaders(){
      const defaultHeaders = [
        { text: 'Gameweek', value: 'game.date'},
        { text: 'Points', value: 'points'},
        { text: 'Minutes', value: 'minutes_played'}
      ]

      switch(this.player.position.short_name) {
        case "GK":
          return [ 
            ...defaultHeaders,
            { text: 'Saves', value: 'saves'},
            { text: 'Clean Sheets', value: 'clean_sheets'},
            { text: 'Yellow Cards', value: 'yellow_cards'},
            { text: 'Red Cards', value: 'red_cards'},
            { text: 'Goals', value: 'goals'},
            { text: 'Assists', value: 'assists'}
          ]
        case "DEF":
          return [ 
            ...defaultHeaders,
            { text: 'Clean Sheets', value: 'clean_sheets'},
            { text: 'Goals', value: 'goals'},
            { text: 'Assists', value: 'assists'},
            { text: 'Yellow Cards', value: 'yellow_cards'},
            { text: 'Red Cards', value: 'red_cards'}
          ]
        case "MID":
          return [ 
            ...defaultHeaders,
            { text: 'Goals', value: 'goals'},
            { text: 'Assists', value: 'assists'},
            { text: 'Clean Sheets', value: 'clean_sheets'},
            { text: 'Yellow Cards', value: 'yellow_cards'},
            { text: 'Red Cards', value: 'red_cards'}
          ]
        default:
          return [ 
            ...defaultHeaders,
            { text: 'Goals', value: 'goals'},
            { text: 'Assists', value: 'assists'},
            { text: 'Yellow Cards', value: 'yellow_cards'},
            { text: 'Red Cards', value: 'red_cards'}
          ]
      }      
    }
  }
}
</script>
<style scoped>
.v-table thead tr th {
  padding-right: 0px !important;
}
.v-table tbody tr:first-child td {
  font-weight: bold;
}
</style>
