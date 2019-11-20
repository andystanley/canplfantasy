<template>
  <v-container fluid>
    <h4 class="display-1 text-center">CanPL Fantasy</h4>

    <v-row justify="center" class="my-3">
      <v-col xs="12" sm="10" md="8" lg="6">
        <v-card>
          <v-img src="/images/forwardArticle.jpg"></v-img>
          <v-card-title primary-title>
            <h5 class="headline">Forwards to Watch: Fall Split</h5>
          </v-card-title>

          <v-card-actions class="pt-0">
            <v-btn text color="orange" to="/articles/forwards">Read More</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-3">
      <v-col xs="12" sm="10" md="8" lg="6">
        <v-card>
          <v-img src="/images/midfielderArticle.jpg"></v-img>
          <v-card-title primary-title>
            <h5 class="headline">Midfielders to Watch: Fall Split</h5>
          </v-card-title>

          <v-card-actions class="pt-0">
            <v-btn text color="orange" to="/articles/midfielders"
              >Read More</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
