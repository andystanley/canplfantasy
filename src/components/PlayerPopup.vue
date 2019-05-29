<template>
    <v-dialog max-width="600">
      <template v-slot:activator="{ on }">
          <v-icon color="red" class ="warning" small right @click="removePlayer">close</v-icon>
          <v-img v-on="on" :src="playerImage" style="cursor: pointer"></v-img>  
          <v-layout justify-center>
            <span>{{ playerName }}</span>
          </v-layout>
      </template>
      <v-card>
        <v-card-title>
          <h2>Add {{ position }}</h2>
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-card-text>
          <v-data-table :headers="headers" :items="players" class="elevation-1" :search="search" :pagination.sync="pagination">
            <template v-slot:items="props"> 
              <tr >
                <td style="cursor: pointer"  @click="addPlayer(props.item)">{{ props.item.first_name }} {{ props.item.last_name }}</td>
                <td >{{ props.item.points }}</td>
                <td >{{ props.item.price }}</td>
                <td @click="props.expanded = !props.expanded"><v-img max-width="35" :src="props.item.team.shirt"></v-img></td>
                <td @click="props.expanded = !props.expanded" style="cursor: pointer"><v-icon>expand_more</v-icon></td>
                </tr>
            </template>
            <template v-slot:expand="props">
               <v-card flat>
               <v-card-text>Stats</v-card-text>
               </v-card>
            </template>
          </v-data-table>  
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: {
    position: String,
    players: Array,
    addPlayerToSquad: Function,
    removePlayerFromSquad: Function
  },
  data () {
    return {
      playerImage: '/images/blank.png',
      playerName: '',
      search: '',
      headers: [
        { text: 'Players', align: 'left', sortable: false, value: 'name'},
        { text: 'Points', value: 'points' },
        { text: 'Price', value: 'price' },
        { text: 'Team', value: 'team' }
      ],
      pagination: {'sortBy': 'points', 'descending': true}
    }
  },
  methods : {
    addPlayer(player) {
      this.playerImage = player.team.shirt
      this.playerName = player.last_name
      this.addPlayerToSquad(player)
     
    },

    removePlayer(player){
      this.playerImage = '/images/blank.png'
      this.playerName = ''
      this.removePlayerFromSquad(player)
    }
  }
}
</script>

