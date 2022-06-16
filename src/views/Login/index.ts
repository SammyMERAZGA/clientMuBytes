import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";

@Component
export default class Login extends Vue {
  overlay = false;

  // Snackbar
  snackbarErrorPassword = false;
  snackbarContact = false;

  email = "";
  password = "";

  // Contact
  contactDialog = false;
  firstname = "";
  lastname = "";
  emailContact = "";
  contactReason = "";

  reasons = [
    { id: 1, libelle: "Mot de passe oublié" },
    { id: 2, libelle: "Création de compte" },
    { id: 3, libelle: "Autre" },
  ];

  login(): void {
    this.overlay = true;
    axios
      .post("https://mubytes-api.herokuapp.com/auth/login", {
        email: this.email,
        password: this.password,
      })
      .then((response) => {
        if (response.data.success) {
          this.$store.commit("nowLog", { val: true });
          this.$router.push("/dashboard");
          this.overlay = false;
        }
        this.$store.commit("lastnameCustomer", {
          val: response.data.user.lastname,
        });
        this.$store.commit("firstnameCustomer", {
          val: response.data.user.firstname,
        });
        this.$store.commit("roleIdCustomer", {
          val: response.data.user.role_id,
        });
        if (this.$store.state.role_id === 1) {
          this.$store.commit("superAdmin", { val: true });
        } else {
          this.$store.commit("superAdmin", { val: false });
        }
        console.log(this.$store.state.role_id);
        console.log("🚨" + this.$store.state.isSuperAdmin);
        console.log("Login success ✅" + this.$store.state.isLog);
        console.log("😁 Lastname : " + this.$store.state.lastname);
        console.log("🥹 Firstname : " + this.$store.state.firstname);
        console.log("🦁 Role_id : " + this.$store.state.role_id);
        localStorage.setItem("role_id", this.$store.state.role_id);
      })
      .catch((error) => {
        if (error.response.data.error) {
          this.snackbarErrorPassword = true;
          this.overlay = false;
        }
      });
  }

  contact(): void {
    this.snackbarContact = true;
    this.contactDialog = false;
  }
}
