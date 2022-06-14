import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";

@Component
export default class HistoryArtwork extends Vue {
  allHistoryArtwork: HistoryArtwork[] = [];

  artworkId = 0;

  async allHistory(): Promise<void> {
    this.allHistoryArtwork = (
      await axios.get(
        `https://mubytes-api.herokuapp.com/contrat/${this.artworkId}`
      )
    ).data as HistoryArtwork[];
  }

  mounted(): void {
    this.artworkId = parseInt(this.$route.params.id); // Récupérer l'id de l'artwork sélectionné
    this.allHistory();
  }
}
