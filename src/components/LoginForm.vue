<template>
  <v-form ref="loginForm">
    <v-text-field 
        v-model="loginForm.email" 
        :rules="loginRules.email"
        prepend-icon="email" 
        label="Email" 
        type="text" 
        required>
    </v-text-field>
    <v-text-field 
        v-model="loginForm.password" 
        :rules="loginRules.password"
        prepend-icon="lock" 
        label="Password" 
        type="password" 
        required>
    </v-text-field>
    <span style="color:red;">{{ error }}</span>
    <v-layout justify-end>
      <v-btn 
        color="primary" 
        @click="loginSubmit"
        :loading="loading">
        Login
      </v-btn>
    </v-layout>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      error: '',
      loginForm: {
        email: '',
        password: ''
      },
      loginRules: {
        email: [
          v => !!v || 'Email is required',
          v => /.+@.+/.test(v) || 'Email must be valid'
        ],
        password: [
          v => !!v || 'Password is required'
        ]
      },
    }
  },
  methods: {
    ...mapActions([
      'login',
    ]),
    loginSubmit() {
      if (this.$refs.loginForm.validate()) {
        this.loading = true
        
        const { email, password } = this.loginForm

        this.login({ email, password })
          .catch(() => this.error = 'Unable to login') // Update this to use a better error message

        this.loading = false
      }
    }
  }
}
</script>
