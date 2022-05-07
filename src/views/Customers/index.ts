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
  roles = [
    {
      id: 1,
      name: "Admin",
    },
    {
      value: 2,
      name: "Super-Admin",
    },
  ];

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
    { text: "Rôle", value: "role.label" },
    { text: "Email", value: "email" },
    { text: "Modifier", value: "update", sortable: false },
    { text: "Supprimer", value: "delete", sortable: false },
  ];

  async addCustomer(): Promise<void> {
    try {
      await axios.post(`https://mubytes-api.herokuapp.com/users/create`),
        {
          lastname: this.lastname,
          firstname: this.firstname,
          email: this.email,
          password: this.password,
          role_id: this.roles[0].id,
        };
      this.snackbarAddCustomer = true;
      this.addUserDialog = false;
      this.allCustomers();
    } catch (error) {
      console.log(error);
    }
  }

  async updateCustomer(customer: Customer): Promise<void> {
    try {
      await axios.put(
        `https://mubytes-api.herokuapp.com/users/modify/${customer.id}`,
        {
          lastname: customer.lastname,
          firstname: customer.firstname,
          email: customer.email,
          password: customer.password,
          role: customer.role,
        }
      );
      this.snackbarUpdateCustomer = true;
      this.allCustomers();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCustomer(customer: Customer): Promise<void> {
    try {
      await axios.delete(
        `https://mubytes-api.herokuapp.com/users/delete/${customer.id}`
      );
      this.snackbarDeleteCustomer = true;
      this.allCustomers();
    } catch (error) {
      console.log(error);
    }
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
