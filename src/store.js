import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    saveToken: (state, token) => {
      localStorage.setItem('token', token)
      state.token = token
    },
    removeToken: (state) => {
      localStorage.removeItem('token')
      state.token = ''
    }
  },
  actions: {
    login: ({ commit }, form) => {
      return new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:8000/login/', {
          method: 'POST',
          body: form
        })
          .then((response) => {
            if (!response.ok) {
              throw Error(response.json())
            }
            return response.json()
          })
          .then((json) => {
            commit('saveToken', json['token'])
            resolve()
          })
          .catch(error => reject(error))
      })
    },
    logout: ({ commit }) => commit('removeToken')
  },
  getters: {
    isAuthenticated: state => !!state.token
  }
})
