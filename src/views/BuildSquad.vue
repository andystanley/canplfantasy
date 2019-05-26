<template>
<div class="team">

<h1>Chose your first starting 11</h1>
<h1>{{ teamPrice.toFixed(1) }}</h1>

   <!-- <v-btn class="hidden-md-and-down">click-me</v-btn> -->
   <v-container class="my-5">
     <v-img src="/startingEleven.png">
     
        <v-layout row>
         <v-flex lg1><br> <br> 
         </v-flex>
       </v-layout>
      
      <!-- <v-img :aspect-ratio="23/10" src="/startingEleven.png"> -->

    <v-layout row wrap justify-space-around center>
      
      <v-flex xs3 sm3 md3 lg1>
      <PlayerPopup position="Goalie" :players="goalies"/>         
           
      </v-flex>
       </v-layout>
       
        
         
      
       <v-layout row>
         <v-flex lg2><br> <br> 
         </v-flex>
       </v-layout>
      
      
       <v-layout row>
         <v-flex lg2><br> <br> 
         </v-flex>
       </v-layout>
     <v-layout row wrap justify-space-around>
       <v-flex xs3 sm3 md3 lg1>
        <PlayerPopup position="defender" :players="defenders"/> 
       </v-flex>
       <v-flex xs3 sm3 md3 lg1>
         <PlayerPopup position="defender" :players="defenders"/>  
       </v-flex>
       <v-flex xs3 sm3 md3 lg1>
         <PlayerPopup position="defender" :players="defenders"/> 
       </v-flex>
       <v-flex xs3 sm3 md3 lg1>
         <PlayerPopup position="defender" :players="defenders"/> 
       </v-flex>
      
       </v-layout>
      
       <v-layout row>
         <v-flex lg2><br> <br> <br> <br> <br> 
         </v-flex>
       </v-layout>
        <v-layout row wrap justify-space-around>
       <v-flex xs3 sm3 md3 lg1>
          <PlayerPopup position="midfielder" :players="midfielders"/>   
       </v-flex>
       <v-flex xs3 sm3 md3 lg1>
          <PlayerPopup position="midfielder" :players="midfielders"/> 
       </v-flex>
       <v-flex xs3 sm3 md3 lg1>
          <PlayerPopup position="midfielder" :players="midfielders"/>  
       </v-flex>
       <v-flex xs3 sm3 md3 lg1>
         <PlayerPopup position="midfielder" :players="midfielders"/> 
       </v-flex>
      
       </v-layout>
        <v-layout row>
         <v-flex lg2><br> <br>  <br> <br> <br> 
         </v-flex>
       </v-layout>
      
    
        <v-layout row wrap justify-space-around>
       <v-flex xs3 sm3 md3 lg1>
          <PlayerPopup position="forward" :players="forwards"/> 
       </v-flex>
       <v-flex xs3 sm3 md3 lg1>
         <PlayerPopup position="forward" :players="forwards"/> 
       </v-flex>
       
       </v-layout>
       </v-img> 
      
       </v-container>
        <v-layout row wrap>
         <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
             <v-card flat class="text-xs-center ma-3">
                 <v-responsive class="pt-4">
                     <v-avatar size="100" class="grey">
                         <img :src="person.avatar" alt="">
                     </v-avatar>
                     </v-responsive>

                 <v-card-text>
                     <div>
                      <div class="subheading.name">Name-{{ person.name}}  </div>
                      <div class="grey--text"> Position-{{ person.position}}  </div>
                      <div class="grey--text">Price-{{ person.price}}  </div>
                     </div>
                     </v-card-text>
             </v-card>
             
         </v-flex>
        
            
        
        </v-layout>
        
           
</div>
</template>

<script>
  import PlayerPopup from "@/components/PlayerPopup"
  

  export default {
    components:{
      PlayerPopup
    },
   data(){
      return {

        remove: true,
        teamPrice: 90.00,
        goalies:[
           { name: 'Marcus Haber', position: 'goalie', avatar: '/pacificFc.jpg', price: 7.00,points: 0.00, team: 'cavs', teamColor: 'red'},
            { name: 'karcu Haber', position: 'goalie', avatar: '/pacificFc.jpg', price: 9.00,points: 0.00, team: 'Pacific Fc'},
            { name: 'Marcus Haber', position: 'goalie', avatar: '/pacificFc.jpg', price: 10.00,points: 0.00, team: 'Pacific Fc'}
           
        ],
        defenders:[
           { name: 'Marcus Haber', position: 'defender', avatar: '/pacificFc.jpg', price: 7.00,points: 0.00 , team: 'Pacific Fc'},
           
        ],
        midfielders:[
           { name: 'Marcus Haber', position: 'midfielder', avatar: '/pacificFc.jpg', price: 7.00,points: 0.00, team: 'Pacific Fc'},
           
        ],
        forwards:[
           { name: 'Marcus Haber', position: 'forward', avatar: '/pacificFc.jpg', price: 7.00, points: 0.00, team: 'Pacific Fc'},
        ],
       
      }
    },
  
  }
 
  
</script>