import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#3f51b5',
    secondary: '#00bcd4',
    accent: '#8bc34a',
    error: '#ff5722',
    warning: '#ffeb3b',
    info: '#607d8b',
    success: '#4caf50'
  }
})
