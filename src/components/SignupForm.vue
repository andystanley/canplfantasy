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
    <v-layout wrap justify-space-between>
      <v-flex xs12 md5>
        <v-text-field 
          v-model="signupForm.firstName" 
          :rules="signupRules.name"
          prepend-icon="person" 
          label="First Name" 
          type="text" 
          required>
        </v-text-field>
      </v-flex>
      <v-flex xs12 md5>
        <v-text-field 
          v-model="signupForm.lastName" 
          :rules="signupRules.name"
          prepend-icon="person" 
          label="Last Name" 
          type="text" 
          required>
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout wrap justify-space-between>
      <v-flex xs12 md5>
        <v-text-field 
          v-model="signupForm.password" 
          :rules="signupRules.password"
          prepend-icon="lock" 
          label="Password" 
          type="password" 
          required>
        </v-text-field>
      </v-flex>
      <v-flex xs12 md5>
        <v-text-field 
          v-model="signupForm.confirmPassword" 
          :rules="signupRules.confirmPassword"
          prepend-icon="lock" 
          label="Confirm Password" 
          type="password" 
          required>
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-text-field 
      v-model="signupForm.squadName" 
      :rules="signupRules.name"
      prepend-icon="people" 
      label="Squad Name" 
      type="text" 
      required>
    </v-text-field>
    <v-select 
      v-model="signupForm.favoriteTeam" 
      :rules="signupRules.favoriteTeam"
      prepend-icon="star" 
      label="Favorite Team" 
      :items="teams"
      item-text="name"
      item-value="id"
      required>
    </v-select>
    <span style="color:red;">{{ error }}</span>
    <v-layout justify-end>
      <v-btn 
        color="primary" 
        @click="signupSubmit"
        :loading="loading">
        Signup
      </v-btn>
    </v-layout>

    <v-snackbar v-model="errorPopup" :timeout="3000" color="error" class="justify-center">
      <v-layout justify-center>
        Unable to signup. Please try again
      </v-layout>
    </v-snackbar>
  </v-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      errorPopup: false,
      signupForm: {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        squadName: '',
        favoriteTeam: null,
      },
      signupRules: {
        name: [
          v => !!v || 'Name is required'
        ],
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
        
        const { email, firstName, lastName, password, squadName, favoriteTeam } = this.signupForm

        this.signup({ email, firstName, lastName, password, squadName, favoriteTeam })
          .then(() => {
            this.$router.push('/squad')
          })
          .catch(() => this.errorPopup = true)
          .then(() => this.loading = false)
      }
    }
  }
}
</script>
