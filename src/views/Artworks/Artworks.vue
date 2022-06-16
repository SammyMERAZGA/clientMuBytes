<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular
        color="#fd2a65"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <h1 class="text-center h1-mubytes">Liste des oeuvres</h1>
    <v-row align="center" justify="center">
      <img
        class="mt-5"
        src="../../assets/images/UnDraw/artwork.png"
        alt="categories"
        width="300"
      />
    </v-row>
    <!-- Artwork Dialog -->
    <v-row align="center" justify="center">
      <v-col cols="12">
        <h1 class="overline indigo--text text-center mt-5">
          Ajouter une oeuvre
        </h1>
        <v-dialog
          class="mb-15"
          v-model="addArtworkDialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              id="btnAddArtwork"
              class="rounded-xl mt-5"
              color="blue darken-4"
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-image-plus</v-icon>
            </v-btn>
          </template>
          <v-card class="rounded-xl">
            <v-toolbar id="toolbar" class="mb-5" dark>
              <v-row align="center" justify="center">
                <v-toolbar-title>
                  <span>
                    <v-icon>mdi-image-plus</v-icon>
                    Ajouter une oeuvre</span
                  >
                </v-toolbar-title>
              </v-row>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="name"
                      label="Nom de l'oeuvre"
                      placeholder="Entrer le nom de l'oeuvre"
                      prepend-icon="mdi-palette-advanced"
                      color="#fd2a65"
                      required
                      clearable
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="author"
                      label="Auteur de l'oeuvre"
                      placeholder="Entrer l'auteur de l'oeuvre"
                      prepend-icon="mdi-account-school"
                      color="#fd2a65"
                      required
                      clearable
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      filled
                      v-model="description"
                      label="Description de l'oeuvre"
                      color="#fd2a65"
                      prepend-icon="mdi-script-text-outline"
                      hint="Décrivez l'oeuvre de façon détaillée"
                      clearable
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <label>Image de l'oeuvre :</label><br />
                    <input
                      class="mt-3"
                      @change="handleImage"
                      type="file"
                      accept="image/*"
                    />
                  </v-col>
                  <v-row align="center" justify="center" class="mt-2">
                    <v-col class="d-flex" cols="12" sm="6" md="5">
                      <v-select
                        v-model="statut_id"
                        :items="status"
                        item-text="libelle"
                        item-value="id"
                        label="Statut de l'oeuvre"
                        prepend-icon="mdi-list-status"
                        color="#fd2a65"
                        required
                      ></v-select>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6" md="5">
                      <v-select
                        v-model="artwork_Type_id"
                        :items="categories"
                        item-text="libelle"
                        item-value="id"
                        label="Catégorie"
                        prepend-icon="mdi-format-list-bulleted-square"
                        color="#fd2a65"
                        required
                      ></v-select>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6" md="5">
                      <v-select
                        clearable
                        v-model="establishement_id"
                        :items="establishments"
                        item-text="name"
                        item-value="id"
                        label="Établissements"
                        prepend-icon="mdi-office-building-marker"
                        color="#fd2a65"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="5">
                      <v-menu
                        v-model="calendarArtworkCreated"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="artwork_Date"
                            clearable
                            label="Date de la création"
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                            color="#fd2a65"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="artwork_Date"
                          @input="calendarArtworkCreated = false"
                          locale="fr"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <!-- <v-col class="ml-5 mr-5" cols="12" sm="4" md="4">
                      <v-checkbox
                        v-model="to_Loan"
                        label="Oeuvre loué"
                        color="#fd2a65"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-checkbox
                        v-model="to_Expose"
                        label="Oeuvre exposée"
                        color="#fd2a65"
                      ></v-checkbox>
                    </v-col> -->
                    <v-col cols="12" sm="6" md="5">
                      <v-menu
                        disabled
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            disabled
                            label="Date de début"
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                            color="#fd2a65"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          @input="calendarArtworkCreated = false"
                          locale="fr"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="5">
                      <v-menu
                        disabled
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            disabled
                            label="Date de fin"
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                            color="#fd2a65"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          @input="calendarArtworkCreated = false"
                          locale="fr"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-checkbox
                        v-model="belong_To"
                        label="Oeuvre nous appartenant"
                        color="#fd2a65"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="rounded-xl"
                color="red"
                text
                @click="addArtworkDialog = false"
              >
                Annuler
              </v-btn>
              <v-btn
                class="rounded-xl"
                color="indigo"
                text
                @click="addArtwork()"
              >
                Ajouter
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <!-- Artwork Card -->
    <!-- Search field -->
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" class="mt-10">
        <v-text-field
          label="Rechercher une oeuvre"
          color="#fd2a65"
          outlined
          append-icon="mdi-magnify"
          clearable
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- End of Search field -->
    <v-row>
      <v-col cols="12" md="4" v-for="artwork in artworks" :key="artwork.id">
        <v-card
          class="elevation-5 rounded-xl ml-10 mt-5"
          height="400"
          width="400"
        >
          <v-row>
            <v-card-text class="text-center">
              <h1 class="overline indigo--text mb-3">{{ artwork.name }}</h1>
              <img
                class="rounded-xl"
                id="artworkPic"
                height="250"
                width="300"
                :src="artwork.picture"
              />
              <v-row justify="center" class="mt-5 mb-2">
                <v-tooltip left color="#fd2a65">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      large
                      outlined
                      color="#fd2a65"
                      v-bind="attrs"
                      v-on="on"
                      :to="`/history/${artwork.id}`"
                    >
                      <v-icon color="#fd2a65">
                        mdi-clipboard-text-clock
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Historique de l'oeuvre</span>
                </v-tooltip>
                <!-- <v-dialog
                  class="mb-15"
                  v-model="historyArtworkDialog"
                  v-if="idArtwork == artwork.id"
                  persistent
                  max-width="600px"
                >
                  <v-card class="rounded-xl non-scrollable">
                    <v-toolbar id="toolbar" class="mb-5" dark>
                      <v-row align="center" justify="center">
                        <v-toolbar-title>
                          <span>
                            <v-icon>mdi-clipboard-text-clock-outline</v-icon>
                            Consulter l'historique de l'oeuvre</span
                          >
                        </v-toolbar-title>
                      </v-row>
                    </v-toolbar>
                    <v-card-text>
                      <v-container>
                        <v-row align="center" justify="center">
                          <img
                            src="../../assets/images/UnDraw/history.png"
                            alt="history"
                            width="200"
                          />
                        </v-row>
                        <v-row
                          align="center"
                          justify="center"
                          v-for="history in allHistoryArtwork"
                          :key="history.id"
                        >
                          <div class="timeline">
                            <ul>
                              <li>
                                <span
                                  >Date de fin : {{ history.end_Date }}</span
                                >
                                <div class="content">
                                  <h3>Nom de l'oeuvre : {{ history.field }}</h3>
                                  <h3>
                                    Réference du contrat :
                                    {{ history.reference }}
                                  </h3>
                                  <p>
                                    Date de début du contrat :
                                    {{ history.begin_Date }}
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        class="rounded-xl"
                        color="red"
                        text
                        @click="historyArtworkDialog = false"
                      >
                        Fermer
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog> -->
                <!-- Bibliography -->
                <v-tooltip bottom color="#353E8D">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="ml-10"
                      icon
                      large
                      outlined
                      color="#353E8D"
                      v-bind="attrs"
                      v-on="on"
                      @click="
                        openBibliography(artwork);
                        idArtwork = artwork.id;
                      "
                    >
                      <v-icon color="#353E8D">
                        mdi-book-open-page-variant-outline
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Bibliographie</span>
                </v-tooltip>
                <v-dialog
                  class="mb-15"
                  v-model="dialogBibliography"
                  persistent
                  max-width="900px"
                  v-if="idArtwork == artwork.id"
                >
                  <v-card class="rounded-xl">
                    <v-toolbar id="toolbar" class="mb-5" dark>
                      <v-row align="center" justify="center">
                        <v-toolbar-title>
                          <span>
                            <v-icon>mdi-book-open-page-variant-outline</v-icon>
                            Bibliographie de l'oeuvre</span
                          >
                        </v-toolbar-title>
                      </v-row>
                    </v-toolbar>
                    <v-card-text>
                      <v-container>
                        <v-row align="center" justify="center">
                          <img
                            class="mt-5"
                            src="../../assets/images/Storyset/bibliography.png"
                            alt="status"
                            width="150"
                          />
                        </v-row>
                        <v-row justify="center" align="center">
                          <v-dialog
                            v-model="addBibliographyDialog"
                            persistent
                            max-width="600px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                id="addBibliography"
                                color="#fd2a65"
                                dark
                                v-bind="attrs"
                                v-on="on"
                              >
                                <v-icon>mdi-book-plus</v-icon>
                              </v-btn>
                            </template>
                            <v-card>
                              <v-toolbar id="toolbar" class="mb-5" dark>
                                <v-row align="center" justify="center">
                                  <v-toolbar-title>
                                    <span>
                                      <v-icon>mdi-plus-circle-outline</v-icon>
                                      Ajouter une bibliographie</span
                                    >
                                  </v-toolbar-title>
                                </v-row>
                              </v-toolbar>
                              <v-card-text>
                                <v-container>
                                  <v-col cols="12">
                                    <v-text-field
                                      v-model="bibliographieLibelle"
                                      label="Libellé"
                                      clearable
                                      placeholder="Entrer le libellé de la bibliographie"
                                      color="#fd2a65"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12">
                                    <v-textarea
                                      v-model="bibliographieDescription"
                                      filled
                                      clearable
                                      label="Description"
                                      placeholder="Entrer la description de la bibliographie"
                                      color="#fd2a65"
                                    ></v-textarea>
                                  </v-col>
                                </v-container>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  class="rounded-xl"
                                  color="#fd2a65"
                                  text
                                  @click="closeAddBibliographyDialog()"
                                >
                                  Annuler
                                </v-btn>
                                <v-btn
                                  @click="addBiliography()"
                                  class="rounded-xl"
                                  color="#353e8d"
                                  text
                                >
                                  Ajouter
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                          <v-data-table
                            :headers="headersBibliographyTable"
                            :items="bibliographieItems"
                            class="mt-5"
                            :footer-props="{
                              'items-per-page-text': 'Nb éléments par page',
                              'items-per-page-all-text': 'Tout',
                              'items-per-page-options': [10, 20, -1],
                            }"
                          >
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
                              <v-btn icon @click="editBibliography(item)">
                                <v-icon small color="black">
                                  mdi-pencil
                                </v-icon>
                              </v-btn>
                            </template>
                            <template v-slot:[`item.delete`]="{ item }">
                              <v-btn icon>
                                <v-icon
                                  small
                                  color="red"
                                  @click="deleteBibliography(item)"
                                >
                                  mdi-delete
                                </v-icon>
                              </v-btn>
                            </template>
                          </v-data-table>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        class="rounded-xl"
                        color="red"
                        text
                        @click="closeBlibliographyDialog()"
                      >
                        Fermer
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- End of Bibliography -->
                <v-btn
                  class="ml-10"
                  icon
                  large
                  outlined
                  color="#353E8D"
                  @click="editArtwork(artwork)"
                >
                  <v-icon color="#353E8D"> mdi-pencil </v-icon>
                </v-btn>
                <!-- Update Artwork Dialog -->
                <v-dialog
                  class="mb-15"
                  v-model="updateArtworkDialog"
                  v-if="idArtwork == artwork.id"
                  persistent
                  max-width="600px"
                >
                  <v-card class="rounded-xl">
                    <v-toolbar id="toolbar" class="mb-5" dark>
                      <v-row align="center" justify="center">
                        <v-toolbar-title>
                          <span>
                            <v-icon>mdi-pencil-box-multiple-outline</v-icon>
                            Modifier une oeuvre</span
                          >
                        </v-toolbar-title>
                      </v-row>
                    </v-toolbar>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="name"
                              clearable
                              label="Nom de l'oeuvre"
                              placeholder="Entrer le nom de l'oeuvre"
                              prepend-icon="mdi-palette-advanced"
                              color="#fd2a65"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              clearable
                              v-model="author"
                              label="Auteur de l'oeuvre"
                              placeholder="Entrer l'auteur de l'oeuvre"
                              prepend-icon="mdi-account-school"
                              color="#fd2a65"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-textarea
                              filled
                              clearable
                              v-model="description"
                              label="Description de l'oeuvre"
                              color="#fd2a65"
                              prepend-icon="mdi-script-text-outline"
                              hint="Décrivez l'oeuvre de façon détaillée"
                            ></v-textarea>
                          </v-col>
                          <v-col cols="12">
                            <label>Image de l'oeuvre :</label><br />
                            <input
                              class="mt-3"
                              @change="handleImage"
                              type="file"
                              accept="image/*"
                            />
                          </v-col>
                          <v-row align="center" justify="center" class="mt-2">
                            <v-col class="d-flex" cols="12" sm="6" md="5">
                              <v-select
                                clearable
                                v-model="statut_id"
                                :items="status"
                                item-text="libelle"
                                item-value="id"
                                label="Statut de l'oeuvre"
                                prepend-icon="mdi-list-status"
                                color="#fd2a65"
                                required
                              ></v-select>
                            </v-col>
                            <v-col class="d-flex" cols="12" sm="6" md="5">
                              <v-select
                                clearable
                                v-model="artwork_Type_id"
                                :items="categories"
                                item-text="libelle"
                                item-value="id"
                                label="Catégorie"
                                prepend-icon="mdi-format-list-bulleted-square"
                                color="#fd2a65"
                              ></v-select>
                            </v-col>
                            <v-col class="d-flex" cols="12" sm="6" md="5">
                              <v-select
                                clearable
                                v-model="establishement_id"
                                :items="establishments"
                                item-text="name"
                                item-value="id"
                                label="Établissements"
                                prepend-icon="mdi-office-building-marker"
                                color="#fd2a65"
                                required
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="5">
                              <v-menu
                                v-model="calendarArtworkCreated"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    clearable
                                    v-model="artwork_Date"
                                    label="Date de la création"
                                    prepend-icon="mdi-calendar"
                                    v-bind="attrs"
                                    v-on="on"
                                    color="#fd2a65"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="artwork_Date"
                                  @input="calendarArtworkCreated = false"
                                ></v-date-picker>
                              </v-menu>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-checkbox
                                v-model="belong_To"
                                label="Oeuvre appartenant à nous"
                                color="#fd2a65"
                                hide-details
                              ></v-checkbox>
                            </v-col>
                          </v-row>
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
                          updateArtworkDialog = false;
                        "
                      >
                        Annuler
                      </v-btn>
                      <v-btn
                        class="rounded-xl"
                        color="indigo"
                        text
                        @click="updateArtwork()"
                      >
                        Modifier
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-btn
                  class="ml-10"
                  icon
                  large
                  outlined
                  color="#fd2a65"
                  @click="openDialogDelete(artwork)"
                >
                  <v-icon color="#fd2a65"> mdi-delete </v-icon>
                </v-btn>
              </v-row>
            </v-card-text>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center mt-15">
      <v-pagination
        color="#fd2a65"
        v-model="page"
        :length="4"
        circle
      ></v-pagination>
    </div>
    <!-- SNACKBAR -->
    <!-- Add artwork -->
    <v-snackbar color="green" v-model="snackbarAddArtwork"
      >Votre oeuvre a bien été ajoutée !
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarAddArtwork = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Update artwork -->
    <v-snackbar color="green" v-model="snackbarUpdateArtwork"
      >Votre oeuvre a bien été modifiée !
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarUpdateArtwork = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Delete artwork -->
    <v-snackbar color="red" v-model="snackbarDeleteArtwork"
      >Cette oeuvre a bien été supprimée.
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarDeleteArtwork = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Update Bibliography -->
    <v-snackbar color="blue" v-model="snackbarUpdateBibliography"
      >Votre bibliographie a bien été modifiée !
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarUpdateBibliography = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Delete Bibliography -->
    <v-snackbar color="red" v-model="snackbarDeleteBibliography"
      >Cette bibliographie a bien été supprimée.
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarDeleteBibliography = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>

    <v-dialog v-model="updateBibliographyDialog" persistent max-width="600px">
      <v-card>
        <v-toolbar id="toolbar" class="mb-5" dark>
          <v-row align="center" justify="center">
            <v-toolbar-title>
              <span>
                <v-icon>mdi-pencil</v-icon>
                Modifier une bibliographie</span
              >
            </v-toolbar-title>
          </v-row>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-col cols="12">
              <v-text-field
                v-model="bibliographieLibelle"
                label="Libellé"
                clearable
                placeholder="Entrer le libellé de la bibliographie"
                color="#fd2a65"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="bibliographieDescription"
                filled
                clearable
                label="Description"
                placeholder="Entrer la description de la bibliographie"
                color="#fd2a65"
              ></v-textarea>
            </v-col>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="rounded-xl"
            color="#fd2a65"
            text
            @click="closeUpdateBlibliographyDialog()"
          >
            Annuler
          </v-btn>
          <v-btn
            @click="updateBibliography()"
            class="rounded-xl"
            color="#353e8d"
            text
          >
            Modifier
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
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
                Suppression de l'oeuvre</span
              >
            </v-toolbar-title>
          </v-row>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <h1 class="text-center pa-10">
                Êtes-vous sûr de vouloir supprimer cette oeuvre ?
              </h1>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="rounded-xl"
            color="red"
            text
            @click="deleteArtworkDialog = false"
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
    </v-dialog>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style src="./style.css"></style>
