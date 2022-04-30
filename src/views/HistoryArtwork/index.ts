import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class HistoryArtwork extends Vue {
  historyArtwork = [
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
  ];
}
