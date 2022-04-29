<template>
  <v-container>
    <v-row align="center" justify="center">
      <img
        src="../../assets/images/Logo/mubytesText.png"
        alt="Mubytes"
        width="200"
      />
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-15 rounded-xl">
          <v-row>
            <v-col cols="12" md="6">
              <v-card-text class="mt-5 mb-10">
                <h1 id="login" class="text-center">Connexion</h1>
                <v-row align="center" justify="center">
                  <v-col cols="12" md="10">
                    <v-text-field
                      label="Email"
                      placeholder="Entrez votre e-mail"
                      outlined
                      dense
                      color="#fd2a65"
                      class="mt-16"
                    />
                    <v-text-field
                      label="Mot de passe"
                      placeholder="Entrez votre mot de passe"
                      outlined
                      dense
                      color="#fd2a65"
                      type="password"
                    />
                    <v-btn
                      class="mt-5 rounded-xl"
                      color="#353E8D"
                      dark
                      block
                      tile
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
                      <v-btn class="rounded-xl mt-15" tile outlined dark
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
  </v-container>
</template>

<script lang="ts" src="./index.ts"></script>
<style src="./style.css"></style>
