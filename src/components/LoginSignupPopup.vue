<template>
  <v-dialog max-width="600px">
    <v-btn slot="activator" flat class="primary">Login / Signup</v-btn>
    <v-card>
      <v-card-title>
        <h2>
          <a class="mr-1" @click="loginActive = true">Login</a> /
          <a class="ml-1" @click="loginActive = false">Signup</a>
        </h2>
      </v-card-title>
      <v-card-text>
        <LoginForm v-if="loginActive" class="px-3" />
        <SignupForm v-if="!loginActive" class="px-3" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";

export default {
  components: {
    LoginForm,
    SignupForm
  },
  data() {
    return {
      loginActive: true
    };
  }
};
</script>
