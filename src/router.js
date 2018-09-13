import Vue from 'vue'
import Router from 'vue-router'
import Splash from './components/Splash.vue'
import Home from './components/Home.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Splash
    },
    {
      path: '/Home',
      component: Home
    }
  ]
})
