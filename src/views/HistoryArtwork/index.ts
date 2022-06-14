import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";

@Component
export default class HistoryArtwork extends Vue {
/*  historyArtwork = [
    {
      id: 1,
      name: "Gon & Killua",
      author: "Yoshihiro Togashi",
      date: "09/02/2022",
      owner: "Toto Dupond",
    },
    {
      id: 2,
      name: "Naruto & Sasuke",
      author: "Masashi Kishimoto",
      date: "18/11/2021",
      owner: "Sammy Merazga",
    },
    {
      id: 3,
      name: "Son Goku & Vegeta",
      author: "Akira Toriyama",
      date: "03/05/2021",
      owner: "Lorem Ipsum",
    },
    {
      id: 4,
      name: "Méliodas & Ban",
      author: "Akira Toriyama",
      date: "03/05/2020",
      owner: "Shawn Michaels",
    },
  ];*/

  allHistoryArtwork: HistoryArtwork[] = [];

  artworkId = 0;

  async allHistory(): Promise<void> {
    this.allHistoryArtwork = (
        await axios.get(`https://mubytes-api.herokuapp.com/contrat/${this.artworkId}`)
  ).data as HistoryArtwork[];
  }

  mounted(): void {
    this.artworkId = parseInt(this.$route.params.id); // Récupérer l'id de l'artwork sélectionné
    this.allHistory();
  }

}
