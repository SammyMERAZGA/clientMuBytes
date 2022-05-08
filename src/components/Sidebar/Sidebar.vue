<template>
  <nav>
    <v-navigation-drawer
      v-if="$store.state.isLog === true"
      dark
      app
      id="sidebar"
      width="100"
    >
      <div class="text-center mt-8 ml-8">
        <v-img
          id="whiteLogo"
          src="../../assets/images/logo/whiteMubytes.png"
          alt="Logo"
          class="rounded-circle"
          height="50"
          width="35"
        ></v-img>
      </div>
      <v-list flat class="mt-5">
        <v-list-item-group v-model="selectedItem" color="black">
          <v-tooltip v-for="(item, i) in items" :key="i" right color="#fd2a65">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item
                :to="item.url"
                active-class="border"
                class="ml-2 my-3"
                :ripple="false"
                v-bind="attrs"
                v-on="on"
              >
                <b></b>
                <b></b>
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
              </v-list-item>
            </template>
            <span>{{ item.text }}</span>
          </v-tooltip>
        </v-list-item-group>
      </v-list>
      <div id="logout">
        <v-tooltip right color="#fd2a65">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text @click="logout()" v-bind="attrs" v-on="on">
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
          <span>Se déconnecter</span>
        </v-tooltip>
      </div>
    </v-navigation-drawer>
    <!-- SNACKBAR -->
    <!-- Logout -->
    <v-snackbar color="red" v-model="snackbarLogout"
      >Vous avez bien été déconnecté.
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarLogout = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </nav>
</template>

<script lang="ts" src="./index.ts"></script>
<style src="./style.css"></style>
