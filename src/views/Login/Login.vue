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
                      <v-btn
                        class="rounded-xl mt-15"
                        tile
                        outlined
                        dark
                        @click="snackbarContact = true"
                        >Contact</v-btn
                      >
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
