<template>
  <v-app-bar app color="white" flat>
    <v-spacer></v-spacer>
    <span v-if="$store.state.isLog === true" id="username"
      >Bonjour {{ getFirstname() + " " + getLastname() }}</span
    >
  </v-app-bar>
</template>

<script lang="ts" src="./index.ts"></script>
<style src="./style.css"></style>
