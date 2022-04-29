import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Customers extends Vue {
  addUserDialog = false;

  lastname = "";
  firstname = "";
  email = "";
  password = "";

  headersCustomersTable = [
    {
      text: "Nom",
      align: "start",
      value: "lastname",
    },
    { text: "Prénom", value: "firstname" },
    { text: "Email", value: "email" },
    { text: "Mot de passe", value: "password" },
    { text: "Modifier", value: "update", sortable: false },
    { text: "Supprimer", value: "delete", sortable: false },
  ];

  customers = [
    {
      id: 1,
      lastname: "Dupont",
      firstname: "Jean",
      email: "jean.dupont@gmail.com",
      password: "MTQ0NjOkZmQ5OTM5NDE9ZTZjNGZmZjI3",
    },
    {
      id: 2,
      lastname: "Durand",
      firstname: "Pierre",
      email: "pierre.durant@gmail.com",
      password: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    },
  ];
}
