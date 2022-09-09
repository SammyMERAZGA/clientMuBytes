import vue from "vue";
import Vuex from "vuex";
import createdPersistedState from "vuex-persistedstate";

vue.use(Vuex);

/* eslint-disable */

export default new Vuex.Store({
  plugins: [
    createdPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {
    isLog: false,
    isSuperAdmin: false,
    lastname: "",
    firstname: "",
    role_id: 0,
  },
  mutations: {
    nowLog: function (state, { val }) {
      state.isLog = val;
    },
    lastnameCustomer: function (state, { val }) {
      state.lastname = val;
    },
    firstnameCustomer: function (state, { val }) {
      state.firstname = val;
    },
    roleIdCustomer: function (state, { val }) {
      state.role_id = val;
    },
    superAdmin: function (state, { val }) {
      state.isSuperAdmin = val;
    },
  },
});
