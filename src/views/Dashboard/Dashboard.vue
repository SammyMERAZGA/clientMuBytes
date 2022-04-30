<template>
  <div>
    <v-row align="center" justify="center">
      <img
        src="../../assets/images/Logo/mubytesText.png"
        alt="Mubytes"
        width="250"
      />
    </v-row>
    <v-container>
      <v-row>
        <v-col class="mt-10 ml-10">
          <v-card class="rounded-lg" elevation="10" width="500" height="350">
            <v-list-item>
              <v-list-item-content>
                <div class="overline text-center">
                  Nombre d'oeuvres par catégorie
                </div>
                <div><v-divider class="mb-4"></v-divider></div>
              </v-list-item-content>
            </v-list-item>
            <v-row align="center" justify="center">
              <apexchart
                width="400px"
                type="pie"
                :options="chart1Options"
                :series="chart1"
              ></apexchart>
            </v-row>
          </v-card>
          <v-card
            class="rounded-lg mt-5"
            elevation="10"
            width="500"
            height="350"
          >
            <v-list-item>
              <v-list-item-content>
                <div class="overline text-center">Diagramme 3</div>
                <div><v-divider class="mb-4"></v-divider></div>
              </v-list-item-content>
            </v-list-item>
            <apexchart
              width="420px"
              type="pie"
              :options="chart3Options"
              :series="chart3"
            ></apexchart>
          </v-card>
        </v-col>
        <v-col class="mt-10 ml-5">
          <v-card class="rounded-lg" elevation="10" width="500" height="350">
            <v-list-item>
              <v-list-item-content>
                <div class="overline text-center">Diagramme 2</div>
                <div><v-divider class="mb-4"></v-divider></div>
              </v-list-item-content>
            </v-list-item>
            <apexchart
              width="420px"
              type="pie"
              :options="chart2Options"
              :series="chart2"
            ></apexchart>
          </v-card>
          <v-card
            class="rounded-lg mt-5"
            elevation="10"
            width="500"
            height="350"
          >
            <v-list-item>
              <v-list-item-content>
                <div class="overline text-center">Diagramme 4</div>
                <div><v-divider class="mb-4"></v-divider></div>
              </v-list-item-content>
            </v-list-item>
            <apexchart
              width="420px"
              type="pie"
              :options="chart4Options"
              :series="chart4"
            ></apexchart>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style src="./style.css"></style>
