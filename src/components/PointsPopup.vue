<template>
<v-dialog max-width="600" v-model="popupOpen">
      <template v-slot:activator="{ on }">
      <v-layout justify-center>
        <v-img v-on="on" :src="player.team.shirt" style="cursor: pointer" max-width="80"></v-img>  
      </v-layout>
      <div class="darkGreen">
        <v-layout justify-center>
          <span :class="{'hide-text': !player}" class="font-weight-bold white--text " >{{ player.last_name }}</span>
        </v-layout>
        <hr>
        <v-layout justify-center>
          <span :class="{'hide-text': !player}" class="font-weight-bold white--text ">{{ player.points}}</span>
        </v-layout>
      </div>
      </template>
      <v-card>
        <v-card-title>
          <h2>{{ `${player.first_name} ${player.last_name}` }} </h2>
        </v-card-title>
        <v-card-text>
            <v-data-table :headers="headers"  :items="player.stats" class="elevation-1">
            <template  v-slot:items="props" :headers="headers"  class="elevation-1"> 
              <tr>
                <td>{{ props.item.game.date }}</td>
                <td>{{ props.item.points }}</td>
                <td>{{ props.item.goals }}</td>
                <td>{{ props.item.assists }}</td>
                <td>{{ props.item.minutes_played }}</td>
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
      headers: [
        { text: 'Gameweek', value: 'game.date'},
        { text: 'Points', value: 'points'},
        { text: 'Goals', value: 'goals'},
        { text: 'Assists', value: 'assists'},
        { text: 'Minutes Played', value: 'minutes_played'}
      ],
    }
    }
  }

</script>

<!--
{
    "id": 2,
    "position": {
        "id": 4,
        "name": "Forward",
        "short_name": "FW"
    },
    "team": {
        "name": "York 9",
        "shirt": "/images/york9.png"
    },
    "stats": [
        {
            "id": 1,
            "game": {
                "home_team": {
                    "name": "York 9",
                    "shirt": "/images/york9.png"
                },
                "away_team": {
                    "name": "Forge",
                    "shirt": "/images/forge.png"
                },
                "date": "2019-07-06",
                "home_score": 2,
                "away_score": 1
            },
            "minutes_played": 90,
            "goals": 1,
            "assists": 0,
            "yellow_cards": 0,
            "red_cards": 0,
            "saves": 0,
            "clean_sheets": 0,
            "points": 0,
            "player": 2
        }
    ],
    "first_name": "Ryan",
    "last_name": "Telfer",
    "points": 0,
    "price": "7.0"
}
--> 
