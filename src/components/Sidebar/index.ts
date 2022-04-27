import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Sidebar extends Vue {
  selectedItem = 0;

  drawer = null;

  items = [
    { icon: "mdi-view-dashboard", text: "Dashboard", url: "/dashboard" },
    { icon: "mdi-bank", text: "Oeuvres", url: "/artworks" },
    { icon: "mdi-shape", text: "Catégories", url: "/categories" },
    { icon: "mdi-account-group", text: "Utilisateurs", url: "/customers" },
    { icon: "mdi-account-circle", text: "Connexion", url: "/" }
  ];
}
