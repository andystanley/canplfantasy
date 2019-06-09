<template>
  <div class="rules">
    <h1>Rules</h1>

    <v-container class="my-5">
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
                    -There is a max of 3 players from any CPL team.
                    </div>
                <div class="font-weight-bold">Budget</div>
                    <div>
                    -Budget for <span class="primary--text">CANPL </span> <span class="accent--text">Fantasy</span> is $80 million.
                    </div>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
    
  </div>
</template>

<script>

  export default {
    components: { }
  }
</script>
