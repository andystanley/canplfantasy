<template>
  <div class="team">
    <v-container fluid>
      <v-layout class="mb-4">
        <v-spacer></v-spacer>
        <v-flex>
          <h2>Budget</h2> 
          <h3>{{ teamPriceMax.toFixed(1) }}m / {{ teamPriceMax.toFixed(1) }}m</h3>
        </v-flex>
        <v-flex>
          <h2>Players Selected</h2>
          <h3>{{ playersSelected }}  / {{ maxPlayers }} </h3>
        </v-flex>
        
        
      </v-layout>
    </v-container>
    <v-container fluid>
      <v-layout class="mb-4">
        <v-spacer></v-spacer>
        <v-flex>
           <v-btn @click="threeFiveTwo">3-5-2</v-btn>
        </v-flex>
        <v-flex>
           <v-btn @click="threeFourThree">3-4-3</v-btn>
        </v-flex>
        <v-flex>
           <v-btn @click="fourFiveOne">4-5-1</v-btn>
        </v-flex>
        <v-flex>
         <v-btn @click="fourFourTwo">4-4-2</v-btn>
        </v-flex>
        <v-flex>
         <v-btn @click="fourThreeThree">4-3-3</v-btn>
        </v-flex>
        <v-flex>
         <v-btn @click="fiveThreeTwo">5-3-2</v-btn>
        </v-flex>
        <v-flex>
         <v-btn @click="fiveTwoThree">5-2-3</v-btn>
        </v-flex>
      </v-layout>
    </v-container>

    <v-layout justify-center>
      <v-img src="/images/startingEleven.png" max-width="600">
        <v-container fluid>
          <v-layout justify-space-around>
            <v-flex xs2 v-for="i in formation.goalkeepers" :key="i">
              <PlayerPopup position="goalkeeper" :players="goalkeepers"/>          
            </v-flex>
          </v-layout>  
          
          <v-layout justify-space-around>
            <v-flex xs2 v-for="i in formation.defenders" :key="i">
              <PlayerPopup position="defender" :players="defenders"/> 
            </v-flex>
          </v-layout>

          <v-layout justify-space-around>
            <v-flex xs2 v-for="i in formation.midfielders" :key="i">
                <PlayerPopup position="midfielder" :players="midfielders"/>   
            </v-flex>
          </v-layout>
          
          <v-layout justify-space-around>
            <v-flex xs2 v-for="i in formation.forwards" :key="i">
                <PlayerPopup position="forward" :players="forwards"/> 
            </v-flex>
          </v-layout>
        </v-container>   
      </v-img>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PlayerPopup from '@/components/PlayerPopup'

export default {
  components:{
    PlayerPopup
  },
  data(){
    return {
      remove: true,
      teamPriceMax: 80.00,
      playersSelected: 0,
      maxPlayers: 11,
      formation: {
        goalkeepers: 1,
        defenders: 3,
        midfielders: 4,
        forwards: 3,
      }
    }
  },
  computed: {
    ...mapGetters(['goalkeepers', 'defenders', 'midfielders', 'forwards'])
  },
  methods:{
     fourFourTwo: function() {
       
       this.formation.goalkeepers = 1
       this.formation.defenders = 4
       this.formation.midfielders = 4
       this.formation.forwards = 2
     
      
    },
      fourFiveOne: function() {
       
       this.formation.goalkeepers = 1
       this.formation.defenders = 4
       this.formation.midfielders = 5
       this.formation.forwards = 1
     
      
    },
      threeFiveTwo: function() {
       
       this.formation.goalkeepers = 1
       this.formation.defenders = 3
       this.formation.midfielders = 5
       this.formation.forwards = 2
     
      
    },
    threeFourThree: function() {
       
       this.formation.goalkeepers = 1
       this.formation.defenders = 3
       this.formation.midfielders = 4
       this.formation.forwards = 3
     
      
    },
    fiveThreeTwo: function() {
       
       this.formation.goalkeepers = 1
       this.formation.defenders = 5
       this.formation.midfielders = 3
       this.formation.forwards = 2
     
      
    },
    fiveTwoThree: function() {
       
       this.formation.goalkeepers = 1
       this.formation.defenders = 5
       this.formation.midfielders = 2
       this.formation.forwards = 3
     
      
    },
    fourThreeThree: function() {
       
       this.formation.goalkeepers = 1
       this.formation.defenders = 4
       this.formation.midfielders = 3
       this.formation.forwards = 3
     
      
    }
    
  }
  
}
</script>
