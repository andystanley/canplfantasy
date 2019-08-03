import axios from "axios";

let client = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

const handle = error => {
  if (error.response) {
    throw error.response.data;
  } else if (error.request) {
    throw error.request;
  } else {
    throw error.message;
  }
};

export default {
  setToken(token) {
    client = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
      headers: { Authorization: "Token " + token }
    });
  },

  login(email, password) {
    return client
      .post("login/", {
        username: email,
        password: password
      })
      .then(response => response.data.token)
      .catch(error => {
        handle(error);
      });
  },

  signup(email, first_name, last_name, password, squad_name, favorite_team) {
    return client
      .post("profile/", {
        username: email,
        first_name: first_name,
        last_name: last_name,
        password: password,
        profile: {
          favorite_team: favorite_team,
          squad_name: squad_name
        }
      })
      .then(response => response.data.token)
      .catch(error => {
        handle(error);
      });
  },

  getTeams() {
    return client
      .get("team/")
      .then(response => response.data)
      .catch(error => {
        handle(error);
      });
  },

  getPlayers() {
    return client
      .get("player/")
      .then(response => response.data)
      .catch(error => {
        handle(error);
      });
  },

  getGameweeks() {
    return client
      .get("gameweek/")
      .then(response => response.data)
      .catch(error => {
        handle(error);
      });
  },

  getLeagues() {
    return client
      .get("league/")
      .then(response => response.data)
      .catch(error => {
        handle(error);
      });
  },

  getLeague(id) {
    return client
      .get(`league/${id}/`)
      .then(response => response.data)
      .catch(error => {
        handle(error);
      });
  },

  getProfile() {
    return client
      .get("profile/user/")
      .then(response => response.data)
      .catch(error => {
        handle(error);
      });
  },

  getProfileById(id) {
    return client
      .get(`profile/${id}/`)
      .then(response => response.data)
      .catch(error => {
        handle(error);
      });
  },

  saveSquad(players) {
    return client
      .post("profile/squad/", {
        players: players
      })
      .catch(error => {
        handle(error);
      });
  }
};
