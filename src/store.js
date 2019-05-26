import Vue from 'vue'
import Vuex from 'vuex'

import api from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    teams: []
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
    }
  },
  getters: {
    isAuthenticated: state => !!state.token
  }
})
