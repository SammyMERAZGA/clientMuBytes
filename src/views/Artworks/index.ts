import Vue from "vue";
import axios from "axios";
import Component from "vue-class-component";
import { Category } from "../../types/Category";
import { Artwork } from "../../types/Artwork";
import { Bibliography } from "../../types/Bibliography";
import { Status } from "../../types/Status";
import { Establishment } from "../../types/Establishment";

@Component
export default class Artworks extends Vue {
  categories: Category[] = [];
  artworks: Artwork[] = [];
  bibliographies: Bibliography[] = [];
  status: Status[] = [];
  establishments: Establishment[] = [];

  overlay = false;

  addArtworkDialog = false;
  updateArtworkDialog = false;
  dialogBibliography = false;
  addBibliographyDialog = false;
  historyArtworkDialog = false;
  deleteArtworkDialog = false;
  // calendarArtworkAdded = false;
  calendarArtworkCreated = false;
  // calendarArtworkLoaned = false;

  idArtwork = 0;
  name = "";
  description = "";
  picture = "";
  author = "";
  // dateAdded = "";
  artwork_Date = "";
  // dateOfLoan = "";
  // to_Loan = false;
  // to_Expose = false;
  establishement_id = 0;
  belong_To = false;
  artwork_Type_id = 0;
  statut_id = 0;

  // Editing an Artwork
  dialogArtwork = true;
  // calendarArtworkAdded2 = false;
  calendarArtworkCreated2 = false;
  // calendarArtworkLoaned2 = false;

  // Snackbar
  snackbarAddArtwork = false;
  snackbarUpdateArtwork = false;
  snackbarDeleteArtwork = false;
  snackbarUpdateBibliography = false;
  snackbarDeleteBibliography = false;

  rulesPicture = [
    (value: any) =>
      !value ||
      value.size < 2000000 ||
      "La taille de l'image doit être inférieure à 2 Mo !",
  ];

  page = 1;
  pageCount = 0;
  itemsPerPage = 3;

  headersBibliographyTable = [
    { text: "Libellé", value: "libelle", align: "start" },
    { text: "Description", value: "description" },
    { text: "Modifier", value: "update", sortable: false },
    { text: "Supprimer", value: "delete", sortable: false },
  ];

  bibliographieItems: Bibliography[] = [];
  bibliographieArtworkId = 0; // L'id de l'artwork sélectionné
  updateBibliographyDialog = false;
  bibligraphieId = 0;

  bibliographieLibelle = "";
  bibliographieDescription = "";

  addArtwork(): void {
    this.overlay = true;
    axios
      .put(`https://mubytes-api.herokuapp.com/artwork/create`, {
        name: this.name,
        description: this.description,
        picture: this.picture,
        author: this.author,
        artwork_Date: this.artwork_Date,
        statut_id: this.statut_id,
        establishement_id: this.establishement_id,
        belong_To: this.belong_To,
        artwork_Type_id: this.artwork_Type_id,
      })
      .then(() => {
        this.snackbarAddArtwork = true;
        this.addArtworkDialog = false;
        this.allArtworks();
        this.overlay = false;
      });
  }

  async allArtworks(): Promise<void> {
    this.overlay = true;
    this.artworks = (
      await axios.get(`https://mubytes-api.herokuapp.com/artwork/all`)
    ).data as Artwork[];
    this.overlay = false;
  }

  async allCategories(): Promise<void> {
    this.categories = (
      await axios.get(`https://mubytes-api.herokuapp.com/category/all`)
    ).data as Category[];
  }

  async allStatus(): Promise<void> {
    this.status = (
      await axios.get(`https://mubytes-api.herokuapp.com/status/all`)
    ).data as Status[];
  }

  async allEstablishments(): Promise<void> {
    this.establishments = (
      await axios.get(`https://mubytes-api.herokuapp.com/establishment/all`)
    ).data as Establishment[];
  }

  mounted(): void {
    this.allArtworks();
    this.allCategories();
    this.allStatus();
    this.allEstablishments();
  }

