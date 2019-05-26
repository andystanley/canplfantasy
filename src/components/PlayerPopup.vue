<template>
    <v-dialog max-width="600">

          <template v-slot:activator="{ on }">
            <v-img v-on="on" src="/blank.png" style="cursor: pointer"></v-img>
        </template>
        <v-card>
            <v-card-title>
            <h2>Add new {{ position }} </h2> 
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
            </v-card-title>
            <v-card-text>
         <v-data-table :headers="headers" :items="players" class="elevation-1" :search="search">
            <template v-slot:items="props">
                <td  style="cursor: pointer">{{ props.item.name }} <br> <h5 class="red">{{ props.item.team }}</h5></td>
                <td >{{ props.item.price.toFixed(1) }}</td>
                <td >{{ props.item.points }}</td>
                <td >{{ props.item.team }}</td>
            </template>
     <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
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
      
    },
   data () {
      return {
        search: '',
        headers: [
          {
            text: 'Players',
            align: 'left',
            sortable: false,
            value: 'name',
            

          },
          { text: 'Price', value: 'price'  },
          { text: 'Total Score', value: 'points' },
          { text: 'Team', value: 'team' },
          
        ]
        
      }
      
    
    
}
}
</script>

