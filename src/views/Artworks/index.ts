import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { Category } from "../../types/Category";
import { Artwork } from '../../types/Artwork';

@Component
export default class Artworks extends Vue {
  categories: Category[] = [];

  overlay = false;

  addArtworkDialog = false;
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

  artworks = [
    {
      id: 1,
      name: "Gon & Killua",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde ducimus nihil dicta iusto ratione.",
      picture: "https://24.media.tumblr.com/tumblr_m6tua7TFB81qfwde8o1_500.gif",
    },
    {
      id: 2,
      name: "Naruto & Sasuke",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde ducimus nihil dicta iusto ratione.",
      picture: "https://media0.giphy.com/media/lPX7ZMdAYbr3DZkAPd/200.gif",
    },
    {
      id: 3,
      name: "Son Goku & Vegeta",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde ducimus nihil dicta iusto ratione.",
      picture: "https://c.tenor.com/vM0BXi-C2BYAAAAC/goku-vegeta.gif",
    }
  ];

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

  mounted(): void {
    this.allArtworks();
  }
}
