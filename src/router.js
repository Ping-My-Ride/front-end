import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from './views/LandingPage.vue'
import DriverForm from './views/DriverForm.vue'
import RiderForm from './views/RiderForm.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage
    },
    {
      path: '/driver',
      name: 'driver',
      component: DriverForm
    },
    {
      path: '/rider',
      name: 'rider',
      component: RiderForm
    },
  ]
})
