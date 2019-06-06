<template>
   <div class="points-popup">
      <v-layout justify-center>
        <v-img :src="player.team.shirt"  max-width="80"></v-img>  
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
  }
}
</script>
