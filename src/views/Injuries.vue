<template>
  <v-container fluid>
    <h4 class="display-1 text-xs-left">Player Availabilty </h4>
    
    <v-layout justify-center class="my-3">
      <v-flex xs12 sm10 md8 lg6>
        <v-btn disabled>
         Injuried
        </v-btn>
    
      </v-flex>
    </v-layout>

    <v-layout justify-center  class="my-3">
      <v-flex xs12 sm10 md8 lg6>
        <v-card>
         
          <v-card-title primary-title>
            <h5 class="headline">Latest Avilabilty news</h5>
          </v-card-title>

          <v-card-actions class="pt-0">
          <v-data-table :headers="headers" :items="unavaliablePlayers" class="elevation-1" :pagination.sync="pagination">
              <template v-slot:items="props"> 
                <tr>
                    <td> 
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
                    <td>
                        <span>{{ props.item.availability.status.name }}</span>
                    </td>
                     <td>
                        <span>{{ props.item.first_name }} {{ props.item.last_name }}</span>
                    </td>
                    <td>
                        <v-img v-on="on" :src="props.item.team.shirt" style="cursor: pointer" max-width="70"></v-img>  
                    </td>
                </tr>
          </template>
          </v-data-table>
          </v-card-actions>
        </v-card>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    
    data () {
    return {
         iconColor: {
        'help': 'amber',
        'gavel': 'red',
        'report': 'red',
        'autorenew': 'grey darken-1',
        'swap_horiz': 'grey darken-1'
      },
    

      headers: [
        { text: 'Status', value: 'availability'},
        { text: 'Availability', value: 'availability.status.name'},
        { text: 'Players', value: 'last_name'},
        { text: 'Team', value: 'team.shirt'},
      ],
      pagination: {
          page: 1,
          rowsPerPage: 5,
      },
    }
  },
 computed: {
    ...mapGetters(['unavaliablePlayers']),
  },
  
}


</script>


