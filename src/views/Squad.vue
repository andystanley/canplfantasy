<template>
  <v-container fluid>
    <v-layout justify-center>
      <h4 class="display-1">Gameweek 1</h4>
    </v-layout>
    <v-container fluid>
      <v-layout>
        <v-spacer></v-spacer>
        <v-flex>
          <h6 class="title">Budget</h6> 
          <span class="subheading">{{ squadPrice }}m / {{ maxSquadPrice }}m</span>
        </v-flex>
        <v-flex>
          <h6 class="title">Players Selected</h6>
          <span class="subheading">{{ squadSize }}  / {{ maxSquadSize }}</span>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-md>
      <v-layout wrap justify-center>
        <v-flex xs12 sm8 md6>
          <v-img src="/images/startingEleven.png">
            <v-container fluid>
              <v-layout justify-space-around>
                <v-flex xs2 v-for="goalkeeper in squad.goalkeepers" :key="goalkeeper.id">
                  <SelectPlayerPopup position="goalkeeper" :initialPlayer="goalkeeper" :players="availablePlayers(goalkeepers)" v-bind="{addPlayerToSquad, removePlayerFromSquad}" />          
                </v-flex>
              </v-layout>  
              
              <v-layout justify-space-around>
                <v-flex xs2 v-for="defender in squad.defenders" :key="defender.id">
                  <SelectPlayerPopup position="defender" :initialPlayer="defender" :players="availablePlayers(defenders)" v-bind="{addPlayerToSquad, removePlayerFromSquad}" /> 
                </v-flex>
              </v-layout>

              <v-layout justify-space-around>
                <v-flex xs2 v-for="midfielder in squad.midfielders" :key="midfielder.id">
                    <SelectPlayerPopup position="midfielder" :initialPlayer="midfielder" :players="availablePlayers(midfielders)" v-bind="{addPlayerToSquad, removePlayerFromSquad}" />   
                </v-flex>
              </v-layout>
              
              <v-layout justify-space-around>
                <v-flex xs2 v-for="forward in squad.forwards" :key="forward.id">
                    <SelectPlayerPopup position="forward" :initialPlayer="forward" :players="availablePlayers(forwards)" v-bind="{addPlayerToSquad, removePlayerFromSquad}" /> 
                </v-flex>
              </v-layout>
            </v-container>   
          </v-img>

          <div class="text-xs-center">
            <v-btn-toggle dark>
              <v-btn @click="setFormation(5,4,1)" flat>5-4-1</v-btn>
              <v-btn @click="setFormation(5,3,2)" flat>5-3-2</v-btn>
              <v-btn @click="setFormation(4,5,1)" flat>4-5-1</v-btn>
              <v-btn @click="setFormation(4,4,2)" flat>4-4-2</v-btn>
              <v-btn @click="setFormation(4,3,3)" flat>4-3-3</v-btn>
              <v-btn @click="setFormation(3,5,2)" flat>3-5-2</v-btn>
              <v-btn @click="setFormation(3,4,3)" flat>3-4-3</v-btn>
            </v-btn-toggle>
          </div>

          <div class="text-xs-center">
            <v-btn @click="save()" :disabled="!isValidSquad()" :loading="loading" class="success">Save Squad</v-btn>
          </div>
          
          <GameweeksTable />
        </v-flex>

        <v-flex v-if="profile" xs8 sm6 lg3>
            <ProfileCard 
              :name="profile.name" 
              :squadName="profile.squad_name" 
              :team="profile.favorite_team"
              :points="profile.points" 
              :gameweekPoints="profile.active_squad ? profile.active_squad.points : 0" />
          <LeaguesCard :leagues="profile.leagues" />
        </v-flex>
      </v-layout>
    </v-container>

    <v-snackbar v-model="successPopup" :timeout="3000" color="success" class="justify-center">
      <v-layout justify-center>
        Squad saved!
      </v-layout>
    </v-snackbar>
    <v-snackbar v-model="errrorPopup" :timeout="3000" color="error" class="justify-center">
      <v-layout justify-center>
        Unable to save squad. Please try again
      </v-layout>
    </v-snackbar>
    
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import SelectPlayerPopup from '@/components/SelectPlayerPopup'
import GameweeksTable from '@/components/GameweeksTable'
import ProfileCard from '@/components/ProfileCard'
import LeaguesCard from '@/components/LeaguesCard'

export default {
  components:{
    SelectPlayerPopup,
    GameweeksTable,
    ProfileCard,
    LeaguesCard
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
      successPopup: false,
      errrorPopup: false,
      loading: false
    }
  },
  computed: {
    ...mapState(['profile']),
    ...mapGetters(['goalkeepers', 'defenders', 'midfielders', 'forwards'])
  },
  
  methods: {
    ...mapActions(['getProfile', 'saveSquad']),

    setupSquad() {
      if (this.profile.next_squad) {
        const defenders = this.profile.next_squad.players.filter(player => player.position.short_name === 'DEF').length
        const midfielders = this.profile.next_squad.players.filter(player => player.position.short_name === 'MID').length
        const forwards = this.profile.next_squad.players.filter(player => player.position.short_name === 'FW').length
        this.setFormation(defenders, midfielders, forwards)
        
        this.profile.next_squad.players.map(player => this.addPlayerToSquad(player))
      }
    },

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
      this.loading = true
      const players = [...this.selectedPlayers()]
      this.saveSquad({ players })
        .then(() => {
          this.successPopup = true
          this.getProfile()
        })
        .catch(() => this.errorPopup = true)
        .then(() => this.loading = false)
    }
  },
  created() {
    if (!this.profile) {
      this.getProfile()
        .then(() => {
          this.setupSquad()
        })
    }
    else {
      this.setupSquad()
    }
  },
}
</script>
