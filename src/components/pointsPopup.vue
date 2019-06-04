<template>
    <v-dialog max-width="600" v-model="popupOpen">
      <template v-slot:activator="{ on }">
          <v-icon :disabled="!player" color="red" class ="warning" small right @click="removePlayer">close</v-icon>
          <v-layout justify-center> 
            <v-img v-on="on" :src="player && player.team ? player.team.shirt : '/player/team/shirt'" style="cursor: pointer" max-width="80"></v-img>  
          </v-layout>
          <div class="darkGreen">
            <v-layout justify-center>
              <span :class="{'hide-text': !player}" class="font-weight-bold white--text " >{{ player ? player.last_name : 'position' }}</span>
            </v-layout>
            <hr>
            <v-layout justify-center>
              <span :class="{'hide-text': !player}" class="font-weight-bold white--text ">{{ player ? player.price : 'price' }}</span>
            </v-layout>
          </div>
      </template>
     
    </v-dialog>
</template>

<script>
export default {
  props: {
    initialPlayer: Object,
    position: String,
    players: Array,
    addPlayerToSquad: Function,
    removePlayerFromSquad: Function
  },
    
  methods : {
    addPlayer(player) {
      if (this.player) {
        this.removePlayerFromSquad(this.player)
      }
      this.player = player
      this.addPlayerToSquad(player)
      this.popupOpen = false
    },
    }
}
</script>

<style>
  .no-padding {
    padding: 0px !important;
  }

  .hide-text {
    opacity: 0;
  }
</style>