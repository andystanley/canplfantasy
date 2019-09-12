<template>
  <v-container fluid>
    <v-layout justify-center class="spacing-playground py-0 px-0">
      <v-flex xs12 sm12 md12 lg12>
        <v-img src="/images/CanFPL_Website_header.png"></v-img>
      </v-flex>
    </v-layout>
    <v-layout justify-space-around class="my-3">
      <v-flex xs12 sm10 md8 lg3>
        <v-card>
          <v-list-item three-line>
            <v-list-item-content class="align-self-start">
              <v-list-item-title class="headline mb-2 ml-2"
                >Join a League</v-list-item-title
              >
              <v-spacer></v-spacer>
              <v-list-item-subtitle class="mb-2 ml-2">
                Play against family friends in club supported leagues or an
                unaffililated league.
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-img src="/images/LeagueImage.png" height="215px"></v-img>
          </v-list-item>
        </v-card>
      </v-flex>
      <v-flex xs12 sm10 md8 lg3>
        <v-card dark>
          <v-list-item three-line>
            <v-list-item-content class="align-self-start">
              <v-list-item-title class="headline mb-2 ml-2"
                >Pick Your Squad</v-list-item-title
              >
              <v-spacer></v-spacer>
              <v-list-item-subtitle class="mb-2 ml-2">
                Use your budget of 75m to select 11 players from the Canadian
                Premier League.
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-img src="/images/homePageSquad.png" height="215px"></v-img>
          </v-list-item>
        </v-card>
      </v-flex>

      <v-flex xs12 sm10 md8 lg3>
        <v-card>
          <v-img src="/images/forwardArticle.jpg"></v-img>
          <v-card-title primary-title>
            <h5 class="headline">Mid-season DEV update</h5>
          </v-card-title>

          <v-card-actions class="pt-0">
            <v-btn flat color="orange" to="/articles/forwards">Read More</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout justify-center class="my-3">
      <v-flex xs12 sm10 md8 lg6>
        <v-card>
          <v-img src="/images/midfielderArticle.jpg"></v-img>
          <v-card-title primary-title>
            <h5 class="headline">Midfielders to Watch: Fall Split</h5>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
