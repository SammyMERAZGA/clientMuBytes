import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";

@Component
export default class Login extends Vue {
  // Snackbar
  snackbarErrorPassword = false;
  snackbarContact = false;

  email = "";
  password = "";

  login(): void {
    axios
      .post("https://mubytes-api.herokuapp.com/auth/login", {
        email: this.email,
        password: this.password,
      })
      .then((response) => {
        if (response.data.success) {
          this.$router.push("/dashboard");
        }
        this.$store.commit("nowLog", { val: true });
        console.log("Login success ✅" + this.$store.state.isLog);
      })
      .catch((error) => {
        if (error.response.data.error) {
          this.snackbarErrorPassword = true;
        }
      });
  }
}
