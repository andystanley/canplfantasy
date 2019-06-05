import axios from 'axios'

let client = axios.create({
  baseURL: 'http://127.0.0.1:8000/'
})

const handle = (error) => {
  if (error.response) {
    throw error.response.data
  } else if (error.request) {
    throw error.request
  } else {
    throw error.message
  }
}

export default {  
  setToken(token) {
    client = axios.create({
      baseURL: 'http://127.0.0.1:8000/',
      headers: {'Authorization': 'Token ' + token}
    })
  },

  login(email, password) {
    return client.post('login/', {
      username: email,
      password: password
    })
      .then(response => 
        response.data.token
      )
      .catch(error => {
        handle(error)
      })
  },

  signup(email, password, favorite_team) {
    return client.post('profile/', {
      username: email,
      password: password,
      profile: {
        favorite_team: favorite_team
      }
    })
      .then(response => 
        response.data.token
      )
      .catch(error => {
        handle(error)
      })
  },

  getTeams() {
    return client.get('team/')
      .then(response => 
        response.data
      )
      .catch(error => {
        handle(error)
      })
  },

  getPlayers() {
    return client.get('player/')
      .then(response => 
        response.data
      )
      .catch(error => {
        handle(error)
      })
  },

  getGameweeks() {
    return client.get('gameweek/')
      .then(response => 
        response.data
      )
      .catch(error => {
        handle(error)
      })
  },

  getProfile() {
    return client.get('/profile/user/')
      .then(response => 
        response.data
      )
      .catch(error => {
        handle(error)
      })
  },

  saveSquad(players) {
    return client.post('profile/squad/', {
      players: players
    })
      .catch(error => {
        handle(error)
      })
  }
}
