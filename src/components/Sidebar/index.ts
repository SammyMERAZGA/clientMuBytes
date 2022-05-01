import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Sidebar extends Vue {
  selectedItem = 0;

  drawer = null;

  // Snackbar
  snackbarLogout = false;

  items = [
    { icon: "mdi-view-dashboard", text: "Dashboard", url: "/dashboard" },
    { icon: "mdi-shape", text: "Catégories", url: "/categories" },
    { icon: "mdi-bank", text: "Oeuvres", url: "/artworks" },
    { icon: "mdi-domain", text: "Etablissements", url: "/establishments" },
    { icon: "mdi-list-status", text: "Statuts", url: "/status" },
    { icon: "mdi-account-group", text: "Utilisateurs", url: "/customers" },
    { icon: "mdi-shield-lock", text: "Connexion", url: "/" },
  ];
}
