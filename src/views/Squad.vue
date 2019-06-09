<template>

  <div class="squad">
    <v-container fluid>
      <v-layout>
        <v-spacer></v-spacer>
        <v-flex>
          <h2>Budget</h2> 
          <h3>{{ squadPrice }}m / {{ maxSquadPrice }}m</h3>
        </v-flex>
        <v-flex>
          <h2>Players Selected</h2>
          <h3>{{ squadSize }}  / {{ maxSquadSize }} </h3>
        </v-flex>
      </v-layout>
    </v-container>

    <v-layout justify-center>
      <v-img src="/images/startingEleven.png" max-width="600">
        <v-container fluid>
          <v-layout justify-space-around>
            <v-flex xs2 v-for="goalkeeper in squad.goalkeepers" :key="goalkeeper.id">
              <PlayerPopup position="goalkeeper" :initialPlayer="goalkeeper" :players="availablePlayers(goalkeepers)" v-bind="{addPlayerToSquad, removePlayerFromSquad}" />          
            </v-flex>
          </v-layout>  
          
          <v-layout justify-space-around>
            <v-flex xs2 v-for="defender in squad.defenders" :key="defender.id">
              <PlayerPopup position="defender" :initialPlayer="defender" :players="availablePlayers(defenders)" v-bind="{addPlayerToSquad, removePlayerFromSquad}" /> 
            </v-flex>
          </v-layout>

          <v-layout justify-space-around>
            <v-flex xs2 v-for="midfielder in squad.midfielders" :key="midfielder.id">
                <PlayerPopup position="midfielder" :initialPlayer="midfielder" :players="availablePlayers(midfielders)" v-bind="{addPlayerToSquad, removePlayerFromSquad}" />   
            </v-flex>
          </v-layout>
          
          <v-layout justify-space-around>
            <v-flex xs2 v-for="forward in squad.forwards" :key="forward.id">
                <PlayerPopup position="forward" :initialPlayer="forward" :players="availablePlayers(forwards)" v-bind="{addPlayerToSquad, removePlayerFromSquad}" /> 
            </v-flex>
          </v-layout>
        </v-container>   
      </v-img>
    </v-layout>

    <v-layout justify-center class="mt-1">
      <v-btn-toggle dark>
        <v-btn @click="setFormation(5,4,1)" flat>5-4-1</v-btn>
        <v-btn @click="setFormation(5,3,2)" flat>5-3-2</v-btn>
        <v-btn @click="setFormation(4,5,1)" flat>4-5-1</v-btn>
        <v-btn @click="setFormation(4,4,2)" flat>4-4-2</v-btn>
        <v-btn @click="setFormation(4,3,3)" flat>4-3-3</v-btn>
        <v-btn @click="setFormation(3,5,2)" flat>3-5-2</v-btn>
        <v-btn @click="setFormation(3,4,3)" flat>3-4-3</v-btn>
      </v-btn-toggle>
    </v-layout>
    <br>
    <v-layout justify-center>
       <v-btn :disabled="!isValidSquad()" @click="save()" class="success">Save Squad</v-btn>
    </v-layout>
    <v-snackbar v-model="snackbar" :timeout="3000" color="success">
      <v-layout justify-center>
        Squad Saved!
      </v-layout>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import PlayerPopup from '@/components/PlayerPopup'

