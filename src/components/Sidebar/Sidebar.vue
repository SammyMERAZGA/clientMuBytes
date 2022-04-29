<template>
  <nav>
    <v-navigation-drawer dark app id="sidebar" width="100">
      <div class="text-center mt-8 ml-8">
          <v-img id="whiteLogo" src="../../assets/images/logo/whiteMubytes.png" alt="Logo" class="rounded-circle" height="50" width="35"></v-img>
      </div>
      <v-list flat class="mt-5">
        <v-list-item-group v-model="selectedItem" color="black">
          <v-list-item
            v-for="(item, i) in items"
            :to="item.url"
            :key="i"
            active-class="border"
            class="ml-2 my-3"
            :ripple="false"
          >
            <b></b>
            <b></b>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <div id="logout">
        <v-btn text>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
    </v-navigation-drawer>
  </nav>
</template>

<script lang="ts" src="./index.ts"></script>
<style src="./style.css"></style>
