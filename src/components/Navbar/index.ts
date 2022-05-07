import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";

@Component
export default class Navbar extends Vue {

  getName() {
    return this.$store.state.user.name;
  }
}
