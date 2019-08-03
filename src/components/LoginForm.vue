<template>
  <v-form ref="loginForm">
    <v-text-field
      v-model="loginForm.email"
      :rules="loginRules.email"
      prepend-icon="email"
      label="Email"
      type="text"
      required
    >
    </v-text-field>
    <v-text-field
      v-model="loginForm.password"
      :rules="loginRules.password"
      prepend-icon="lock"
      label="Password"
      type="password"
      required
    >
    </v-text-field>
    <v-layout justify-end>
      <v-btn color="primary" :loading="loading" @click="loginSubmit">
        Login
      </v-btn>
    </v-layout>

    <v-snackbar
      v-model="errorPopup"
      :timeout="3000"
      color="error"
      class="justify-center"
    >
      <v-layout justify-center>
        Unable to login. Please try again
      </v-layout>
    </v-snackbar>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false,
      errorPopup: false,
      loginForm: {
        email: "",
        password: ""
      },
      loginRules: {
        email: [
          v => !!v || "Email is required",
          v => /.+@.+/.test(v) || "Email must be valid"
        ],
        password: [v => !!v || "Password is required"]
      }
    };
  },
  methods: {
    ...mapActions(["login"]),

    loginSubmit() {
      if (this.$refs.loginForm.validate()) {
        this.loading = true;

        let { email, password } = this.loginForm;

        email = email.toLowerCase();

        this.login({ email, password })
          .catch(() => (this.errorPopup = true))
          .then(() => (this.loading = false));
      }
    }
  }
};
</script>
