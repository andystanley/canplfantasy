<template>
  <v-form ref="signupForm">
    <v-text-field 
      v-model="signupForm.email" 
      :rules="signupRules.email"
      prepend-icon="email" 
      label="Email" 
      type="text" 
      required>
    </v-text-field>
    <v-text-field 
      v-model="signupForm.password" 
      :rules="signupRules.password"
      prepend-icon="lock" 
      label="Password" 
      type="password" 
      required>
    </v-text-field>
    <v-text-field 
      v-model="signupForm.confirmPassword" 
      :rules="signupRules.confirmPassword"
      prepend-icon="lock" 
      label="Confirm Password" 
      type="password" 
      required>
    </v-text-field>
    <v-select 
      v-model="signupForm.favoriteTeam" 
      :rules="signupRules.favoriteTeam"
      prepend-icon="group" 
      label="Favorite Team" 
      :items="teams"
      item-text="name"
      item-value="id"
      required>
    </v-select>
    <v-checkbox label="I'm ready to play CPL Fantasy!"></v-checkbox>
    <span style="color:red;">{{ error }}</span>
    <v-layout justify-end>
      <v-btn 
        color="primary" 
        @click="signupSubmit"
        :loading="loading">
        Signup
      </v-btn>
    </v-layout>
  </v-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      error: '',
      signupForm: {
        email: '',
        password: '',
        confirmPassword: '',
        favoriteTeam: null,
      },
      signupRules: {
        email: [
          v => !!v || 'Email is required',
          v => /.+@.+/.test(v) || 'Email must be valid'
        ],
        password: [
          v => !!v || 'Password is required',
          v => v.length >= 8 || 'Password must be at least 8 characters'
        ],
        confirmPassword: [
          v => !!v || 'Confirm Password is required',
          v => v == this.signupForm.password || 'Passwords must match'
        ],
        favoriteTeam: [
          v => !!v || 'Favorite Team is required',
        ]
      }
    }
  },
  computed: {
    ...mapState(['teams'])
  },
  methods: {
    ...mapActions([
      'signup'
    ]),
    signupSubmit() {
      if (this.$refs.signupForm.validate()) {
        this.loading = true
        
        const { email, password, favoriteTeam } = this.signupForm

        this.signup({ email, password, favoriteTeam })
          .catch(() => this.error = 'Unable to signup') // Update this to use a better error message

        this.loading = false
      }
    }
  }
}
</script>
