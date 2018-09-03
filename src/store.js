import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: ''
  },
  mutations: {
    login(state, userName) {
      state.userName = userName;
    },
    logout(state) {
      state.userName = "";
    }
  },
  actions: {
    login(context, userName) {
      context.commit('login', userName)
    },
    logout(context) {
      context.commit('logout')
    }
  }
})
