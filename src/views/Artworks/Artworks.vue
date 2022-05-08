<template>
  <div>
    <h1 class="text-center h1-mubytes">Liste des oeuvres</h1>
    <v-row align="center" justify="center">
      <img
        class="mt-5"
        src="../../assets/images/UnDraw/artwork.png"
        alt="categories"
        width="300"
      />
    </v-row>
    <!-- Artwork Dialog -->
    <v-row align="center" justify="center">
      <v-col cols="12">
        <h1 class="overline indigo--text text-center mt-5">
          Ajouter une oeuvre
        </h1>
        <v-dialog
          class="mb-15"
          v-model="addArtworkDialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              id="btnAddArtwork"
              class="rounded-xl mt-5"
              color="blue darken-4"
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-image-plus</v-icon>
            </v-btn>
          </template>
          <v-card class="rounded-xl">
            <v-card-title>
              <v-row align="center" justify="center">
                <span class="text-h5 indigo--text mt-5"
                  >Ajouter une oeuvre</span
                >
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="name"
                      label="Nom de l'oeuvre"
                      placeholder="Entrer le nom de l'oeuvre"
                      prepend-icon="mdi-palette-advanced"
                      color="#fd2a65"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="author"
                      label="Auteur de l'oeuvre"
                      placeholder="Entrer l'auteur de l'oeuvre"
                      prepend-icon="mdi-account-school"
                      color="#fd2a65"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12">
                    <v-select
                      :items="status"
                      label="Statut de l'oeuvre"
                      prepend-icon="mdi-list-status"
                      color="#fd2a65"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      filled
                      v-model="description"
                      label="Description de l'oeuvre"
                      color="#fd2a65"
                      prepend-icon="mdi-script-text-outline"
                      hint="Décrivez l'oeuvre de façon détaillée"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-file-input
                      class="mr-5"
                      :rules="rulesPicture"
                      accept="image/png, image/jpeg, image/bmp"
                      placeholder="Entrer l'image de l'oeuvre"
                      prepend-icon="mdi-camera"
                      label="Image de l'oeuvre"
                      v-model="picture"
                      color="#fd2a65"
                    ></v-file-input>
                  </v-col>
                  <v-row align="center" justify="center" class="mt-2">
                    <v-col cols="12" sm="6" md="5">
                      <v-menu
                        v-model="calendarArtworkAdded"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="dateAdded"
                            label="Date de l'ajout"
                            prepend-icon="mdi-calendar-plus"
                            v-bind="attrs"
                            v-on="on"
                            color="#fd2a65"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="dateAdded"
                          @input="calendarArtworkAdded = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="5">
                      <v-menu
                        v-model="calendarArtworkCreated"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="dateCreation"
                            label="Date de la création"
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                            color="#fd2a65"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="dateCreation"
                          @input="calendarArtworkCreated = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="5">
                      <v-menu
                        v-model="calendarArtworkLoaned"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="dateOfLoan"
                            label="Date du prêt"
                            prepend-icon="mdi-calendar-clock"
                            v-bind="attrs"
                            v-on="on"
                            color="#fd2a65"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="dateOfLoan"
                          @input="calendarArtworkLoaned = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="rounded-xl"
                color="red"
                text
                @click="addArtworkDialog = false"
              >
                Annuler
              </v-btn>
              <v-btn
                class="rounded-xl"
                color="indigo"
                text
                @click="
                  addArtworkDialog = false;
                  snackbarAddArtwork = true;
                "
              >
                Ajouter
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <!-- Artwork Card -->
    <v-row>
      <v-col cols="12" md="4" v-for="artwork in artworks" :key="artwork.id">
        <v-card
          class="elevation-5 rounded-xl ml-10 mt-10"
          height="400"
          width="400"
        >
          <v-row>
            <v-card-text class="text-center">
              <h1 class="overline indigo--text mb-3">{{ artwork.name }}</h1>
              <img
                class="rounded-xl"
                id="artworkPic"
                height="250"
                width="300"
                :src="artwork.picture"
              />

              <v-row justify="center" class="mt-5 mb-2">
                <v-tooltip left color="#fd2a65">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      large
                      outlined
                      color="#fd2a65"
                      to="/history"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon color="#fd2a65">
                        mdi-clipboard-text-clock
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Consulter l'historique</span>
                </v-tooltip>
                <v-btn
                  class="ml-10"
                  icon
                  large
                  outlined
                  color="#353E8D"
                  v-bind="attrs"
                  v-on="on"
                  @click="idArtwork = artwork.id"
                >
                  <v-icon color="#353E8D"> mdi-pencil </v-icon>
                </v-btn>
                <v-dialog
                  v-if="idArtwork == artwork.id"
                  v-model="dialogArtwork"
                  persistent
                  width="600px"
                >
                  <v-card class="rounded-xl">
                    <v-card-title>
                      <v-row align="center" justify="center">
                        <span class="text-h5 indigo--text mt-5"
                          >Modifier une oeuvre</span
                        >
                      </v-row>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="name"
                              label="Nom de l'oeuvre"
                              placeholder="Entrer le nom de l'oeuvre"
                              prepend-icon="mdi-palette-advanced"
                              color="#fd2a65"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model="author"
                              label="Auteur de l'oeuvre"
                              placeholder="Entrer l'auteur de l'oeuvre"
                              prepend-icon="mdi-account-school"
                              color="#fd2a65"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col class="d-flex" cols="12">
                            <v-select
                              :items="status"
                              label="Statut de l'oeuvre"
                              prepend-icon="mdi-list-status"
                              color="#fd2a65"
                              required
                            ></v-select>
                          </v-col>
                          <v-col cols="12">
                            <v-textarea
                              filled
                              v-model="description"
                              label="Description de l'oeuvre"
                              color="#fd2a65"
                              prepend-icon="mdi-script-text-outline"
                              hint="Décrivez l'oeuvre de façon détaillée"
                            ></v-textarea>
                          </v-col>
                          <v-col cols="12">
                            <v-file-input
                              class="mr-5"
                              :rules="rulesPicture"
                              accept="image/png, image/jpeg, image/bmp"
                              placeholder="Entrer l'image de l'oeuvre"
                              prepend-icon="mdi-camera"
                              label="Image de l'oeuvre"
                              v-model="picture"
                              color="#fd2a65"
                            ></v-file-input>
                          </v-col>
                          <v-row align="center" justify="center" class="mt-2">
                            <v-col cols="12" sm="6" md="5">
                              <v-menu
                                v-model="calendarArtworkAdded2"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="dateAdded"
                                    label="Date de l'ajout"
                                    prepend-icon="mdi-calendar-plus"
                                    v-bind="attrs"
                                    v-on="on"
                                    color="#fd2a65"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="dateAdded"
                                  @input="calendarArtworkAdded2 = false"
                                ></v-date-picker>
                              </v-menu>
                            </v-col>
                            <v-col cols="12" sm="6" md="5">
                              <v-menu
                                v-model="calendarArtworkCreated2"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="dateCreation"
                                    label="Date de la création"
                                    prepend-icon="mdi-calendar"
                                    v-bind="attrs"
                                    v-on="on"
                                    color="#fd2a65"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="dateCreation"
                                  @input="calendarArtworkCreated2 = false"
                                ></v-date-picker>
                              </v-menu>
                            </v-col>
                            <v-col cols="12" sm="6" md="5">
                              <v-menu
                                v-model="calendarArtworkLoaned2"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="dateOfLoan"
                                    label="Date du prêt"
                                    prepend-icon="mdi-calendar-clock"
                                    v-bind="attrs"
                                    v-on="on"
                                    color="#fd2a65"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="dateOfLoan"
                                  @input="calendarArtworkLoaned2 = false"
                                ></v-date-picker>
                              </v-menu>
                            </v-col>
                          </v-row>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        class="rounded-xl"
                        color="red"
                        text
                        @click="dialogArtwork = false"
                      >
                        Annuler
                      </v-btn>
                      <v-btn
                        class="rounded-xl"
                        color="indigo"
                        text
                        @click="
                          dialogArtwork = false;
                          snackbarUpdateArtwork = true;
                        "
                      >
                        Modifier
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-btn
                  class="ml-10"
                  icon
                  large
                  outlined
                  color="#fd2a65"
                  @click="snackbarDeleteArtwork = true"
                >
                  <v-icon color="#fd2a65"> mdi-delete </v-icon>
                </v-btn>
              </v-row>
            </v-card-text>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center mt-15">
      <v-pagination
        color="#fd2a65"
        v-model="page"
        :length="4"
        circle
      ></v-pagination>
    </div>
    <!-- SNACKBAR -->
    <!-- Add artwork -->
    <v-snackbar color="green" v-model="snackbarAddArtwork"
      >Votre oeuvre a bien été ajoutée !
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarAddArtwork = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Update artwork -->
    <v-snackbar color="green" v-model="snackbarUpdateArtwork"
      >Votre oeuvre a bien été modifiée !
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarUpdateArtwork = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Delete artwork -->
    <v-snackbar color="red" v-model="snackbarDeleteArtwork"
      >Cette oeuvre a bien été supprimée.
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarDeleteArtwork = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style src="./style.css"></style>
