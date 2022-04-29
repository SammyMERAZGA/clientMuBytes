import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Dashboard from '../views/Dashboard/Dashboard.vue';
import Establishments from '../views/Establishment/Establishment.vue';
import Artworks from '../views/Artworks/Artworks.vue';
import Categories from '../views/Categories/Categories.vue';
import Customers from '../views/Customers/Customers.vue';
import Status from '../views/Status/Status.vue';
import Login from '../views/Login/Login.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/artworks',
    name: 'Artworks',
    component: Artworks
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/status',
    name: 'Status',
    component: Status
  },
  {
    path: '/customers',
    name: 'Customers',
    component: Customers
  },
  {
    path: '/establishments',
    name: 'Establishments',
    component: Establishments
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
