<template>
  <v-container fluid>
    <h4 class="display-1 text-xs-center">CANPL Fantasy</h4>
    
    <v-layout justify-center class="my-3">
      <v-flex xs12 sm10 md8 lg6>
        <v-card>
          <v-img src="/images/forwardArticleReal.jpg" aspect-ratio="1.7"></v-img>
          <v-card-action>
          
              <div class="grey--text text-xs-center caption">*Images taken by John Jacques</div>
          
          </v-card-action>
          <v-card-title primary-title>
            <h5 class="headline">Forwards to Watch: Fall Split</h5>
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
          <v-img src="/images/midfielderArticleReal.jpg" aspect-ratio="1.7"></v-img>
          <v-card-action>
            <div>
              <div class="grey--text text-xs-center caption">*Images taken by John Jacques</div>
            </div>
          </v-card-action>
          <v-card-title primary-title>
            <h5 class="headline">Midfielders to Watch: Fall Split</h5>
          </v-card-title>

          <v-card-actions class="pt-0">
            <v-btn flat color="orange" to="/articles/midfielders">Read More</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
