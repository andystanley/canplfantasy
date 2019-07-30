<template>
  <v-container fluid>
    <h4 class="display-1 text-xs-left">Injuries & Suspensions</h4>
    
    <v-layout justify-center class="my-3">
      <v-flex xs12 sm10 md8 lg6>
        <v-btn disabled>
         hello
        </v-btn>
    
      </v-flex>
    </v-layout>

    <v-layout justify-center  class="my-3">
      <v-flex xs12 sm10 md8 lg6>
        <v-card>
         
          <v-card-title primary-title>
            <h5 class="headline">Midfielders to Watch: Fall Split</h5>
          </v-card-title>

          <v-card-actions class="pt-0">
            {{ player.availability.status}}
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

export default {
    
}
</script>


