import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "../plugins/store";
import Dashboard from "../views/Dashboard/Dashboard.vue";
import Establishments from "../views/Establishment/Establishment.vue";
import Artworks from "../views/Artworks/Artworks.vue";
import HistoryArtwork from "../views/HistoryArtwork/HistoryArtwork.vue";
import Categories from "../views/Categories/Categories.vue";
import Customers from "../views/Customers/Customers.vue";
import Status from "../views/Status/Status.vue";
import Login from "../views/Login/Login.vue";
import Error from "../views/404Error/404Error.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter(to, from, next) {
      if (store.state.isLog === true) {
        next();
      } else {
        next("/:pathMatch(.*)*");
      }
    },
  },
  {
    path: "/artworks",
    name: "Artworks",
    component: Artworks,
    beforeEnter(to, from, next) {
      if (store.state.isLog === true) {
        next();
      } else {
        next("/:pathMatch(.*)*");
      }
    },
  },
  {
    path: "/categories",
    name: "Categories",
    component: Categories,
    beforeEnter(to, from, next) {
      if (store.state.isLog === true) {
        next();
      } else {
        next("/:pathMatch(.*)*");
      }
    },
  },
  {
    path: "/status",
    name: "Status",
    component: Status,
    beforeEnter(to, from, next) {
      if (store.state.isLog === true) {
        next();
      } else {
        next("/:pathMatch(.*)*");
      }
    },
  },
  {
    path: "/customers",
    name: "Customers",
    component: Customers,
    beforeEnter(to, from, next) {
      if (store.state.isLog === true && store.state.role_id === 2) {
        next();
      } else {
        next("/:pathMatch(.*)*");
      }
    },
  },
  {
    path: "/establishments",
    name: "Establishments",
    component: Establishments,
    beforeEnter(to, from, next) {
      if (store.state.isLog === true) {
        next();
      } else {
        next("/:pathMatch(.*)*");
      }
    },
  },
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/history/:id",
    name: "HistoryArtwork",
    component: HistoryArtwork,
  },
  // {
  //   path: "/history/:id",
  //   name: "HistoryArtwork",
  //   component: HistoryArtwork,
  //   props: true,
  //   beforeEnter(to, from, next) {
  //     if (store.state.isLog === true) {
  //       next();
  //     } else {
  //       next("/:pathMatch(.*)*");
  //     }
  //   },
  // },
  {
    path: "/:pathMatch(.*)*",
    name: "Error",
    component: Error,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
