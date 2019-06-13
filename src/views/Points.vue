<template>
  <v-container fluid>
    <template v-if="!squadExists">
      <v-layout justify-center>
        <h4 class="display-1">Gameweek 1 has not started</h4>
      </v-layout>
    </template>

    <template v-if="squadExists">
      <v-layout justify-center>
        <h4 class="display-1">Gameweek 1</h4>
      </v-layout>
      <v-container fluid>
        <v-layout justify-space-around>
          <v-spacer></v-spacer>
          <v-flex>
            <h6 class="title">Overall Rank</h6>
            <v-btn flat to="/league/2">300/1331</v-btn>
          </v-flex>
          <v-flex>
            <h6 class="title">Points</h6>
            <span class="subheading">{{ profile.active_squad.points }}</span>
          </v-flex>
          <v-flex>
            <h6 class="title">Fan League</h6>
            <v-btn to="/league/1">30/131</v-btn>
          </v-flex>
        </v-layout>
      </v-container>

      <v-layout justify-center>
        <v-flex xs12 sm8 md6 lg4>
          <v-img src="/images/startingEleven.png" max-width="600">
            <v-container fluid>
              <v-layout justify-space-around>
                <v-flex xs2 v-for="goalkeeper in squad.goalkeepers" :key="goalkeeper.id">
                  <PlayerStatsPopup :initialPlayer="goalkeeper"/>
                </v-flex>
              </v-layout>  
              
              <v-layout justify-space-around class="mt-3">
                <v-flex xs2 v-for="defender in squad.defenders" :key="defender.id">
                  <PlayerStatsPopup :initialPlayer="defender"/>
                </v-flex>
              </v-layout>

              <v-layout justify-space-around class="mt-3">
                <v-flex xs2 v-for="midfielder in squad.midfielders" :key="midfielder.id">
                  <PlayerStatsPopup :initialPlayer="midfielder"/>  
                </v-flex>
              </v-layout>
              
              <v-layout justify-space-around class="mt-3">
                <v-flex xs2 v-for="forward in squad.forwards" :key="forward.id">
                  <PlayerStatsPopup :initialPlayer="forward"/>  
                </v-flex>
              </v-layout>
            </v-container>   
          </v-img>
        </v-flex>
      </v-layout>

      <v-layout justify-center>
        <v-flex xs12 sm8 md6 lg4>
          <GameweeksTable />
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PlayerStatsPopup from '@/components/PlayerStatsPopup'
import GameweeksTable from '@/components/GameweeksTable'

export default {
  components:{
    PlayerStatsPopup,
    GameweeksTable
  },
  data() {
    return {
      squadExists: false,
      squad: {
        goalkeepers: [{blank: true}],
        defenders: [{blank: true}, {blank: true}, {blank: true}, {blank: true}, {blank: true}],
        midfielders: [{blank: true}, {blank: true}, {blank: true}, {blank: true}],
        forwards: [{blank: true}]
      }
    }
  },
  methods:{
    ...mapActions(['getProfile']),
    
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
  },
  computed: {
    ...mapState(['profile']),
    
  },
  created() {
  this.getProfile()
    .then(() => {
      if (this.profile.active_squad) {
        this.squadExists = true
        const defenders = this.profile.active_squad.players.filter(player => player.position.short_name === 'DEF').length
        const midfielders = this.profile.active_squad.players.filter(player => player.position.short_name === 'MID').length
        const forwards = this.profile.active_squad.players.filter(player => player.position.short_name === 'FW').length
        this.setFormation(defenders, midfielders, forwards)

        this.profile.active_squad.players.map(player => this.addPlayerToSquad(player))
      }
    })
  }
}
</script>
