<template>
  <div class="gameweeks">
    gameweeks
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['gameweeks'])
  },
  methods: {
    ...mapActions(['getGameweeks']),
  },
  created() {
    this.getGameweeks()
  },
}
</script>
