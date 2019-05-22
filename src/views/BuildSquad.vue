<template>
<div class="team">
    <v-flex xs12 sm6 md3>
          <v-text-field
            label="Team Name"
          ></v-text-field>
        </v-flex>
<h1>Team creation rules</h1>
<h2 class="red">1-Select 15 players, 2 Goalkeepers, 5 Defenders, 5 Midfielders, 3 Forwards</h2>

   <!-- <v-btn class="hidden-md-and-down">click-me</v-btn> -->
   <v-container class="my-5">
      <v-img :aspect-ratio="23/10" src="/startingEleven.png">
    <v-layout row wrap justify-space-around center>
       <v-flex xs2 sm2 md2 lg2>
         <v-btn round color="primary"> <span>Goalie</span>
           <v-icon right> control_point </v-icon>
         </v-btn>
       </v-flex>
       </v-layout>
       <v-layout row>
         <v-flex lg2><br> <br> <br> 
         </v-flex>
       </v-layout>
     <v-layout row wrap justify-space-around>
       <v-flex xs6 sm3 md3 lg1>
         <v-btn round color="primary"> <span>Defender</span>
           <v-icon right> control_point </v-icon>
         </v-btn>
       </v-flex>
       <v-flex xs6 sm3 md3 lg1>
         <v-btn round color="primary"> <span>Defender</span>
           <v-icon right> control_point </v-icon>
         </v-btn>
       </v-flex>
       <v-flex xs6 sm3 md3 lg1>
         <v-btn round color="primary"> <span>Defender</span>
           <v-icon right> control_point </v-icon>
         </v-btn>
       </v-flex>
       <v-flex xs6 sm3 md3 lg2>
         <v-btn round color="primary"> <span>Defender</span>
           <v-icon right> control_point </v-icon>
         </v-btn>
       </v-flex>
      
       </v-layout>
      
       <v-layout row>
         <v-flex lg2><br> <br> <br> <br> <br> 
         </v-flex>
       </v-layout>
        <v-layout row wrap justify-space-around>
       <v-flex xs6 sm3 md3 lg1>
         <v-btn round color="primary"> <span>Midfielder</span>
           <v-icon right> control_point </v-icon>
         </v-btn>
       </v-flex>
       <v-flex xs6 sm3 md3 lg1>
         <v-btn round color="primary"> <span>Midfielder</span>
           <v-icon right> control_point </v-icon>
         </v-btn>
       </v-flex>
       <v-flex xs6 sm3 md3 lg1>
         <v-btn round color="primary"> <span>Midfielder</span>
           <v-icon right> control_point </v-icon>
         </v-btn>
       </v-flex>
       <v-flex xs6 sm3 md3 lg2>
         <v-btn round color="primary"> <span>Midfielder</span>
           <v-icon right> control_point </v-icon>
         </v-btn>
       </v-flex>
      
       </v-layout>
        <v-layout row>
         <v-flex lg2><br> <br>  <br> <br> <br> 
         </v-flex>
       </v-layout>
      
    
        <v-layout row wrap justify-space-around>
       <v-flex xs6 sm4 md2 lg2>
         <v-btn round color="primary"> <span>Forward</span>
           <v-icon right> control_point </v-icon>
         </v-btn>
       </v-flex>
       <v-flex xs6 sm4 md2 lg2>
         <v-btn round color="primary"> <span>Forward</span>
           <v-icon right> control_point </v-icon>
         </v-btn>
       </v-flex>
       
       </v-layout>
       </v-img>
       <v-layout row wrap justify-space-around>
       <v-flex xs6 sm4 md2 lg3>
         <v-btn round color="secondary"> <span>Sub Goalie</span>
           <v-icon right> control_point </v-icon>
         </v-btn>
       </v-flex>
       <v-flex xs6 sm4 md2 lg3>
         <v-btn round color="secondary"> <span>Sub Defender</span>
           <v-icon right> control_point </v-icon>
         </v-btn>
       </v-flex>
       <v-flex xs6 sm4 md2 lg3>
         <v-btn round color="secondary"> <span>Sub Midfielder</span>
           <v-icon right> control_point </v-icon>
         </v-btn>
       </v-flex>
       <v-flex xs6 sm4 md2 lg3>
         <v-btn round color="secondary"> <span>Sub Forward</span>
           <v-icon right> control_point </v-icon>
         </v-btn>
       </v-flex>
       </v-layout>
       
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
  

  export default {
   data(){
   return {
     remove: true,
     teamPrice: 100.00,
      team: [
       { name: 'Marcus Haber', position: 'Forward', avatar: '/pacificFc.jpg', price: '7.00'},
        
        
      ]
   
    }
  }
  }
 
  
</script>