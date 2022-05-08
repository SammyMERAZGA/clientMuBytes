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

  login(): void {
    this.overlay = true;
    axios
      .post("https://mubytes-api.herokuapp.com/auth/login", {
        email: this.email,
        password: this.password,
      })
      .then((response) => {
        if (response.data.success) {
          this.$router.push("/dashboard");
          this.overlay = false;
        }
        this.$store.commit("nowLog", { val: true });
        console.log("Login success ✅" + this.$store.state.isLog);
        // Demander à nassim de récupérer le nom de l'utilisateur lors de la connexion pour l'afficher dans la navbar
        this.$store.commit("Customer", { val: response.data.username });
        console.log("Customer 💁" + this.$store.state.username);
      })
      .catch((error) => {
        if (error.response.data.error) {
          this.snackbarErrorPassword = true;
        }
      });
  }
}
