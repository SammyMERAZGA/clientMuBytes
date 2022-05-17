<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular
        color="#fd2a65"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
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
      <v-col cols="12" sm="4">
        <h1 class="overline indigo--text text-center mt-5">
          Ajouter un établissement
        </h1>
        <v-dialog
          class="mb-15"
          v-model="addEstablishmentDialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-row align="center" justify="center">
              <v-btn
                class="rounded-xl mt-10"
                color="blue darken-4"
                v-bind="attrs"
                v-on="on"
                dark
              >
                <v-icon>mdi-domain-plus</v-icon>
              </v-btn>
            </v-row>
          </template>
          <v-card class="rounded-xl">
            <v-card-title>
              <v-row align="center" justify="center">
                <span class="text-h5 indigo--text mt-5"
                  >Ajouter un établissement</span
                >
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="name"
                      label="Nom de l'établissement"
                      placeholder="Entrer le nom de l'établissement"
                      prepend-icon="mdi-office-building-outline"
                      color="#fd2a65"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="adress"
                      label="Adresse de l'établissement"
                      placeholder="Entrer l'adresse de l'établissement"
                      prepend-icon="mdi-map-marker-outline"
                      color="#fd2a65"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="zip_Code"
                      label="Code postal"
                      placeholder="XXXXX"
                      prepend-icon="mdi-cellphone-marker"
                      color="#fd2a65"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field
                      v-model="city"
                      label="Ville de l'établissement"
                      placeholder="Entrer la ville de l'établissement"
                      prepend-icon="mdi-map-search"
                      color="#fd2a65"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="quality"
                      label="Qualité de l'établissement"
                      placeholder="Entrer la qualité de l'établissement"
                      prepend-icon="mdi-star-half-full"
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
                @click="addEstablishmentDialog = false"
              >
                Annuler
              </v-btn>
              <v-btn
                class="rounded-xl"
                color="indigo"
                text
                @click="addEstablishment()"
              >
                Ajouter
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row class="ml-15 mr-15" align="center" justify="center">
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
            <v-btn icon @click="editEstablishment(item)">
              <v-icon small color="black"> mdi-pencil </v-icon>
            </v-btn>
          </template>
          <template v-slot:[`item.delete`]="{ item }">
            <v-btn icon>
              <v-icon small color="red" @click="deleteEstablishment(item.id)">
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
    <!-- Dialog update customer -->
    <v-dialog
      class="mb-15"
      v-model="updateEstablishmentDialog"
      persistent
      max-width="600px"
    >
      <v-card class="rounded-xl">
        <v-card-title>
          <v-row align="center" justify="center">
            <span class="text-h5 indigo--text mt-5"
              >Modifier un établissement</span
            >
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="name"
                  label="Nom de l'établissement"
                  placeholder="Entrer le nom de l'établissement"
                  prepend-icon="mdi-office-building-outline"
                  color="#fd2a65"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="adress"
                  label="Adresse de l'établissement"
                  placeholder="Entrer l'adresse de l'établissement"
                  prepend-icon="mdi-map-marker-outline"
                  color="#fd2a65"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="zip_Code"
                  label="Code postal"
                  placeholder="XXXXX"
                  prepend-icon="mdi-cellphone-marker"
                  color="#fd2a65"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field
                  v-model="city"
                  label="Ville de l'établissement"
                  placeholder="Entrer la ville de l'établissement"
                  prepend-icon="mdi-map-search"
                  color="#fd2a65"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="quality"
                  label="Qualité de l'établissement"
                  placeholder="Entrer la qualité de l'établissement"
                  prepend-icon="mdi-star-half-full"
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
            @click="updateEstablishmentDialog = false"
          >
            Annuler
          </v-btn>
          <v-btn
            class="rounded-xl"
            color="indigo"
            text
            @click="updateEstablishment()"
          >
            Modifier
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- SNACKBAR -->
    <!-- Add etablishment -->
    <v-snackbar color="green" v-model="snackbarAddEstablishment"
      >Votre établissement a bien été ajouté !
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarAddEstablishment = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Update etablishment -->
    <v-snackbar color="blue" v-model="snackbarUpdateEstablishment"
      >Votre établissement a bien été modifié !
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarUpdateEstablishment = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Delete etablishment -->
    <v-snackbar color="red" v-model="snackbarDeleteEstablishment"
      >Votre établissement a bien été supprimée.
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarDeleteEstablishment = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style src="./style.css"></style>
