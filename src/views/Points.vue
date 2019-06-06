<template>
  <div class="points">
    <div v-if="!squadExists">
      <v-layout justify-center>
        <h1>Gameweek 1 has not started</h1>
      </v-layout>
    </div>
    <div v-if="squadExists">
      <v-layout justify-center>
        <h1>Gameweek 1</h1>
      </v-layout>
      <v-container fluid>
        <v-layout justify-space-around>
          <v-spacer></v-spacer>
          <v-flex>
            <h2>Rank</h2>
            <h3>44</h3>
          </v-flex>
          <v-flex>
            <h2>Points</h2>
            <h3>{{ profile.active_squad.points }}</h3>
          </v-flex>
        </v-layout>
      </v-container>

      <v-layout justify-center>
        <v-img src="/images/startingEleven.png" max-width="600">
          <v-container fluid>
            <v-layout justify-space-around>
              <v-flex xs2 v-for="goalkeeper in squad.goalkeepers" :key="goalkeeper.id">
                <PointsPopup :initialPlayer="goalkeeper"/>
              </v-flex>
            </v-layout>  
            
            <v-layout justify-space-around class="mt-5">
              <v-flex xs2 v-for="defender in squad.defenders" :key="defender.id">
                <PointsPopup :initialPlayer="defender"/>
              </v-flex>
            </v-layout>

            <v-layout justify-space-around class="mt-5">
              <v-flex xs2 v-for="midfielder in squad.midfielders" :key="midfielder.id">
                <PointsPopup :initialPlayer="midfielder"/>  
              </v-flex>
            </v-layout>
            
            <v-layout justify-space-around class="mt-5">
              <v-flex xs2 v-for="forward in squad.forwards" :key="forward.id">
                  <PointsPopup :initialPlayer="forward"/>  
              </v-flex>
            </v-layout>
          </v-container>   
        </v-img>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PointsPopup from '@/components/PointsPopup'

export default {
  components:{
    PointsPopup
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
