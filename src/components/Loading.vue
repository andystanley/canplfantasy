<template>
  <v-layout justify-center>
    <v-progress-circular
      v-if="loading"
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
    <v-flex v-if="!loading">
      <p v-if="error" class="subheading text-xs-center">{{ error }}</p>
      <p v-if="errorDetail" class="caption text-xs-center">{{ errorDetail }}</p>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    error: {
      type: String,
      default: ""
    },
    errorDetail: {
      type: String,
      default: ""
    }
  }
};
</script>
