<template>
  <div class="points">
    <v-container fluid>
      <v-layout justify-space-around>
        <v-spacer></v-spacer>

         <v-flex>
          <h2>Week {{ week }}1 rank</h2>
          <h3> {{ rank }} 44 </h3>
        </v-flex>
        <v-flex>
          <h2>Total points</h2>
          <h3> 0 </h3>
        </v-flex>
      </v-layout>
    </v-container>

    <v-layout justify-center>
      <v-img src="/images/startingEleven.png" max-width="600">
        <v-container fluid>
          <v-layout justify-space-around>
            <v-flex xs2 v-for="goalkeeper in squad.goalkeepers" :key="goalkeeper.id">
             
            </v-flex>
          </v-layout>  
          
          <v-layout justify-space-around>
            <v-flex xs2 v-for="defender in squad.defenders" :key="defender.id">
            
            </v-flex>
          </v-layout>

          <v-layout justify-space-around>
            <v-flex xs2 v-for="midfielder in squad.midfielders" :key="midfielder.id">
              
            </v-flex>
          </v-layout>
          
          <v-layout justify-space-around>
            <v-flex xs2 v-for="forward in squad.forwards" :key="forward.id">
               
            </v-flex>
          </v-layout>
        </v-container>   
      </v-img>
    </v-layout>

    
    
    
  </div>
</template>
<script>
export default {
  components:{ },
}
</script>
<script>



export default {
 
  data() {
    return {
      squad: {
        goalkeepers: [{blank: true}],
        defenders: [{blank: true}, {blank: true}, {blank: true}, {blank: true}, {blank: true}],
        midfielders: [{blank: true}, {blank: true}, {blank: true}, {blank: true}],
        forwards: [{blank: true}]
      },
     
    }
  },
  
}
</script>
