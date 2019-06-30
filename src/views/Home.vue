<template>
  <v-container fluid>
    <h3 class="display-2 text-xs-center">CANPL Fantasy</h3>
    
    <v-layout justify-center class="my-3">
      <v-flex xs12 sm10 md8 lg6>
        <v-card>
          <v-img src="/images/forwardArticleReal.jpg" aspect-ratio="1.7"></v-img>

          <v-card-title primary-title>
            <h3 class="headline">Forwards to watch: Fall Split</h3>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange" to="/articles/forwards">Read More</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout justify-center class="my-3">
      <v-flex xs12 sm10 md8 lg6>
        <v-card>
          <v-img src="/images/midfielderArticleReal.jpg" aspect-ratio="1.7"></v-img>

          <v-card-title primary-title>
            <h3 class="headline mb-0">Midfielders to watch: Fall Split</h3>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange"  to="/articles/midfielder">Read More</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
