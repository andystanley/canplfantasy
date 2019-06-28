<template>
  <v-dialog max-width="600" v-model="popupOpen">
    <template v-slot:activator="{ on }">
        <v-icon :disabled="isBlankPlayer" color="red" class ="warning" small right @click="removePlayer">close</v-icon>
        <v-layout justify-center> 
          <v-img v-on="on" :src="!isBlankPlayer ? player.team.shirt : '/images/blank.png'" style="cursor: pointer" max-width="80"></v-img>  
        </v-layout>
        <div class="darkGreen">
          <v-layout justify-center>
            <span :class="{'hide-text': isBlankPlayer}" class="font-weight-regular white--text text-xs-center">{{ !isBlankPlayer ? player.last_name : 'position' }}</span>
          </v-layout>
          <hr>
          <v-layout justify-center>
            <span :class="{'hide-text': isBlankPlayer}" class="font-weight-medium white--text">{{ !isBlankPlayer ? player.price : 'price' }}</span>
          </v-layout>
        </div>
    </template>
    <v-card>
      <v-card-title>
        <h6 class="title">Add {{ position }}</h6>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search by name" single-line hide-details></v-text-field>
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="players" class="elevation-1" :search="search" :custom-filter="filterNames" :pagination.sync="pagination">
          <template v-slot:items="props"> 
            <tr>
              <td class="no-padding"><v-btn icon small @click="addPlayer(props.item)"><v-icon>person_add</v-icon></v-btn></td>
              <td>{{ props.item.first_name }} {{ props.item.last_name }}</td>
              <td >{{ props.item.points }}</td>
              <td >{{ props.item.price }}</td>
              <td><v-img max-width="35" :src="props.item.team.shirt"></v-img></td>
            </tr>
          </template>
        </v-data-table>  
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    player: Object,
    position: String,
    players: Array,
    addPlayerToSquad: Function,
    removePlayerFromSquad: Function
  },
  data () {
    return {
      popupOpen: false,
      isBlankPlayer: this.player.hasOwnProperty('blank') ? true : false,
      search: '',
      headers: [
        { sortable: false},
        { text: 'Players', value: 'last_name'},
        { text: 'Points', value: 'points'},
        { text: 'Price', value: 'price'},
        { text: 'Team', value: 'team.name'}
      ],
      pagination: {'sortBy': 'points', 'descending': true}
    }
  },
  methods : {
    addPlayer(player) {
      if (!this.isBlankPlayer) {
        this.removePlayerFromSquad(this.player)
      }
      this.addPlayerToSquad(player)
      this.popupOpen = false
    },

    removePlayer() {
      this.removePlayerFromSquad(this.player)
    },

    filterNames(players, search, filter) {
      search = search.toString().toLowerCase()
      return players.filter(player => {
        return filter(player.last_name, search) 
          || filter(player.first_name, search)
          || filter(player.first_name + ' ' + player.last_name, search)
      })
    }
  }
}
</script>

<style scoped>
  .no-padding {
    padding: 0px !important;
  }

  .hide-text {
    opacity: 0;
  }
</style>
