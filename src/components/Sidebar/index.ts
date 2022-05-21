import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";

@Component
export default class Sidebar extends Vue {
  selectedItem = 0;

  drawer = false;

  // Snackbar
  snackbarLogout = false;

  items: any = [];

  itemsSuperAdmin = [
    { icon: "mdi-view-dashboard", text: "Dashboard", url: "/dashboard" },
    { icon: "mdi-format-list-bulleted-square", text: "Catégories", url: "/categories" },
    { icon: "mdi-panorama", text: "Oeuvres", url: "/artworks" },
    { icon: "mdi-home-city", text: "Établissements", url: "/establishments" },
    { icon: "mdi-list-status", text: "Statuts", url: "/status" },
    { icon: "mdi-account-group", text: "Utilisateurs", url: "/customers" },
  ];

  itemsAdmin = [
    { icon: "mdi-view-dashboard", text: "Dashboard", url: "/dashboard" },
    { icon: "mdi-format-list-bulleted-square", text: "Catégories", url: "/categories" },
    { icon: "mdi-panorama", text: "Oeuvres", url: "/artworks" },
    { icon: "mdi-home-city", text: "Établissements", url: "/establishments" },
    { icon: "mdi-list-status", text: "Statuts", url: "/status" },
  ];

  get isLogged(): boolean {
    return this.$store.state.isLog;
  }

  mounted() {
    if(localStorage.getItem("role_id") === "1") {
      this.items = this.itemsSuperAdmin;
    }
    else {
      this.items = this.itemsAdmin;
    }
  };

  logout(): void {
    this.$store.commit("nowLog", { val: false });
    this.$router.push("/");
    console.log("Logout success 🔴");
    this.snackbarLogout = true;
  }
}
