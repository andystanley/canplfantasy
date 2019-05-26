<template>
  <div class="team">
    <v-container>
      <v-layout row class="mb-4">
        <v-flex>
          <h1>Budget</h1> 
          <h2>{{ teamPriceMax.toFixed(1) }}m / {{ teamPriceMax.toFixed(1) }}m</h2>
        </v-flex>
        <v-flex>
          <h1>Players Selected</h1>
          <h2>{{ playersSelected }}  / {{ maxPlayers }} </h2>
        </v-flex>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      </v-layout>
    </v-container>

    <v-layout justify-center>
      <v-img src="/startingEleven.png" max-width="600">
        <v-container fluid>
          <v-layout row justify-space-around>
            <v-flex xs2>
              <PlayerPopup position="goalie" :players="goalies"/>          
            </v-flex>
          </v-layout>  
          
          <v-layout row justify-space-around>
            <v-flex xs2>
              <PlayerPopup position="defender" :players="defenders"/> 
            </v-flex>
            <v-flex xs2>
              <PlayerPopup position="defender" :players="defenders"/>  
            </v-flex>
            <v-flex xs2>
              <PlayerPopup position="defender" :players="defenders"/> 
            </v-flex>
            <v-flex xs2>
              <PlayerPopup position="defender" :players="defenders"/> 
            </v-flex>
          </v-layout>

          <v-layout row justify-space-around>
            <v-flex xs2>
                <PlayerPopup position="midfielder" :players="midfielders"/>   
            </v-flex>
            <v-flex xs2>
                <PlayerPopup position="midfielder" :players="midfielders"/> 
            </v-flex>
            <v-flex xs2>
                <PlayerPopup position="midfielder" :players="midfielders"/>  
            </v-flex>
            <v-flex xs2>
              <PlayerPopup position="midfielder" :players="midfielders"/> 
            </v-flex>
          </v-layout>
          
          <v-layout row justify-space-around>
            <v-flex xs2>
                <PlayerPopup position="forward" :players="forwards"/> 
            </v-flex>
            <v-flex xs2>
              <PlayerPopup position="forward" :players="forwards"/> 
            </v-flex>
          </v-layout>
        </v-container>   
      </v-img>
    </v-layout>
  </div>
</template>

<script>
import PlayerPopup from "@/components/PlayerPopup"

export default {
  components:{
    PlayerPopup
  },
  data(){
    return {
      
      remove: true,
      teamPriceMax: 80.00,
      teamPriceStarter: 0.00,
      playersSelected: 0,
      maxPlayers: 11,
      goalies:[
          { name: 'Marcus Haber', position: 'goalie', avatar: '/pacificFc.jpg', price: 7.00,points: 0.00, team: 'cavs', teamColor: 'red'},
          { name: 'karcu Haber', position: 'goalie', avatar: '/pacificFc.jpg', price: 9.00,points: 0.00, team: 'Pacific Fc'},
          { name: 'Marcus Haber', position: 'goalie', avatar: '/pacificFc.jpg', price: 10.00,points: 0.00, team: 'Pacific Fc'}
      ],
      defenders:[
          { name: 'Marcus Haber', position: 'defender', avatar: '/pacificFc.jpg', price: 7.00,points: 0.00 , team: 'Pacific Fc'},
      ],
      midfielders:[
          { name: 'Marcus Haber', position: 'midfielder', avatar: '/pacificFc.jpg', price: 7.00,points: 0.00, team: 'Pacific Fc'},
          
      ],
      forwards:[
          { name: 'Marcus Haber', position: 'forward', avatar: '/pacificFc.jpg', price: 7.00, points: 0.00, team: 'Pacific Fc'},
      ],
      
    }
  },
}
</script>
