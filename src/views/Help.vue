<template>
  <v-container fluid>
    <v-layout justify-center>
      <h4 class="display-1 ma-3">Help</h4>
    </v-layout>

    <v-expansion-panel>
      <v-expansion-panel-content>
        <div slot="header">Squad Selection</div>
        <v-card>
          <v-card-text class="px-4">
            
            <div>
              <span class="subheading font-weight-bold">Squad Size</span>
              <div>11 players</div>
              <ul>
                <li>Max of 1 Goalkeepers</li>
                <li>Max of 5 Defenders</li>
                <li>Max of 5 Midfielders</li>
                <li>Max of 3 Forwards</li>
              </ul>
            </div>

            <div class="mt-2">
              <span class="subheading font-weight-bold">Players from the same Team</span>
              <ul>
                <li>A maximum of 4 players can be selected from the same team</li>
              </ul>
            </div>

            <div class="mt-2">
              <span class="subheading font-weight-bold">Budget</span>
              <ul>
                <li>75m</li>
              </ul>
            </div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
   
    <v-expansion-panel>
      <v-expansion-panel-content >
        <div slot="header" class="py-1">Player Points</div>
        <v-card>
          <v-card-text class="px-4">
            <ul>
              <li>Playing less than 60 minutes = 1 Point</li>
              <li>Playing 60 minutes or more = 2 Points</li>
              <li>Goal scored by Forward = 4 Points</li>
              <li>Goal scored by Midfielder = 5 Points</li>
              <li>Goal scored by Defender = 6 Points</li>
              <li>Goal scored by Goalkeeper = 6 Points</li>
              <li>Assist = 3 Points</li>
              <li>Clean sheet by Midfielder = 1 Points</li>
              <li>Clean sheet by Defender = 4 Points</li>
              <li>Clean sheet by Goalkeeper = 4 Points</li>
              <li>Every 3 saves by Goalkeeper = 1 Points</li>
              <li>Penalty save = 5 Points</li>
              <li>Penalty miss = -2 Points</li>
              <li>Yellow card = -1 Points</li>
              <li>Red Card = -3 Points</li>
            </ul>                      
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
      
    <v-expansion-panel>
      <v-expansion-panel-content>
        <div slot="header" class="py-1">Gameweek Deadline</div>
        <v-card>
          <v-card-text class="px-4">
              <ul>
                <li>The deadline to submit your squad is 1 hour before the first game of the gameweek</li>
              </ul>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-layout justify-center>
      <h4 class="display-1 ma-3">FAQ</h4>
    </v-layout>
    <v-expansion-panel>
      <v-expansion-panel-content>
        <div slot="header" class="py-1">Login / Sign up Issues</div>
        <v-card>
          <v-card-text class="px-4">
            <ul>
              <li>If you're having trouble logging in or signing up please email us at <b>contact@canplfantasy.ca</b></li>
            </ul>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-content >
        <div slot="header" class="py-1">Partnering With Us</div>
        <v-card>
          <v-card-text class="px-4">
            <ul>
              <li>We are always looking to grow CANPL Fantasy. If you are interested in partnering with us please email us at <b>contact@canplfantasy.ca</b></li>
            </ul>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
</template>