export default {
  components:{
    PlayerPopup
  },
  data() {
    return {
      squad: {
        goalkeepers: [{blank: true}],
        defenders: [{blank: true}, {blank: true}, {blank: true}, {blank: true}], 
        midfielders: [{blank: true}, {blank: true}, {blank: true}, {blank: true}],
        forwards: [{blank: true}, {blank: true}],
      },
      squadSize: 0,
      maxSquadSize: 11,
      squadPrice: 80.0,
      maxSquadPrice: 80.0,
      snackbar: false,
    }
  },
  computed: {
    ...mapState(['token', 'profile']),
    ...mapGetters(['goalkeepers', 'defenders', 'midfielders', 'forwards'])
  },
  
  methods: {
    ...mapActions(['getProfile', 'saveSquad']),

    setFormation(defenders, midfielders, forwards) {
      while (defenders !== this.squad.defenders.length) {
        if (defenders > this.squad.defenders.length) {
          this.squad.defenders.push({blank: true})
        } else {
          const player = this.squad.defenders.pop()
          if (!player.hasOwnProperty('blank')) {
            this.removePlayerFromSquad(player)
          }
        }
      }

      while (midfielders !== this.squad.midfielders.length) {
        if (midfielders > this.squad.midfielders.length) {
          this.squad.midfielders.push({blank: true})
        } else {
          const player = this.squad.midfielders.pop()
          if (!player.hasOwnProperty('blank')) {
            this.removePlayerFromSquad(player)
          }
        }
      }

      while (forwards !== this.squad.forwards.length) {
        if (forwards > this.squad.forwards.length) {
          this.squad.forwards.push({blank: true})
        } else {
          const player = this.squad.forwards.pop()
          if (!player.hasOwnProperty('blank')) {
            this.removePlayerFromSquad(player)
          }
        }
      }
    },

    selectedPlayers() {
      let selectedPlayers = [this.squad.goalkeepers, this.squad.defenders, this.squad.midfielders, this.squad.forwards].flat()
      selectedPlayers = selectedPlayers.filter(player => !player.hasOwnProperty('blank'))
      return new Set(selectedPlayers.map(player => player.id))
    },

    addPlayerToSquad(player) {
      if (player.position.short_name =='GK') {
        this.$set(this.squad.goalkeepers, 0, player)
      }
      else if (player.position.short_name =='DEF') {
        const index = this.squad.defenders.findIndex(defender => defender.hasOwnProperty('blank'))        
        this.$set(this.squad.defenders, index, player)
      }
      else if (player.position.short_name =='MID') {
        const index = this.squad.midfielders.findIndex(midfielder => midfielder.hasOwnProperty('blank'))
        this.$set(this.squad.midfielders, index, player)
      }
      else {
        const index = this.squad.forwards.findIndex(forward => forward.hasOwnProperty('blank'))
        this.$set(this.squad.forwards, index, player)
      }
      this.squadSize += 1
      this.squadPrice -= Number(player.price)
    },

    removePlayerFromSquad(player) {
      if (player.position.short_name === 'GK') {
        this.$set(this.squad.goalkeepers, 0, {blank: true})
      }
      else if (player.position.short_name === 'DEF') {
          const index = this.squad.defenders.findIndex(defender => defender.id === player.id)
        this.$set(this.squad.defenders, index, {blank: true})
      }
      else if (player.position.short_name === 'MID') {
        const index = this.squad.midfielders.findIndex(midfielder => midfielder.id === player.id)
        this.$set(this.squad.midfielders, index, {blank: true})
      }
      else {
        const index = this.squad.forwards.findIndex(forward => forward.id === player.id)
        this.$set(this.squad.forwards, index, {blank: true})
      }
      this.squadSize -= 1
      this.squadPrice += Number(player.price)
    },

    isValidSquad() {
      return this.squadSize === 11 && this.squadPrice >= 0
    },

    availablePlayers(players) {
      const selectedPlayers = this.selectedPlayers()
      return players.filter(player => !selectedPlayers.has(player.id))
    },

    save() {
      const players = [...this.selectedPlayers()]
      this.saveSquad({ players })
        .then(() => {
          this.snackbar = true
        })
    }
  },
  created() {
    this.getProfile()
      .then(() => {
        if (this.profile.next_squad) {
          const defenders = this.profile.next_squad.players.filter(player => player.position.short_name === 'DEF').length
          const midfielders = this.profile.next_squad.players.filter(player => player.position.short_name === 'MID').length
          const forwards = this.profile.next_squad.players.filter(player => player.position.short_name === 'FW').length
          this.setFormation(defenders, midfielders, forwards)
          
          this.profile.next_squad.players.map(player => this.addPlayerToSquad(player))
        }
      })
  },
}
</script>
