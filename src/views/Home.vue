<template>
  <v-container fluid>
    <v-flex >
      <div>
    <h3 class="display-3 mb-2 text-xs-center"> CANPL FANTASY</h3>
    </div>
    </v-flex>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img
            src="/images/forwardsArticle.jpg"
            aspect-ratio="1.7"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Best Forwards Options in the CANPL: Fall Split</h3>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange" to="/articles/forwards">Read More</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <br>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img
            src="/images/MidfielderArticle.jpg"
            aspect-ratio="1.7"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Best Midfielders Options in the CANPL: Fall Split</h3>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange"  to="/articles/midfielder">Read More</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
     <br>
   
  </v-container>
</template>

<script>

  export default {
    components: { }
  }
</script>
