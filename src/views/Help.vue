<template>
  <v-container fluid>
    <v-layout justify-center>
      <h4 class="display-1 ma-2">Help</h4>
    </v-layout>

    
      <v-expansion-panel>
        <v-expansion-panel-content >
          <div slot="header" class="py-1">Selecting Squad</div>
          <v-card>
            <v-card-text class="px-4 black--text">
              <div class="font-weight-bold">Squad Size</div>
                <div> For your squad to be with in the rules of <span class="primary--text">CANPL </span> <span class="accent--text">Fantasy</span> you must first pick a formation and then fill in squad until players selected equals 11.
                      <br>
                    - Max of 1 Goalkeepers
                     <br>
                    - Max of 5 Defenders
                     <br>
                    - Max of 5 Midfielders
                     <br>
                    - Max of 3 Forwards
                      </div>
                <div class="font-weight-bold">Players From Same Team Cap</div>
                    <div>
                    -There is a max of 4 players from any CPL team.
                    </div>
                <div class="font-weight-bold">Budget</div>
                    <div>
                    -Budget for <span class="primary--text">CANPL </span> <span class="accent--text">Fantasy</span> is $75 million.
                    </div>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
   
      <v-expansion-panel>
        <v-expansion-panel-content >
          <div slot="header" class="py-1">Points Calculation</div>
          <v-card>
            <v-card-text class="px-4 black--text">
              <div class="font-weight-bold">Player Points</div>
              <div> - Playing 60 minutes or less = 1 Point </div>
                     <br>
                    - Goal scored by Forward = 4 Points
                     <br>
                    - Goal scored by Midfielder = 5 Points
                     <br>
                    - Goal scored by Defender or Goalkeeper = 6 Points
                     <br>
                    - Assist = 3 Points
                    <br>
                    - Clean sheet Midfielder = 1 Points
                    <br>
                    - Clean sheet by Defender or Goalkeeper = 4 Points
                    <br>
                    - For ever 3 saves a Goalkeeper makes = 1 Points
                    <br>
                    - Yellow card = -1 Points
                    <br>
                    - Red Card = -3 Points
                    <br>
                    - Penalty save = 5 Points
      
                      
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
       <v-expansion-panel>
        <v-expansion-panel-content >
          <div slot="header" class="py-1">Deadline Time</div>
          <v-card>
            <v-card-text class="px-4 black--text">
              <div class="font-weight-bold">Deadline day inquries</div>
               <div>
                 The deadline will alway be 1 hour before the first game of the current gameweek.
               </div>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-layout justify-center>
          <h4 class="display-1 ma-2">FAQ</h4>
        </v-layout>
      <v-expansion-panel>
        <v-expansion-panel-content >
          <div slot="header" class="py-1">Can't Sign up or Login</div>
          <v-card>
            <v-card-text class="px-4 black--text">
              <div class="font-weight-bold">Login Sign up Issues</div>
                <div> If you can't login or sign up please email us we will do are best to figure out your issue.
                  <br>
                  Andrew at <strong>contact@canplfantasy.ca</strong>
                      </div>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-content >
          <div slot="header" class="py-1">Partnering</div>
          <v-card>
            <v-card-text class="px-4 black--text">
              <div class="font-weight-bold">Partnering with us</div>
                <div> We are always looking for people to help grow canplfantasy, so if you think you would be able to help us grow please email us or tweet at us.
                  <br>
                  Andrew at <strong>contact@canplfantasy.ca</strong>
                  
                      </div>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
     
      </v-container>
      
        
    
 
   
  
</template>

<script>

  export default {
    components: { }
  }
</script>
