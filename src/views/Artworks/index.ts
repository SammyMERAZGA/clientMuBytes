import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Artworks extends Vue {

  // Adding an Artwork
  addArtworkDialog = false;

  calendarArtworkAdded = false;
  calendarArtworkCreated = false;
  calendarArtworkLoaned = false;
  name = "";
  author = "";
  description = "";
  dateAdded = "";
  dateCreation = "";
  dateOfLoan = "";

  // Editing an Artwork
  dialogArtwork = true;

  calendarArtworkAdded2 = false;
  calendarArtworkCreated2 = false;
  calendarArtworkLoaned2 = false;

  page = 1;

  idArtwork = 0;

  rulesPicture = [
    (value: any) =>
      !value ||
      value.size < 2000000 ||
      "La taille de l'image doit être inférieure à 2 Mo !",
  ];

  status = ["Disponible", "En prêt", "Non-prêtable"];

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
    },
    {
      id: 4,
      name: "Méliodas & Ban",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde ducimus nihil dicta iusto ratione.",
      picture: "https://c.tenor.com/7ifKFj-rS3MAAAAC/meliodas-ban.gif",
    },
    {
      id: 5,
      name: "Light & L",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde ducimus nihil dicta iusto ratione.",
      picture:
        "https://animesher.com/orig/1/149/1491/14918/animesher.com_yagami-light-deathnote-gif-1491888.gif",
    },
    {
      id: 4,
      name: "Tanjiro & Nezuko",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde ducimus nihil dicta iusto ratione.",
      picture:
        "https://i.pinimg.com/originals/37/02/a2/3702a2540fd07aa72e0cc0c5ac4a072a.gif",
    },
  ];
}