  editArtwork(artwork: Artwork): void {
    this.name = artwork.name;
    this.description = artwork.description;
    this.picture = artwork.picture;
    this.author = artwork.author;
    this.artwork_Date = artwork.artwork_Date;
    this.statut_id = artwork.statut_id;
    this.establishement_id = artwork.establishement_id;
    this.belong_To = artwork.belong_To;
    this.artwork_Type_id = artwork.artwork_Type_id;
    this.updateArtworkDialog = true;
    this.idArtwork = artwork.id;
  }

  openHistoryArtwork(artwork: Artwork): void {
    this.historyArtworkDialog = true;
  }

  updateArtwork(): void {
    axios
      .post(
        `https://mubytes-api.herokuapp.com/artwork/modify/${this.idArtwork}`,
        {
          name: this.name,
          description: this.description,
          picture: this.picture,
          author: this.author,
          artwork_Date: this.artwork_Date,
          establishement_id: this.establishement_id,
          belong_To: this.belong_To,
          artwork_Type_id: this.artwork_Type_id,
          statut_id: this.statut_id,
        }
      )
      .then(() => {
        this.snackbarUpdateArtwork = true;
        this.updateArtworkDialog = false;
        this.idArtwork = 0;
        this.allArtworks();
      });
  }

  // openDialogDelete(artwork: Artwork): void {
  //   this.deleteArtworkDialog = true;
  //   this.idArtwork = artwork.id;
  // }

  deleteArtwork(artwork: Artwork): void {
    axios
      .delete(`https://mubytes-api.herokuapp.com/artwork/delete/${artwork.id}`)
      .then(() => {
        this.snackbarDeleteArtwork = true;
        this.allArtworks();
      });
  }

  handleImage(e: any): void {
    const file = e.target.files[0];
    this.createBase64Image(file);
  }

  createBase64Image(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.picture = reader.result as string;
    };
  }

  // ========== B I B L I O G R A P H I E ========== //
  openBibliography(artwork: Artwork): void {
    this.dialogBibliography = true;
    this.bibliographieArtworkId = artwork.id;
    this.fillBibliographieItems(artwork.id);
    console.log(this.bibliographieItems);
  }

  closeBlibliographyDialog(): void {
    this.dialogBibliography = false;
    this.bibliographieItems = [];
    this.bibliographieArtworkId = 0;
  }

  async fillBibliographieItems(artworkId: number): Promise<void> {
    this.bibliographieItems = (
      await axios.get(
        `https://mubytes-api.herokuapp.com/bibliography/artwork/${artworkId}`
      )
    ).data as Bibliography[];
  }

  deleteBibliography(bibliography: Bibliography): void {
    axios
      .delete(
        `https://mubytes-api.herokuapp.com/bibliography/delete/${bibliography.id}`
      )
      .then(() => {
        this.snackbarDeleteBibliography = true;
        this.fillBibliographieItems(this.bibliographieArtworkId);
      });
  }

  addBiliography(): void {
    axios
      .put(
        `https://mubytes-api.herokuapp.com/bibliography/create`,
        this.getBibliographieData()
      )
      .then(() => {
        this.emptyBibliographieData();
        this.fillBibliographieItems(this.idArtwork);
        this.closeAddBibliographyDialog();
      });
  }

  editBibliography(item: Bibliography): void {
    this.updateBibliographyDialog = true;
    this.bibligraphieId = item.id;
    this.bibliographieLibelle = item.libelle;
    this.bibliographieDescription = item.description;
  }

  closeUpdateBlibliographyDialog(): void {
    this.updateBibliographyDialog = false;
  }

  closeAddBibliographyDialog(): void {
    this.addBibliographyDialog = false;
  }

  updateBibliography(): void {
    axios
      .post(
        `https://mubytes-api.herokuapp.com/bibliography/modify/${this.bibligraphieId}`,
        this.getBibliographieData()
      )
      .then(() => {
        this.fillBibliographieItems(this.idArtwork);
        this.closeUpdateBlibliographyDialog();
        this.emptyBibliographieData();
      });
  }

  emptyBibliographieData(): void {
    this.bibliographieDescription = "";
    this.bibliographieLibelle = "";
  }

  getBibliographieData(): object {
    return {
      libelle: this.bibliographieLibelle,
      description: this.bibliographieDescription,
      artwork_id: this.idArtwork,
    };
  }
}
