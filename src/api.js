import axios from 'axios'

const url = 'http://127.0.0.1:8000/'

// const config = {
//   headers: {'Authorization': 'Token ' + 'd04ecda3672daa522fc4d2d0ad4c59cce6d8a9f5'}
// }

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
  login(email, password) {
    return axios.post(url + 'login/', {
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
    return axios.post(url + 'profile/', {
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

  teams() {
    return axios.get(url + 'team/')
      .then(response => 
        response.data
      )
      .catch(error => {
        handle(error)
      })
  }
}
