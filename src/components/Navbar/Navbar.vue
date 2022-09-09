<template>
  <v-app-bar v-if="$store.state.isLog === true" app color="white" flat>
    <v-spacer></v-spacer>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn class="mr-5" icon v-on="on">
          <v-icon color="#fd2a65">mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list flat>
        <v-list-item-group v-model="selectedItem">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            router
            :to="item.url"
            active-class="borderMobile"
          >
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
    <span v-if="$store.state.isLog === true" id="username"
      >Bonjour {{ getFirstname() + " " + getLastname() }}</span
    >
  </v-app-bar>
</template>

<script lang="ts" src="./index.ts"></script>