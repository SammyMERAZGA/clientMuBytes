<template>
  <nav>
    <v-navigation-drawer dark app id="sidebar" width="100">
      <div class="text-center mt-5 ml-2">
          <v-img src="https://i.pinimg.com/originals/86/e3/b9/86e3b90cfc140c94fd2b30cda2b805fb.jpg" alt="Logo" class="elevation-1 rounded-circle" height="80" width="80"></v-img>
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
