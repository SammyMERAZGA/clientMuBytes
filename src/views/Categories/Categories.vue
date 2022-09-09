<template>
  <v-container>
    <v-overlay :value="overlay">
      <v-progress-circular
        color="#fd2a65"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
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
            <v-row align="center" justify="center">
              <v-btn
                class="rounded-xl mt-10"
                color="blue darken-4"
                dark
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-playlist-plus</v-icon>
              </v-btn>
            </v-row>
          </template>
          <v-card class="rounded-xl non-scrollable">
            <v-toolbar id="toolbar" class="mb-5" dark>
              <v-row align="center" justify="center">
                <v-toolbar-title>
                  <span>
                    <v-icon>mdi-plus-circle-outline</v-icon>
                    Ajouter une catégorie</span
                  >
                </v-toolbar-title>
              </v-row>
            </v-toolbar>
            <v-row align="center" justify="center">
              <v-img
                src="../../assets/images/Storyset/addCategory.png"
                height="200"
                max-width="150"
              ></v-img>
            </v-row>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="libelle"
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
                color="#fd2a65"
                text
                @click="addCategoryDialog = false"
              >
                Annuler
              </v-btn>
              <v-btn
                class="rounded-xl"
                color="#122c54"
                text
                @click="addCategory()"
              >
                Ajouter
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-card width="1500" class="rounded-xl mt-10" elevation="5">
        <v-data-table
          :headers="headersCategoriesTable"
          :items="categories"
          class="mb-5"
          :footer-props="{
            'items-per-page-text': 'Nb éléments par page',
            'items-per-page-all-text': 'Tout',
            'items-per-page-options': [3, 5, 10],
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
            <v-btn icon @click="editCategory(item)">
              <v-icon small color="black"> mdi-pencil </v-icon>
            </v-btn>
          </template>
          <template v-slot:[`item.delete`]="{ item }">
            <v-btn icon>
              <v-icon small color="red" @click="deleteCategory(item.id)">
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
    <!-- Dialog update category -->
    <v-dialog
      class="mb-15"
      v-model="updateCategoryDialog"
      persistent
      max-width="600px"
    >
      <v-card class="rounded-xl non-scrollable">
        <v-toolbar id="toolbar" class="mb-5" dark>
          <v-row align="center" justify="center">
            <v-toolbar-title>
              <span>
                <v-icon>mdi-pencil-circle-outline</v-icon>
                Modifier une catégorie</span
              >
            </v-toolbar-title>
          </v-row>
        </v-toolbar>
        <v-row align="center" justify="center">
          <v-img
            class="mt-5 mb-2"
            src="../../assets/images/Storyset/updateCategory.png"
            height="180"
            max-width="200"
          ></v-img>
        </v-row>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="libelle"
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
            @click="updateCategoryDialog = false"
          >
            Annuler
          </v-btn>
          <v-btn
            class="rounded-xl"
            color="indigo"
            text
            @click="updateCategory()"
          >
            Modifier
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    <v-snackbar color="blue" v-model="snackbarUpdateCategory"
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
    <v-snackbar color="red" v-model="snackbarDeleteCategory"
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
