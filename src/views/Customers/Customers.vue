<template>
  <v-container>
    <v-overlay :value="overlay">
      <v-progress-circular
        color="#fd2a65"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <h1 class="text-center h1-mubytes mb-5">Liste des utilisateurs</h1>
    <v-row align="center" justify="center">
      <img
        src="../../assets/images/UnDraw/customers.png"
        alt="customers"
        width="300"
      />
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="4" class="mt-5">
        <h1 class="overline indigo--text text-center mt-5">
          Ajouter un utilisateur
        </h1>
        <v-dialog
          class="mb-15"
          v-model="addUserDialog"
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
                <v-icon>mdi-account-plus</v-icon>
              </v-btn>
            </v-row>
          </template>
          <v-card class="rounded-xl">
            <v-toolbar id="toolbar" class="mb-5" dark>
              <v-row align="center" justify="center">
                <v-toolbar-title>
                  <span>
                    <v-icon>mdi-account-plus</v-icon>
                    Ajouter un utilisateur</span
                  >
                </v-toolbar-title>
              </v-row>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="firstname"
                      label="Prénom"
                      placeholder="Entrer un prénom"
                      prepend-icon="mdi-account-circle"
                      color="#fd2a65"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="lastname"
                      label="Nom de famille"
                      placeholder="Entrer un nom de famille"
                      prepend-icon="mdi-account-circle"
                      color="#fd2a65"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="email"
                      label="Email"
                      placeholder="Entrer un email"
                      prepend-icon="mdi-email"
                      color="#fd2a65"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="password"
                      label="Mot de passe"
                      placeholder="Entrer un mot de passe"
                      type="password"
                      prepend-icon="mdi-key-variant"
                      color="#fd2a65"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12">
                    <v-select
                      v-model="role"
                      :items="roles"
                      item-text="label"
                      item-value="id"
                      label="Rôle de l'utilisateur"
                      prepend-icon="mdi-redhat"
                      color="#fd2a65"
                      required
                    ></v-select>
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
                @click="addUserDialog = false"
              >
                Annuler
              </v-btn>
              <v-btn
                class="rounded-xl"
                color="indigo"
                text
                @click="addCustomer()"
              >
                Ajouter
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <!-- Customers list -->
    <v-row justify="center" align="center">
      <v-card width="1500" class="rounded-xl mt-10" elevation="5">
        <v-data-table
          :headers="headersCustomersTable"
          :items="customers"
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
            <v-btn icon @click="editCustomer(item)">
              <v-icon small color="black"> mdi-pencil </v-icon>
            </v-btn>
          </template>
          <template v-slot:[`item.delete`]="{ item }">
            <v-btn icon>
              <v-icon small color="red" @click="deleteCustomer(item.id)">
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
      v-model="updateCustomerDialog"
      persistent
      max-width="600px"
    >
      <v-card class="rounded-xl">
        <v-toolbar id="toolbar" class="mb-5" dark>
          <v-row align="center" justify="center">
            <v-toolbar-title>
              <span>
                <v-icon>mdi-account-switch</v-icon>
                Modifier un utilisateur</span
              >
            </v-toolbar-title>
          </v-row>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="firstname"
                  label="Prénom"
                  placeholder="Entrer un prénom"
                  prepend-icon="mdi-account-circle"
                  color="#fd2a65"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="lastname"
                  label="Nom de famille"
                  placeholder="Entrer un nom de famille"
                  prepend-icon="mdi-account-circle"
                  color="#fd2a65"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  label="Email"
                  placeholder="Entrer un email"
                  prepend-icon="mdi-email"
                  color="#fd2a65"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  label="Mot de passe"
                  placeholder="Entrer un mot de passe"
                  type="password"
                  prepend-icon="mdi-key-variant"
                  color="#fd2a65"
                  required
                ></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12">
                <v-select
                  v-model="role"
                  :items="roles"
                  item-text="label"
                  item-value="id"
                  label="Rôle de l'utilisateur"
                  prepend-icon="mdi-redhat"
                  color="#fd2a65"
                  required
                ></v-select>
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
            @click="updateCustomerDialog = false"
          >
            Annuler
          </v-btn>
          <v-btn
            class="rounded-xl"
            color="indigo"
            text
            @click="updateCustomer()"
          >
            Modifier
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    "<!-- Dialog delete customer -->
    <!-- <v-dialog
      class="mb-15"
      v-model="deleteArtworkDialog"
      persistent
      max-width="600px"
    >
      <v-card class="rounded-xl">
        <v-toolbar id="toolbar" class="mb-5" dark>
          <v-row align="center" justify="center">
            <v-toolbar-title>
              <span>
                <v-icon>mdi-delete-outline</v-icon>
                Suppression d'utilisateur</span
              >
            </v-toolbar-title>
          </v-row>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <h1>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</h1>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="rounded-xl"
            color="red"
            text
            @click="
              idArtwork = 0;
              deleteArtworkDialog = false;
            "
          >
            Non
          </v-btn>
          <v-btn
            class="rounded-xl"
            color="indigo"
            text
            @click="deleteArtwork(artwork)"
          >
            Oui
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <!-- SNACKBAR -->
    <!-- Add customer -->
    <v-snackbar color="green" v-model="snackbarAddCustomer"
      >Cet utilisateur a bien été ajouté !
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarAddCustomer = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Update customer -->
    <v-snackbar color="blue" v-model="snackbarUpdateCustomer"
      >Cet utilisateur a bien été modifié !
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarUpdateCustomer = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Delete customer -->
    <v-snackbar color="red" v-model="snackbarDeleteCustomer"
      >Votre utilisateur a bien été supprimée.
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarDeleteCustomer = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts" src="./index.ts"></script>
"
