<template>
  <div>
    <h1 class="text-center">Liste des oeuvres</h1>
    <v-row align="center" justify="center">
      <img
        class="mt-5"
        src="../../assets/images/UnDraw/artwork.png"
        alt="categories"
        width="300"
      />
    </v-row>
    <v-divider class="ml-15 mr-15 mt-5"></v-divider>
    <v-row>
      <v-col cols="12" md="3">
        <v-card
          class="elevation-5 rounded-xl ml-10 mt-10 mr-5"
          height="400"
          width="400"
        >
          <v-row>
            <v-card-text class="text-center">
              <h1 class="overline indigo--text mb-3">Lorem Ipsum</h1>
              <img
                class="rounded-xl"
                id="artworkPic"
                height="250"
                width="300"
                src="https://24.media.tumblr.com/tumblr_m6tua7TFB81qfwde8o1_500.gif"
              />

              <v-row justify="center" class="mt-5 mb-2">
                <v-btn
                  icon
                  large
                  outlined
                  color="#fd2a65"
                  v-bind="attrs"
                  v-on="on"
                  @click="idArtwork = idArtwork.id"
                >
                  <v-icon color="#fd2a65"> mdi-clipboard-text-clock </v-icon>
                </v-btn>
                <v-dialog
                  v-if="idArtwork == idArtwork.id"
                  v-model="dialog"
                  persistent
                  width="600px"
                >
                  <v-card>
                    <v-card-title class="justify-center text-center">
                      <span class="text-h5">Artwork Name</span>
                    </v-card-title>
                    <v-card-text>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Sapiente, voluptatibus?
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" text @click="idArtwork = 0">
                        Retour
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-btn
                  class="ml-10"
                  icon
                  large
                  outlined
                  color="#353E8D"
                  v-bind="attrs"
                  v-on="on"
                  @click="idArtwork = idArtwork.id"
                >
                  <v-icon color="#353E8D"> mdi-pencil </v-icon>
                </v-btn>
                <v-btn
                  class="ml-10"
                  icon
                  large
                  outlined
                  color="#fd2a65"
                  v-bind="attrs"
                  v-on="on"
                  @click="idArtwork = idArtwork.id"
                >
                  <v-icon color="#fd2a65"> mdi-delete </v-icon>
                </v-btn>
              </v-row>
            </v-card-text>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style src="./style.css"></style>
