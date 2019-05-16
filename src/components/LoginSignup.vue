<template>
  <v-dialog max-width="600px">
      <v-btn flat slot="activator" class="primary">
        Login / Signup
      </v-btn>
      <v-card>
        <v-card-title>
          <h2><a @click="loginActive = true" class="mr-1">Login</a> / <a @click="loginActive = false" class="ml-1">Signup</a></h2>
        </v-card-title>
        <v-card-text >
          <v-form v-if="loginActive" ref="loginForm" class="px-3" >
            <v-text-field 
              v-model="username" 
              prepend-icon="person" 
              label="Email" 
              type="text" 
              required>
            </v-text-field>
            <v-text-field 
              v-model="password" 
              prepend-icon="lock" 
              label="Password" 
              type="password" 
              required>
            </v-text-field>
          </v-form>
          <v-form v-if="!loginActive" class="px-3" ref="signupForm">
            <v-text-field 
              prepend-icon="person" 
              name="email" 
              label="Email" 
              type="text" 
              required>
            </v-text-field>
            <v-text-field 
              prepend-icon="lock" 
              label="Password" 
              type="password" 
              required>
            </v-text-field>
            <v-select 
              prepend-icon="group" 
              label="Favorite Team" 
              :items="teams"
              required>
            </v-select>
            <v-checkbox 
              label="I'm ready to play CPL Fantasy!" 
              required>
            </v-checkbox>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            color="primary" 
            @click="loginActive ? loginSubmit() : signupSubmit()"
            :loading="loading">
            {{ loginActive ? "Login" : "Signup"}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      loginActive: true,
      loading: false,
      username: '',
      password: '',
      teams: ['Valour FC', 'Forge FC']
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    loginSubmit() {
      if (this.$refs.loginForm.validate()) {
        this.loading = true
        const form = new FormData()

        form.append('username', this.username)
        form.append('password', this.password)
        
        this.login(form)
          .catch((error) => console.log(error))


        this.loading = false
      }
    },
    signupSubmit() {

    }
  }
}
</script>
