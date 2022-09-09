import { Store } from "vuex";
import createdPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

const store = new Store({
  plugins: [
    createdPersistedState({
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) =>
        Cookies.set(key, state, { expires: 3, secure: true }),
    }),
  ],
});
