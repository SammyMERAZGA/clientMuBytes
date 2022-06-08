<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular
        color="#fd2a65"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <h1 class="text-center h1-mubytes">Liste des statuts</h1>
    <v-row align="center" justify="center">
      <img
        class="mt-5"
        src="../../assets/images/UnDraw/status.png"
        alt="status"
        width="300"
      />
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="4">
        <h1 class="overline indigo--text text-center mt-5">
          Ajouter un statut
        </h1>
        <v-dialog
          class="mb-15"
          v-model="addStatusDialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-row align="center" justify="center">
              <v-btn
                class="rounded-xl mt-10"
                color="blue darken-4"
                dark
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-tag-plus</v-icon>
              </v-btn>
            </v-row>
          </template>
          <v-card class="rounded-xl non-scrollable">
            <v-toolbar id="toolbar" class="mb-5" dark>
              <v-row align="center" justify="center">
                <v-toolbar-title>
                  <span>
                    <v-icon>mdi-plus-circle-outline</v-icon>
                    Ajouter un statut</span
                  >
                </v-toolbar-title>
              </v-row>
            </v-toolbar>
            <v-row align="center" justify="center">
              <v-img
                src="../../assets/images/Storyset/status.png"
                height="200"
                max-width="200"
              ></v-img>
            </v-row>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="libelle"
                      label="Nom du statut"
                      placeholder="Entrer le nom du statut"
                      prepend-icon="mdi-tag"
                      color="#fd2a65"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="rounded-xl"
                color="red"
                text
                @click="addStatusDialog = false"
              >
                Annuler
              </v-btn>
              <v-btn
                class="rounded-xl"
                color="indigo"
                text
                @click="addStatus()"
              >
                Ajouter
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-card width="1200" class="rounded-xl mt-10" elevation="5">
        <v-data-table
          :headers="headersStatusTable"
          :items="status"
          class="mb-5"
          :footer-props="{
            'items-per-page-text': 'Nb éléments par page',
            'items-per-page-all-text': 'Tout',
            'items-per-page-options': [10, 20, -1],
          }"
        >
          <template v-slot:[`item.transporteur`]="{ item }">
            <b>{{ item.transporteur.name }}</b> ({{ item.transporteur.code }})
            <br v-if="!!item.transporteur.phone" />{{
              item.transporteur.phone
            }}
            <br v-if="!!item.transporteur.email" />{{ item.transporteur.email }}
          </template>
          <template v-slot:no-data>
            <h1>Aucun résultats</h1>
          </template>
          <template v-slot:[`footer.page-text`]="props">
            <span v-if="props.itemsLength > 1"
              >{{ props.pageStart }}/{{ props.pageStop }} de
              {{ props.itemsLength }}</span
            >
          </template>
          <template v-slot:[`item.update`]="{ item }">
            <v-btn icon @click="editStatus(item)">
              <v-icon small color="black"> mdi-pencil </v-icon>
            </v-btn>
          </template>
          <template v-slot:[`item.delete`]="{ item }">
            <v-btn icon>
              <v-icon small color="red" @click="deleteStatus(item.id)">
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
    <!-- Dialog update status -->
    <v-dialog
      class="mb-15"
      v-model="updateStatusDialog"
      persistent
      max-width="600px"
    >
      <v-card class="rounded-xl">
        <v-toolbar id="toolbar" class="mb-5" dark>
          <v-row align="center" justify="center">
            <v-toolbar-title>
              <span>
                <v-icon>mdi-pencil-circle-outline</v-icon>
                Modifier un statut</span
              >
            </v-toolbar-title>
          </v-row>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="libelle"
                  label="Nom du statut"
                  placeholder="Entrer le nom du statut"
                  prepend-icon="mdi-tag"
                  color="#fd2a65"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="rounded-xl"
            color="red"
            text
            @click="updateStatusDialog = false"
          >
            Annuler
          </v-btn>
          <v-btn class="rounded-xl" color="indigo" text @click="updateStatus()">
            Modifier
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- SNACKBAR -->
    <!-- Add status -->
    <v-snackbar color="green" v-model="snackbarAddStatus"
      >Votre statut a bien été ajouté !
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarAddStatus = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Update status -->
    <v-snackbar color="blue" v-model="snackbarUpdateStatus"
      >Votre statut a bien été modifié !
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarUpdateStatus = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Delete status -->
    <v-snackbar color="red" v-model="snackbarDeleteStatus"
      >Votre statut a bien été supprimée.
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarDeleteStatus = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style src="./style.css"></style>
