<template>
  <v-app :style="{ background: $vuetify.theme.themes.dark.background }">
    <Sidebar />
    <Navbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Sidebar from "./components/Sidebar/Sidebar.vue";
import Navbar from "./components/Navbar/Navbar.vue";

@Component({
  components: {
    Sidebar,
    Navbar
  },
})
export default class App extends Vue {}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");
#app {
  font-family: "Poppins", sans-serif;
}
</style>