<template>
  <v-footer id="footer" class="mt-15" padless>
    <v-col id="link" class="text-center" cols="12">
      {{ new Date().getFullYear() }} —
      <v-tooltip top color="#fd2a65">
        <template v-slot:activator="{ on, attrs }">
          <a
            id="link"
            class="text-decoration-none"
            target="_blank"
            href="https://www.youtube.com"
            v-bind="attrs"
            v-on="on"
            ><strong>MuBytes</strong>
          </a>
        </template>
        <span>Accéder au site web</span>
      </v-tooltip>
    </v-col>
  </v-footer>
</template>

<style src="./style.css"></style>
