<template>
  <div class="dashboard">
    <v-container>
    <v-layout justify-center>
      <h4 class="display-1">Leagues</h4>
    </v-layout>
    <v-container fluid>
      <v-layout>
        <v-spacer></v-spacer>
        <v-flex>
            <br>
          <h6 class="title">Overall</h6> 
          <v-btn class="primary">322/1000</v-btn>
          <span ></span>
        </v-flex>
        <v-flex>
            <br>
          <h6 class="title">York 9 Fc League</h6>
         <v-btn class="primary" flat>49/200</v-btn>
          <span class="subheading"></span>
        </v-flex>
      </v-layout>
    </v-container>
    <hr>
    <br>
    <v-layout justify-center>
        <h5 class="headline">Hall Of Fame of 2019</h5>
    </v-layout>
    <br>
    <v-layout justify-space-around>
        <h3>First player to ever regiestered - kingCal</h3>
        <h3>First player to ever get over 100 points - candyAndy</h3>
    </v-layout>
    <br>
    <v-layout justify-space-around>
        <h2 class="title">Champion Of 2019 inaugural season Canpl Fantasy</h2>
    </v-layout>
    <br>
    <v-layout justify-space-around>
        <h2 class="title">BarneyBekker</h2>
    </v-layout>
    <br>
    <v-layout justify-space-around>
        <h2 class="title">Champion Of first ever cup of Canpl Fantasy</h2>
    </v-layout>
    <br>
    <v-layout justify-space-around>
        <h2 class="title">BarneyBekker</h2>
    </v-layout>
    </v-container>
  </div>
</template>

<script>

  export default {
    components: { }
  }
</script>
