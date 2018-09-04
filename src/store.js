import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    routes: []
  },
  mutations: {
    login(state, userName) {
      state.userName = userName;
    },
    logout(state) {
      state.userName = "";
    },
    setRoutes(state, routes) {
      state.routes + routes;
    }
  },
  actions: {
    login(context, userName) {
      context.commit('login', userName)
    },
    logout(context) {
      context.commit('logout')
    },
    setRoutes(context, routes) {
      context.commit('setRoutes', routes)
    }
  }
})
