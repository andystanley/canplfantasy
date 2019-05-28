<template>
  <div class="team">
    <v-container fluid>
      <v-layout>
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

    <v-layout justify-center>
      <v-img src="/images/startingEleven.png" max-width="600">
        <v-container fluid>
          <v-layout justify-space-around>
            <v-flex xs2>
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

    <v-layout justify-center class="mt-1">
      <v-btn-toggle mandatory dark>
        <v-btn @click="setFormation(5,4,1)" flat>5-4-1</v-btn>
        <v-btn @click="setFormation(5,3,2)" flat>5-3-2</v-btn>
        <v-btn @click="setFormation(4,5,1)" flat>4-5-1</v-btn>
        <v-btn @click="setFormation(4,4,2)" flat selected>4-4-2</v-btn>
        <v-btn @click="setFormation(4,3,3)" flat>4-3-3</v-btn>
        <v-btn @click="setFormation(3,5,2)" flat>3-5-2</v-btn>
        <v-btn @click="setFormation(3,4,3)" flat>3-4-3</v-btn>
      </v-btn-toggle>
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
      teamPriceMax: 80.00,
      playersSelected: 0,
      maxPlayers: 11,
      formation: {
        defenders: 5,
        midfielders: 4,
        forwards: 1
      }
    }
  },
  computed: {
    ...mapGetters(['goalkeepers', 'defenders', 'midfielders', 'forwards'])
  },
  methods : {
    setFormation(defenders, midfielders, forwards) {
      this.formation.defenders = defenders
      this.formation.midfielders = midfielders
      this.formation.forwards = forwards
    }
  }
}
</script>
