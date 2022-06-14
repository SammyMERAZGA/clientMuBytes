<template>
  <div>
    <v-row align="center" justify="center">
      <img
        src="../../assets/images/logo/mubytesText.png"
        alt="Mubytes"
        width="250"
      />
    </v-row>
    <v-container>
      <v-row class="mt-10">
        <!-- COL 1 -->
        <v-col align="center" justify="center" class="mt-10">
          <!-- CARD TOP LEFT -->
          <v-card class="rounded-lg" elevation="10" width="500" height="350">
            <v-list-item>
              <v-list-item-content>
                <div class="overline text-center indigo--text">
                  Nombre d'oeuvres par catégorie
                </div>
                <div><v-divider class="mb-4"></v-divider></div>
              </v-list-item-content>
            </v-list-item>
            <v-row align="center" justify="center">
              <apexchart
                width="400px"
                type="pie"
                :options="artworkByCategoryOptions"
                :series="nbArtworksByCategory"
              ></apexchart>
            </v-row>
          </v-card>
          <!-- CARD BOTTOM LEFT -->
          <v-card
            class="rounded-lg mt-10"
            elevation="10"
            width="500"
            height="350"
          >
            <v-list-item>
              <v-list-item-content>
                <div class="overline text-center indigo--text">
                  Nombre d'oeuvres par mois
                </div>
                <div><v-divider class="mb-4"></v-divider></div>
              </v-list-item-content>
            </v-list-item>
            <v-row align="center" justify="center">
              <apexchart
                width="400px"
                type="area"
                :options="nbArtworkByMonthsOptions"
                :series="nbArtworkByMonths"
              ></apexchart>
            </v-row>
          </v-card>
        </v-col>
        <!-- COL 2 -->
        <v-col align="center" justify="center" class="mt-10">
          <!-- CARD TOP RIGHT -->
          <v-card class="rounded-lg" elevation="10" width="500" height="350">
            <v-list-item>
              <v-list-item-content>
                <div class="overline text-center indigo--text">
                  Nombre d'oeuvres par statut
                </div>
                <div><v-divider class="mb-5"></v-divider></div>
              </v-list-item-content>
            </v-list-item>
            <v-row align="center" justify="center">
              <apexchart
                width="400px"
                type="bar"
                :options="nbArtworkByStatusOptions"
                :series="nbArtworkByStatus"
              ></apexchart>
            </v-row>
          </v-card>
          <!-- CARD BOTTOM RIGHT -->
          <v-card
            class="rounded-lg mt-10"
            elevation="10"
            width="500"
            height="350"
          >
            <v-list-item>
              <v-list-item-content>
                <div class="overline indigo--text">Statistiques globales</div>
                <div><v-divider></v-divider></div>
                <div class="pa-15 align">
                  <h3 class="indigo--text mb-5">
                    Nombre d'oeuvres enregistrées : 23
                  </h3>
                  <h3 class="pink--text mb-5">Nombre d'établissement : 6</h3>
                  <h3 class="indigo--text mb-5">Nombre de catégories : 7</h3>
                  <h3 class="pink--text">Nombre d'utilisateurs : 16</h3>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style src="./style.css"></style>
