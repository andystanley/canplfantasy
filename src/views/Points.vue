<template>
  <v-container fluid>
    <template v-if="!squadExists">
      <v-layout justify-center>
        <h4 class="display-1">Gameweek 1 has not started</h4>
      </v-layout>
    </template>

    <template v-if="squadExists">
      <v-layout justify-center class="mb-3">
        <h4 class="display-1">Gameweek {{ activeGameweek ? activeGameweek.number : '' }}</h4>
      </v-layout>
      
      <v-container grid-list-md>
        <v-layout wrap justify-center>      
          <v-flex xs12 sm8 md6 lg5>
            <v-img src="/images/startingEleven.png" max-width="600">
              <v-container fluid>
                <v-layout justify-space-around>
                  <v-flex xs2 v-for="goalkeeper in squad.goalkeepers" :key="goalkeeper.id">
                    <PlayerStatsPopup :player="goalkeeper" />
                  </v-flex>
                </v-layout>  
                
                <v-layout justify-space-around class="mt-3">
                  <v-flex xs2 v-for="defender in squad.defenders" :key="defender.id">
                    <PlayerStatsPopup :player="defender" />
                  </v-flex>
                </v-layout>

                <v-layout justify-space-around class="mt-3">
                  <v-flex xs2 v-for="midfielder in squad.midfielders" :key="midfielder.id">
                    <PlayerStatsPopup :player="midfielder" />  
                  </v-flex>
                </v-layout>
                
                <v-layout justify-space-around class="mt-3">
                  <v-flex xs2 v-for="forward in squad.forwards" :key="forward.id">
                    <PlayerStatsPopup :player="forward" />  
                  </v-flex>
                </v-layout>
              </v-container>   
            </v-img>

            <GameweeksTable />
          </v-flex>

          <v-flex v-if="profile" xs12 sm6 md5 lg4>
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
    </template>
  </v-container>
</template>

<script>
import api from '../api'
import { mapActions, mapGetters, mapState } from 'vuex'
import PlayerStatsPopup from '@/components/PlayerStatsPopup'
import GameweeksTable from '@/components/GameweeksTable'
import ProfileCard from '@/components/ProfileCard'
import LeaguesCard from '@/components/LeaguesCard'

export default {
  components:{
    PlayerStatsPopup,
    GameweeksTable,
    ProfileCard,
    LeaguesCard
  },
  data() {
    return {
      profile: null,
      squadExists: false,
      squad: {
        goalkeepers: [{blank: true}],
        defenders: [{blank: true}, {blank: true}, {blank: true}, {blank: true}, {blank: true}],
        midfielders: [{blank: true}, {blank: true}, {blank: true}, {blank: true}],
        forwards: [{blank: true}]
      }
    }
  },

  computed: {
    ...mapState({ cachedProfile: 'profile', token: 'token' }),
    ...mapGetters(['activeGameweek'])
  },

  methods:{
    ...mapActions(['getProfile']),

    setupSquad() {
      if (this.profile.active_squad) {
        const defenders = this.profile.active_squad.players.filter(player => player.position.short_name === 'DEF').length
        const midfielders = this.profile.active_squad.players.filter(player => player.position.short_name === 'MID').length
        const forwards = this.profile.active_squad.players.filter(player => player.position.short_name === 'FW').length
        this.setFormation(defenders, midfielders, forwards)

        this.profile.active_squad.players.map(player => this.addPlayerToSquad(player))

        this.squadExists = true
      }
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

  created() {
    const profileId = this.$route.params.id

    if (profileId) {
      api.setToken(this.token)
      
      api.getProfileById(profileId)
        .then(profile => {
          this.profile = profile
          this.setupSquad()
        })
    } 
    else {
      if (!this.cachedProfile) {
        this.getProfile().then(() => {
          this.profile = this.cachedProfile
          this.setupSquad()
        })
      }
      else {
        this.profile = this.cachedProfile
        this.setupSquad()
      }
    }
  }
}
</script>
