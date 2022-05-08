import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Status extends Vue {
  addStatusDialog = false;

  // Snackbar
  snackbarAddStatus = false;
  snackbarUpdateStatus = false;
  snackbarDeleteStatus = false;

  name = "";

  headersStatusTable = [
    {
      text: "Nom du statut",
      align: "start",
      value: "name",
    },
    { text: "Modifier", value: "update", sortable: false },
    { text: "Supprimer", value: "delete", sortable: false },
  ];

  status = [
    {
      id: 1,
      name: "Disponible",
    },
    {
      id: 2,
      name: "En prêt",
    },
    {
      id: 3,
      name: "Non-prêtable",
    },
  ];
}
