<template>
   <div class="pointsPopup">
    <v-layout justify-center>
    {{ player.last_name }}
    </v-layout>
    
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
