import Vue from "vue";
import Component from "vue-class-component";
// import { Category } from "../../types/Category";

@Component
export default class Categories extends Vue {

  addCategoryDialog = false;

  headersCategoriesTable = [
    {
      text: "Nom de la catégorie",
      align: "start",
      value: "category",
    },
    { text: "Modifier", value: "update", sortable: false },
    { text: "Supprimer", value: "delete", sortable: false },
  ];

  categories = [
    {
      id: 1,
      category: "Ordinateur"
    },
    {
      id: 2,
      category: "Pixel Art"
    },
  ];
}
