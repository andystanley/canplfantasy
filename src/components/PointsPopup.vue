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
          <h2>Player Stats For {{ gameweek }}</h2>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          
            <template > 
              <tr>
                <td></td>
                <td ></td>
                <td ></td>
                <td></td>
              </tr>
            </template>
         
        </v-card-text>
      </v-card>
      </v-dialog>
</template>

<script>
export default {
  props: {
    initialPlayer: Object,
  },
   data () {
      return {
      popupOpen: false,
      player: !this.initialPlayer.hasOwnProperty('blank') ? this.initialPlayer : null,
      headers: [
        { text: 'Players', value: 'last_name'},
        { text: 'Points', value: 'points'},
        { text: 'Price', value: 'price'},
        { text: 'Team', value: 'team.name'},
        { text: 'Gameweek', value: 'gameweek.number'}
      ],
    }
    }
  }

</script>
