<template>
  <div>
    <h1 class="text-center h1-mubytes">Liste des établissements</h1>
    <v-row align="center" justify="center">
      <img
        class="mt-5"
        src="../../assets/images/UnDraw/establishment.png"
        alt="categories"
        width="300"
      />
    </v-row>
    <v-row align="center" justify="center">
      <h1 class="overline indigo--text text-center mt-8">
        Ajouter un établissement
      </h1>
      <v-col cols="12">
        <v-btn
          id="btnAddEstablishment"
          class="rounded-xl mt-2"
          color="blue darken-4"
          dark
        >
          <v-icon>mdi-domain-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style src="./style.css"></style>
