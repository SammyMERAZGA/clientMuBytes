<template>
  <v-container>
    <h1 class="text-center h1-mubytes">Catégories</h1>
    <v-row align="center" justify="center">
      <img
        class="mt-5"
        src="../../assets/images/UnDraw/categories.png"
        alt="categories"
        width="300"
      />
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="4">
        <h1 class="overline indigo--text text-center mt-5">
          Ajouter une catégorie
        </h1>
        <v-dialog
          class="mb-15"
          v-model="addCategoryDialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              id="btnAddCategory"
              class="rounded-xl mt-5"
              color="blue darken-4"
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-playlist-plus</v-icon>
            </v-btn>
          </template>
          <v-card class="rounded-xl">
            <v-card-title>
              <v-row align="center" justify="center">
                <span class="text-h5 indigo--text mt-5"
                  >Ajouter une catégorie</span
                >
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="category"
                      label="Nom de la catégorie"
                      placeholder="Entrer le nom de la catégorie"
                      prepend-icon="mdi-format-list-bulleted-square"
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
                @click="addCategoryDialog = false"
              >
                Annuler
              </v-btn>
              <v-btn
                class="rounded-xl"
                color="indigo"
                text
                @click="
                  addCategoryDialog = false;
                  snackbarAddCategory = true;
                "
              >
                Ajouter
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-card width="1500" class="rounded-xl mt-10" elevation="5">
        <v-data-table
          :headers="headersCategoriesTable"
          :items="categories"
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
    <!-- Add category -->
    <v-snackbar color="green" v-model="snackbarAddCategory"
      >Votre catégorie a bien été ajoutée !
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarAddCategory = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Update category -->
    <v-snackbar color="green" v-model="snackbarUpdateCategory"
      >Votre catégorie a bien été modifiée !
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarUpdateCategory = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Delete category -->
    <v-snackbar color="green" v-model="snackbarDeleteCategory"
      >Votre catégorie a bien été supprimée.
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarDeleteCategory = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts" src="./index.ts"></script>
<style src="./style.css"></style>
