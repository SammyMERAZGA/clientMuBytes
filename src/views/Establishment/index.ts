import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Establishment extends Vue {

  // Snackbar
  snackbarAddEtablishment = false;
  snackbarUpdateEtablishment = false;
  snackbarDeleteEtablishment = false;

  headersEstablishmentsTable = [
    {
      text: "Nom de l'établissement",
      align: "start",
      value: "name",
    },
    { text: "Adresse", value: "address" },
    { text: "Code postal", value: "postalCode" },
    { text: "Ville", value: "city" },
    { text: "Téléphone", value: "phone" },
    { text: "Modifier", value: "update", sortable: false },
    { text: "Supprimer", value: "delete", sortable: false },
  ];

  establishments = [
    {
      id: 1,
      name: "Le Louvre",
      address: "1, rue du Louvre",
      postalCode: "75001",
      city: "Paris",
      phone: "0123456789",
    },
    {
      id: 2,
      name: "Le Musée d'Orsay",
      address: "2, rue du Louvre",
      postalCode: "75001",
      city: "Paris",
      phone: "0123456789",
    },
  ];
}
