import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { ArtworkByCategory } from "../../types/charts/ArtworkByCategory";

@Component
export default class Dashboard extends Vue {
  // CHART 1

  nbArtworksByCategory = [90, 40, 60];

  // nbArtworksByCategory: any = [];

  artworkByCategoryOptions = {
    labels: ["Ordis", "Pixels", "Tableaux"],
    colors: ["#353E8D", "#fd2a65", "#fcd5dc"],
  };

  // CHART 2

  nbArtworkByStatus = [
    {
      data: [30, 6, 18],
    },
  ];

  nbArtworkByStatusOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        vertical: true,
      },
    },
    colors: ["#fd2a65"],
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: ["Sur site", "En restauration", "Prêtée"],
    },
  };

  // CHART 3

  nbArtworkByMonths = [
    {
      name: "Sur Site",
      data: [10, 20, 18],
    },
    {
      name: "Prêtée",
      data: [6, 10, 4],
    },
    {
      name: "En restauration",
      data: [2, 1, 7],
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

  // async getArtworkByCategory(): Promise<void> {
  //   this.nbArtworksByCategory = await axios
  //     .get("https://mubytes-api.herokuapp.com/dashboard/nbArtworkByCategory")
  //     .then((response) => {
  //       console.log("🇩🇿");
  //       console.log(
  //         "🐯🐯🐯🐯" +
  //           response.data.map(
  //             (item: ArtworkByCategory) => item.nbArtworksByCategory
  //           )
  //       );
  //       this.nbArtworksByCategory = response.data.map(
  //         (item: ArtworkByCategory) => item.nbArtworksByCategory
  //       );
  //     });
  //   console.log("😂😂" + this.nbArtworksByCategory);
  // }

  // async loadData(): Promise<void> {
  //   this.getArtworkByCategory();
  // }

  // async mounted(): Promise<void> {
  //   await this.loadData();
  // }
}
