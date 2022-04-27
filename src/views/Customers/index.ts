import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Customers extends Vue {
  headersCustomersTable = [
    {
      text: "Nom",
      align: "start",
      value: "lastname",
    },
    { text: "Prénom", value: "firstname" },
    { text: "Adresse", value: "address" },
    { text: "Code Postal", value: "zipcode" },
    { text: "Ville", value: "city" },
    { text: "Modifier", value: "update", sortable: false },
    { text: "Supprimer", value: "delete", sortable: false },
  ];

  customers = [
    {
      id: 1,
      lastname: "Dupont",
      firstname: "Jean",
      address: "1 rue de la paix",
      zipcode: "75000",
      city: "Paris",
    },
  ];
}
