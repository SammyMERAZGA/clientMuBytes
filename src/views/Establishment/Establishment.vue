<template>
  <div>
    <h1 class="text-center h1-mubytes">Liste des établissements</h1>
    <v-row align="center" justify="center">
      <img
        class="mt-5"
        src="../../assets/images/UnDraw/establishment.png"
        alt="categories"
        width="300"
      />
    </v-row>
    <v-row align="center" justify="center">
      <h1 class="overline indigo--text text-center mt-8">
        Ajouter un établissement
      </h1>
      <v-col cols="12">
        <v-btn
          id="btnAddEstablishment"
          class="rounded-xl mt-2"
          color="blue darken-4"
          dark
        >
          <v-icon>mdi-domain-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="ml-15 mr-15">
      <v-card width="1500" class="rounded-xl mt-10" elevation="5">
        <v-data-table
          :headers="headersEstablishmentsTable"
          :items="establishments"
          class="mb-5"
          :footer-props="{
            'items-per-page-text': 'Nb éléments par page',
            'items-per-page-all-text': 'Tout',
            'items-per-page-options': [5, 10, 20],
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
            <v-btn icon @click="editUser(item)">
              <v-icon small> mdi-pencil </v-icon>
            </v-btn>
          </template>
          <template v-slot:[`item.delete`]="{ item }">
            <v-btn icon>
              <v-icon small color="red" @click="deleteUser(item.id)">
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
    <!-- SNACKBAR -->
    <!-- Add etablishment -->
    <v-snackbar color="green" v-model="snackbarAddEtablishment"
      >Votre établissement a bien été ajouté !
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarAddEtablishment = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Update category -->
    <v-snackbar color="green" v-model="snackbarUpdateEtablishment"
      >Votre établissement a bien été modifié !
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarUpdateEtablishment = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Delete category -->
    <v-snackbar color="green" v-model="snackbarDeleteEtablishment"
      >Votre établissement a bien été supprimée.
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarDeleteEtablishment = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style src="./style.css"></style>
