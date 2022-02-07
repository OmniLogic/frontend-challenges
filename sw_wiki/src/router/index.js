import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/planetas',
    name: 'Planetas',
    component: () => import('../views/Planetas.vue')
  },
  {
    path: '/naves',
    name: 'Naves',
    component: () => import('../views/Naves.vue')
  },
  {
    path: '/veiculos',
    name: 'Veiculos',
    component: () => import('../views/Veiculos.vue')
  },
  {
    path: '/pessoas',
    name: 'Pessoas',
    component: () => import('../views/Pessoas.vue')
  },
  {
    path: '/filmes',
    name: 'Filmes',
    component: () => import('../views/Filmes.vue')
  },
  {
    path: '/especies',
    name: 'Especies',
    component: () => import('../views/Especies.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
