import Vue from 'vue'
import Vuex from 'vuex'

import api from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    profile: null,
    teams: [],
    players: [],
    gameweeks: [],
    leagues: []
  },
  mutations: {
    setToken(state, token) {
      localStorage.setItem('token', token)
      state.token = token
    },

    removeToken(state) {
      localStorage.removeItem('token')
      state.token = ''
    },

    setTeams(state, teams) {
      state.teams = teams
    },

    setPlayers(state, players) {
      state.players = players
    },

    setGameweeks(state, gameweeks) {
      state.gameweeks = gameweeks
    },

    setLeagues(state, leagues) {
      state.leagues = leagues.sort((a, b) => b.profiles_count - a.profiles_count)
    },

    setProfile(state, profile) {
      state.profile = profile
    },
  },
  actions: {
    login({ commit }, { email, password }) {
      return api.login(email, password)
        .then(token => {
          commit('setToken', token)
        })
    },

    signup({ commit }, { email, firstName, lastName, password, squadName, favoriteTeam }) {
      return api.signup(email, firstName, lastName, password, squadName, favoriteTeam)
        .then(token => {
          commit('setToken', token)
        })
    },

    logout({ commit }) {
      commit('removeToken')
    },

    getTeams({ commit }) {
      return api.getTeams()
        .then(teams => {
          commit('setTeams', teams)
        })
    },

    getPlayers({ commit }) {
      return api.getPlayers()
        .then(players => {
          commit('setPlayers', players)
        })
    },

    getGameweeks({ commit }) {
      return api.getGameweeks()
        .then(gameweeks => {
          commit('setGameweeks', gameweeks)
        })
    },

    getLeagues({ commit }) {
      return api.getLeagues()
        .then(leagues => {
          commit('setLeagues', leagues)
        })
    },

    getProfile({ commit }) {
      api.setToken(this.state.token)
      return api.getProfile()
        .then(profile => {
          commit('setProfile', profile)
        })
    },

    saveSquad({ dispatch }, { players }) {
      api.setToken(this.state.token)
      return api.saveSquad(players).then(() => {
        dispatch('getProfile')
      })
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token
    },

    activeGameweek(state) {
      return state.gameweeks.find(gameweek => 
        gameweek.is_active === true
      )
    },

    nextGameweek(state) {
      return state.gameweeks.find(gameweek => 
        gameweek.is_next === true
      )
    },
    
    goalkeepers(state) {
      return state.players.filter(player => 
        player.position.short_name === 'GK'
      )
    },

    defenders(state) {
      return state.players.filter(player => 
        player.position.short_name == 'DEF'
      )
    },

    midfielders(state) {
      return state.players.filter(player => 
        player.position.short_name === 'MID'
      )
    },

    forwards(state) {
      return state.players.filter(player => 
        player.position.short_name === 'FW'
      )
    }
  }
})
