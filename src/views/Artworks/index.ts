import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { Category } from "../../types/Category";
import { Artwork } from '../../types/Artwork';

@Component
export default class Artworks extends Vue {
  categories: Category[] = [];
  artworks: Artwork[] = [];

  overlay = false;

  addArtworkDialog = false;
  updateArtworkDialog = false;
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
  to_Loan = false;
  to_Expose = false;
  belong_To = false;
  artwork_Type_id = 0;

  // Editing an Artwork
  dialogArtwork = true;
  // calendarArtworkAdded2 = false;
  calendarArtworkCreated2 = false;
  // calendarArtworkLoaned2 = false;

  // Snackbar
  snackbarAddArtwork = false;
  snackbarUpdateArtwork = false;
  snackbarDeleteArtwork = false;

  page = 1;

  rulesPicture = [
    (value: any) =>
      !value ||
      value.size < 2000000 ||
      "La taille de l'image doit être inférieure à 2 Mo !",
  ];

  // status = ["Disponible", "En prêt", "Non-prêtable"];

  addArtwork(): void {
    this.overlay = true;
    axios
      .post(`https://mubytes-api.herokuapp.com/artwork/create`, {
        name: this.name,
        description: this.description,
        picture: this.picture,
        author: this.author,
        artwork_Date: this.artwork_Date,
        to_Loan: this.to_Loan,
        to_Expose: this.to_Expose,
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
    this.artworks = (
      await axios.get(`https://mubytes-api.herokuapp.com/artwork/all`)
    ).data as Artwork[];
  }

  async allCategories(): Promise<void> {
    this.categories = (
      await axios.get(`https://mubytes-api.herokuapp.com/category/all`)
    ).data as Category[];
  }

  mounted(): void {
    this.allArtworks();
    this.allCategories();
  }

  editArtwork(artwork: Artwork): void {
    this.name = artwork.name;
    this.description = artwork.description;
    this.picture = artwork.picture;
    this.author = artwork.author;
    this.artwork_Date = artwork.artwork_Date;
    this.to_Loan = artwork.to_Loan;
    this.to_Expose = artwork.to_Expose;
    this.belong_To = artwork.belong_To;
    this.artwork_Type_id = artwork.artwork_Type_id;
    this.updateArtworkDialog = true;
    this.idArtwork = artwork.id;
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
          to_Loan: this.to_Loan,
          to_Expose: this.to_Expose,
          belong_To: this.belong_To,
          artwork_Type_id: this.artwork_Type_id,
        }
      )
      .then(() => {
        this.snackbarUpdateArtwork = true;
        this.updateArtworkDialog = false;
        this.idArtwork = 0;
        this.allArtworks();
      });
  }

}
