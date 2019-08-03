<template>
  <v-container fluid>
    <h4 class="display-1 text-xs-center">Player Availabilty </h4>


    <v-layout justify-center  class="my-3">
      <v-flex xs12 sm10 md8 lg6>
       
         
  
          <v-data-table :headers="headers" :items="unavaliablePlayers" class="elevation-1" :pagination.sync="pagination">
              <template v-slot:items="props"> 
                <tr>
                    <td>
                        <span>{{ props.item.first_name }} {{ props.item.last_name }}</span>
                    </td>
                    <td>
                        <v-img v-on="on" :src="props.item.team.shirt" style="cursor: pointer" max-width="60"></v-img>  
                    </td>
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
                        {{ props.item.availability.latest_news }}
                    </td>
                     <td>
                        {{ props.item.availability.source }}
                    </td>
                     <td>
                        {{ props.item.availability.return_date }}
                    </td>
                    <td>
                        {{ props.item.availability.last_updated }}
                    </td>
                </tr>
          </template>
          </v-data-table>
        
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
        { text: 'Players', value: 'last_name'},
        { text: 'Team', value: 'team.shirt'},
        { text: 'Status', value: 'availability'},
        { text: 'Latest News', value: 'availability.latest_news'},
        { text: 'Source', value: 'availability.source'},
        { text: 'Return Date', value: 'availability.return_date'},
         { text: 'Last Updated', value: 'availability.last_updated'},
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


