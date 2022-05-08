import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";

@Component
export default class Navbar extends Vue {

  getLastname() {
    return this.$store.state.lastname;
  }

  getFirstname() {
    return this.$store.state.firstname;
  }
}
