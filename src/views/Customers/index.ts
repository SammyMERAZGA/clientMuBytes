import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { Customer } from "../../types/Customer";

@Component
export default class Customers extends Vue {
  addUserDialog = false;

  lastname = "";
  firstname = "";
  email = "";
  password = "";

  // Snackbar
  snackbarAddCustomer = false;
  snackbarUpdateCustomer = false;
  snackbarDeleteCustomer = false;

  customers: Customer[] = [];

  headersCustomersTable = [
    {
      text: "Nom",
      align: "start",
      value: "lastname",
    },
    { text: "Prénom", value: "firstname" },
    { text: "Rôle", value: "role.libelle" },
    { text: "Email", value: "email" },
    { text: "Modifier", value: "update", sortable: false },
    { text: "Supprimer", value: "delete", sortable: false },
  ];

  role = ["Admin", "Super Admin"];

  async allCustomers(): Promise<void> {
    this.customers = (await axios.get(`/utilisateur/all`)).data as Customer[];
  }

  mounted(): void {
    this.allCustomers();
  }
}
