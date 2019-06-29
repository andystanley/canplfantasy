<template>
  <v-container flex>
    <v-card class="px-1">
      <v-card-title>
        <h6 class="title">Leagues</h6>
      </v-card-title>
      <v-divider></v-divider>
      <v-list >
        <v-list-tile v-for="league in leagues" :key="league.id"  >
          <v-chip @click="$router.push(`/league/${league.id}`)"  >{{ league.name }}</v-chip>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    leagues: Array
  }
}
</script>
