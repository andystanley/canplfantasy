import Vue from 'vue'
import Vuex from 'vuex'

import api from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    teams: [],
    players: [ // TODO: Remove before merging
      {
        "id": 2,
        "name": "Nathan Ingham",
        "points": 16,
        "price": "4.5",
        "position": {
            "name": "goalkeeper"
        },
        "team": {
            "name": "York 9 FC",
            "shirt": "https://s3.ca-central-1.amazonaws.com/canplfantasy/shirts/calgary.jpg"
        }
      },
      {
        "id": 1,
        "name": "Kyle Bekker",
        "points": 40,
        "price": "6.0",
        "position": {
            "name": "midfielder"
        },
        "team": {
            "name": "Forge FC",
            "shirt": "https://s3.ca-central-1.amazonaws.com/canplfantasy/shirts/calgary.jpg"
        }
      },
      {
        "id": 3,
        "name": "Ryan Telfer",
        "points": 28,
        "price": "8.0",
        "position": {
            "name": "forward"
        },
        "team": {
            "name": "York 9 FC",
            "shirt": "https://s3.ca-central-1.amazonaws.com/canplfantasy/shirts/calgary.jpg"
        }
      },
      {
        "id": 4,
        "name": "Emilio Estevez",
        "points": 4,
        "price": "4.0",
        "position": {
            "name": "forward"
        },
        "team": {
            "name": "York 9 FC",
            "shirt": "https://s3.ca-central-1.amazonaws.com/canplfantasy/shirts/calgary.jpg"
        }
      },
      {
        "id": 5,
        "name": "Gareth Wheeler",
        "points": 0,
        "price": "5.0",
        "position": {
            "name": "defender"
        },
        "team": {
            "name": "Forge FC",
            "shirt": "https://s3.ca-central-1.amazonaws.com/canplfantasy/shirts/calgary.jpg"
        }
      },
      {
        "id": 6,
        "name": "Tristan Borges",
        "points": 32,
        "price": "8.0",
        "position": {
            "name": "midfielder"
        },
        "team": {
            "name": "Forge FC",
            "shirt": "https://s3.ca-central-1.amazonaws.com/canplfantasy/shirts/calgary.jpg"
        }
      }
    ]
  },
  mutations: {
    setToken: (state, token) => {
      localStorage.setItem('token', token)
      state.token = token
    },

    removeToken: state => {
      localStorage.removeItem('token')
      state.token = ''
    },

    setTeams: (state, teams) => {
      state.teams = teams
    },

    setPlayers: (state, players) => {
      state.players = players
    }
  },
  actions: {
    login: ({ commit }, { email, password }) => {
      return api.login(email, password)
        .then(token => {
          commit('setToken', token)
        })
    },

    signup: ({ commit }, { email, password, favoriteTeam }) => {
      return api.signup(email, password, favoriteTeam)
        .then(token => {
          commit('setToken', token)
        })
    },

    logout: ({ commit }) => {
      commit('removeToken')
    },

    getTeams: ({ commit }) => {
      return api.teams()
        .then(teams => {
          commit('setTeams', teams)
        })
    },

    getPlayers: ({ commit }) => {
      return api.players()
        .then(players => {
          commit('setPlayers', players)
        })
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    
    goalkeepers: state => {
      return state.players.filter(player => 
        player.position.name == 'goalkeeper'
      )
    },

    defenders: state => {
      return state.players.filter(player => 
        player.position.name == 'defender'
      )
    },

    midfielders: state => {
      return state.players.filter(player => 
        player.position.name == 'midfielder'
      )
    },

    forwards: state => {
      return state.players.filter(player => 
        player.position.name == 'forward'
      )
    }
  }
})
