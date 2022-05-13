import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { Customer } from "../../types/Customer";
import { Role } from "../../types/Role";

@Component
export default class Customers extends Vue {
  addUserDialog = false;
  updateCustomerDialog = false;

  overlay = false;

  customerId = 0;
  lastname = "";
  firstname = "";
  email = "";
  password = "";
  role = "";

  customers: Customer[] = [];

  roles: Role[] = [
    {
      id: 1,
      label: "Admin",
    },
    {
      id: 2,
      label: "User",
    },
  ];

  // Snackbar
  snackbarAddCustomer = false;
  snackbarUpdateCustomer = false;
  snackbarDeleteCustomer = false;

  headersCustomersTable = [
    {
      text: "Nom",
      align: "start",
      value: "lastname",
    },
    { text: "Prénom", value: "firstname" },
    { text: "Rôle", value: "role.label" },
    { text: "Email", value: "email" },
    { text: "Modifier", value: "update", sortable: false },
    { text: "Supprimer", value: "delete", sortable: false },
  ];

  addCustomer(): void {
    this.overlay = true;
    axios
      .post(`https://mubytes-api.herokuapp.com/users/create`, {
        lastname: this.lastname,
        firstname: this.firstname,
        email: this.email,
        password: this.password,
        role_id: this.role,
      })
      .then(() => {
        this.snackbarAddCustomer = true;
        this.addUserDialog = false;
        this.allCustomers();
        this.overlay = false;
      });
  }

  editCustomer(item: Customer): void {
    this.lastname = item.lastname;
    this.firstname = item.firstname;
    this.email = item.email;
    this.password = item.password;
    this.updateCustomerDialog = true;
    this.customerId = item.id;
  }

  updateCustomer(): void {
    axios
      .post(
        `https://mubytes-api.herokuapp.com/users/modify/${this.customerId}`,
        {
          lastname: this.lastname,
          firstname: this.firstname,
          email: this.email,
          password: this.password,
          role_id: this.role,
        }
      )
      .then(() => {
        this.snackbarUpdateCustomer = true;
        this.updateCustomerDialog = false;
        this.customerId = 0;
        this.allCustomers();
      });
  }

  deleteCustomer(id: number): void {
    axios
      .delete(`https://mubytes-api.herokuapp.com/users/delete/${id}`)
      .then(() => {
        this.snackbarDeleteCustomer = true;
        this.allCustomers();
      });
  }

  async allCustomers(): Promise<void> {
    this.customers = (
      await axios.get(`https://mubytes-api.herokuapp.com/users/all`)
    ).data as Customer[];
  }

  mounted(): void {
    this.allCustomers();
  }
}
