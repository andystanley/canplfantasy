<template>
   <div class="pointsPopup">
    <v-layout justify-center>
    <v-img v-on="on" :src="player && player.team ? player.team.shirt : 'player.team.shirt'"  max-width="80"></v-img>  
    </v-layout>
    <div class="darkGreen">
            <v-layout justify-center>
              <span :class="{'hide-text': !player}" class="font-weight-bold white--text " >{{ player ? player.last_name : 'position' }}</span>
            </v-layout>
            <hr>
            <v-layout justify-center>
              <span :class="{'hide-text': !player}" class="font-weight-bold white--text ">{{ player ? player.points : 'points' }}</span>
            </v-layout>
          </div>
    
   </div>
</template>

<script>
export default {
  props: {
    initialPlayer: Object,
  },
   data () {
    return {
      player: !this.initialPlayer.hasOwnProperty('blank') ? this.initialPlayer : null,
    }
  },
    
}
</script>
