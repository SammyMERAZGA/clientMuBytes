import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { Category } from '../../types/Category';

@Component
export default class Categories extends Vue {
  addCategoryDialog = false;
  updateCategoryDialog = false;

  overlay = false;

  categories: Category[] = [];

  categoryId = 0;
  libelle = "";

  // Snackbar
  snackbarAddCategory = false;
  snackbarUpdateCategory = false;
  snackbarDeleteCategory = false;

  headersCategoriesTable = [
    {
      text: "Nom de la catégorie",
      align: "start",
      value: "libelle",
    },
    { text: "Modifier", value: "update", sortable: false },
    { text: "Supprimer", value: "delete", sortable: false },
  ];

  addCategory(): void {
    this.overlay = true;
    axios
      .put(`https://mubytes-api.herokuapp.com/category/create`, {
        libelle: this.libelle,
      })
      .then(() => {
        this.snackbarAddCategory = true;
        this.addCategoryDialog = false;
        this.allCategories();
        this.overlay = false;
      });
  }

  editCategory(item: Category): void {
    this.libelle = item.libelle;
    this.updateCategoryDialog = true;
    this.categoryId = item.id;
  }

  updateCategory(): void {
    axios
      .post(
        `https://mubytes-api.herokuapp.com/category/modify/${this.categoryId}`,
        {
          libelle: this.libelle,
        }
      )
      .then(() => {
        this.snackbarUpdateCategory = true;
        this.updateCategoryDialog = false;
        this.categoryId = 0;
        this.allCategories();
      });
  }

  deleteCategory(id: number): void {
    axios
      .delete(`https://mubytes-api.herokuapp.com/category/delete/${id}`)
      .then(() => {
        this.snackbarDeleteCategory = true;
        this.allCategories();
      });
  }

  async allCategories(): Promise<void> {
    this.categories = (
      await axios.get(`https://mubytes-api.herokuapp.com/category/all`)
    ).data as Category[];
  }

  mounted(): void {
    this.allCategories();
  }
}
