import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";

@Component
export default class Dashboard extends Vue {

  chart1 = [90, 40, 60];

  chart1Options = {
    labels: [
      "Musée",
      "Cinéma",
      "Théatre"
    ],
    colors: ["#353E8D", "#fd2a65", "#fcd5dc"],
  };
}
