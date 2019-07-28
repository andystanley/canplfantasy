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
              <td nowrap>
                <span class="hidden-xs-only">{{ props.item.first_name }} </span>
                <span>{{ props.item.last_name }} </span>
                <v-tooltip v-if="!props.item.availability" right>
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on" small color="green">check_circle</v-icon>
                  </template>
                  <span>Available</span>
                </v-tooltip>
                <v-tooltip v-else right>
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on" small :color="iconColor[props.item.availability.status.icon]">{{ props.item.availability.status.icon }}</v-icon>
                  </template>
                  <span>{{ props.item.availability.status.name }}</span>
                </v-tooltip>
              </td>
              <td>{{ props.item.points }}</td>
              <td>{{ props.item.price }}</td>
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
      pagination: {
          page: 1,
          rowsPerPage: 5,
          totalItems: 0,
          sortBy: 'points', 
          descending: true
      },
      iconColor: {
        'help': 'amber',
        'gavel': 'red',
        'report': 'red',
        'autorenew': 'grey darken-1',
        'swap_horiz': 'grey darken-1'
      }
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
