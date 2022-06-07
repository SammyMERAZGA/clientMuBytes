<template>
  <v-container>
    <v-overlay :value="overlay">
      <v-progress-circular
        color="#fd2a65"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-row align="center" justify="center">
      <img
        src="../../assets/images/logo/mubytesText.png"
        alt="Mubytes"
        width="200"
      />
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-15 rounded-xl">
          <v-row>
            <v-col cols="12" md="6">
              <v-card-text class="mt-5 mb-10">
                <h1 class="text-center h1-mubytes">Connexion</h1>
                <v-row align="center" justify="center">
                  <v-col cols="12" md="10">
                    <v-text-field
                      v-model="email"
                      label="Email"
                      placeholder="Entrez votre e-mail"
                      outlined
                      dense
                      color="#fd2a65"
                      class="mt-16"
                    />
                    <v-text-field
                      v-model="password"
                      label="Mot de passe"
                      placeholder="Entrez votre mot de passe"
                      outlined
                      dense
                      color="#fd2a65"
                      type="password"
                    />
                    <v-btn
                      class="mt-5 rounded-xl"
                      color="blue darken-4"
                      dark
                      block
                      tile
                      @click="login()"
                      >Se connecter</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>
            <v-col cols="12" md="6" class="blue darken-4 rounded-bl-xl">
              <div class="text-center pa-15">
                <v-card-text class="white--text">
                  <div class="ml-10">
                    <v-row align="center" justify="center">
                      <h3 class="text-center mt-15">
                        Vous n'avez pas de compte ? Contactez un administrateur
                        pour qu'il vous crée un compte.
                      </h3>
                      <v-dialog
                        class="mb-15"
                        v-model="contactDialog"
                        persistent
                        max-width="600px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-row align="center" justify="center">
                            <v-btn
                              class="rounded-xl mt-15"
                              tile
                              outlined
                              dark
                              v-bind="attrs"
                              v-on="on"
                              @click="contactDialog = true"
                              >Contact</v-btn
                            >
                          </v-row>
                        </template>
                        <v-card class="rounded-xl">
                          <v-toolbar id="toolbar" class="mb-5" dark>
                            <v-row align="center" justify="center">
                              <v-toolbar-title>
                                <span>
                                  <v-icon>mdi-shield-crown-outline</v-icon>
                                  Contacter un administrateur</span
                                >
                              </v-toolbar-title>
                            </v-row>
                          </v-toolbar>
                          <v-row align="center" justify="center">
                            <v-img
                              class="mb-5"
                              src="../../assets/images/Storyset/admin.png"
                              height="200"
                              max-width="200"
                            ></v-img>
                          </v-row>
                          <v-card-text>
                            <v-container>
                              <v-row align="center" justify="center">
                                <v-col cols="5">
                                  <v-text-field
                                    v-model="firstname"
                                    label="Prénom"
                                    placeholder="Entrer votre prénom"
                                    prepend-icon="mdi-account-circle"
                                    color="#fd2a65"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="5">
                                  <v-text-field
                                    v-model="lastname"
                                    label="Nom de famille"
                                    placeholder="Entrer votre nom"
                                    prepend-icon="mdi-home-account"
                                    color="#fd2a65"
                                    required
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                              <v-col cols="12">
                                <v-text-field
                                  v-model="emailContact"
                                  label="Adresse e-mail"
                                  placeholder="Entrer votre adresse e-mail"
                                  prepend-icon="mdi-email"
                                  color="#fd2a65"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-row align="center" justify="center">
                                <v-col class="d-flex" cols="12" sm="6" md="8">
                                  <v-select
                                    v-model="contactReason"
                                    :items="reasons"
                                    item-text="libelle"
                                    item-value="id"
                                    label="Motif de contact"
                                    prepend-icon="mdi-format-list-bulleted-square"
                                    color="#fd2a65"
                                  ></v-select>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              class="rounded-xl"
                              color="#fd2a65"
                              text
                              @click="contactDialog = false"
                            >
                              Annuler
                            </v-btn>
                            <v-btn
                              class="rounded-xl"
                              color="#122c54"
                              text
                              @click="contact()"
                            >
                              Envoyer
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-row>
                  </div>
                </v-card-text>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <!-- SNACKBAR -->
    <!-- Error Password -->
    <v-snackbar color="red" v-model="snackbarErrorPassword"
      >Adrese e-mail ou mot de passe incorrect !
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarErrorPassword = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Contact -->
    <v-snackbar color="green" v-model="snackbarContact"
      >Votre message a bien été envoyé ! Nous vous répondrons rapidement 😁
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarContact = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts" src="./index.ts"></script>
<style src="./style.css"></style>
