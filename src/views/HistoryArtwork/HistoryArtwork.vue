<template>
  <div>
    <v-btn color="#fd2a65" fab dark class="ml-15" to="/artworks">
      <v-icon>mdi-keyboard-return</v-icon>
    </v-btn>
    <h1 class="text-center h1-mubytes">Historique de l'oeuvre</h1>
    <v-row align="center" justify="center">
      <img
        class="mt-5"
        src="../../assets/images/UnDraw/history.png"
        alt="categories"
        width="300"
      />
    </v-row>
    <v-row
      align="center"
      justify="center"
      v-for="history in historyArtwork"
      :key="history.id"
    >
      <div class="timeline">
        <ul>
          <li>
            <span>{{ history.date }}</span>
            <div class="content">
              <h3>{{ history.name }}</h3>
              <h3>Auteur : {{ history.author }}</h3>
              <p>Ancien propriétaire : {{ history.owner }}</p>
            </div>
          </li>
        </ul>
      </div>
    </v-row>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped src="./style.css"></style>
