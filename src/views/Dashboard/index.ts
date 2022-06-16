import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { ArtworkByCategory } from "../../types/charts/ArtworkByCategory";
import { ArtworkByStatus } from "../../types/charts/ArtworkByStatus";

@Component
export default class Dashboard extends Vue {
  // CHART 1

  nbArtworksByCategory: number[] = [];
  nbArtworkByStatus: number[] = [];
  globalStats: any[] = [];

  artworkByCategoryOptions = {
    labels: ["Image", "Tableau", "Ordi", "Pixel"],
    colors: ["#353E8D", "#fd2a65", "#fcd5dc", "#b841f3"],
  };

  // CHART 2

  getNbArtworkByStatus = [
    {
      // data: [1, 1, 4],
      data: this.nbArtworkByStatus,
    },
  ];

  nbArtworkByStatusOptions = {
    labels: ["Prêtée", "En restauration", "Sur site"],
    colors: ["#353E8D", "#fd2a65", "#fcd5dc"],
  };

  // CHART 3

  nbArtworkByMonths = [
    {
      name: "Sur Site",
      data: [8, 12, 9],
    },
    {
      name: "Prêtée",
      data: [6, 10, 4],
    },
    {
      name: "En restauration",
      data: [3, 1, 1],
    },
  ];

  nbArtworkByMonthsOptions = {
    chart: {
      type: "area",
      height: 350,
    },
    dataLabels: {
      enabled: true,
    },
    title: {
      text: "Nb Oeuvres",
      align: "left",
    },
    labels: ["Avril", "Mai", "Juin"],
    colors: ["#fd2a65", "#b000f3", "#0d47a1"],
    legend: {
      horizontalAlign: "left",
    },
  };

  async getArtworkByCategory(): Promise<void> {
    await axios
      .post(
        `https://mubytes-api.herokuapp.com/dashboard/nbArtworkByCategory`,
        {}
      )
      .then((response) => {
        this.nbArtworksByCategory = response.data.nbArtworkByCategory;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getArtworkByStatus(): Promise<void> {
    await axios
      .post(`https://mubytes-api.herokuapp.com/dashboard/nbArtworkByStatus`, {})
      .then((response) => {
        this.nbArtworkByStatus = response.data.nbArtworkByStatus;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getGlobalStats(): Promise<void> {
    await axios
      .post(`https://mubytes-api.herokuapp.com/dashboard/globalStats`, {})
      .then((response) => {
        this.globalStats = response.data;
      });
  }

  async mounted(): Promise<void> {
    await this.getArtworkByCategory();
    await this.getArtworkByStatus();
    await this.getGlobalStats();
  }
}
