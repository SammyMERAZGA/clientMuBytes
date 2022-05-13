import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { Establishment as EstablishmentType } from "../../types/Establishment";

@Component
export default class Establishment extends Vue {
  addEstablishmentDialog = false;
  updateEstablishmentDialog = false;

  overlay = false;

  establishments: EstablishmentType[] = [];

  establishmentId = 0;
  name = "";
  adress = "";
  zip_Code = "";
  city = "";
  quality = "";

  // Snackbar
  snackbarAddEstablishment = false;
  snackbarUpdateEstablishment = false;
  snackbarDeleteEstablishment = false;

  headersEstablishmentsTable = [
    {
      text: "Nom de l'établissement",
      align: "start",
      value: "name",
    },
    { text: "Adresse", value: "adress" },
    { text: "Code postal", value: "zip_Code" },
    { text: "Ville", value: "city" },
    { text: "Qualité", value: "quality" },
    { text: "Modifier", value: "update", sortable: false },
    { text: "Supprimer", value: "delete", sortable: false },
  ];

  addEstablishment(): void {
    this.overlay = true;
    axios
      .post(`https://mubytes-api.herokuapp.com/establishment/create`, {
        name: this.name,
        adress: this.adress,
        zip_code: this.zip_Code,
        city: this.city,
        quality: this.quality,
      })
      .then(() => {
        this.snackbarAddEstablishment = true;
        this.addEstablishmentDialog = false;
        this.allEstablishments();
        this.overlay = false;
      });
  }

  editEstablishment(item: EstablishmentType): void {
    this.name = item.name;
    this.adress = item.adress;
    this.zip_Code = item.zip_Code;
    this.city = item.city;
    this.quality = item.quality;
    this.updateEstablishmentDialog = true;
    this.establishmentId = item.id;
  }

  updateEstablishment(): void {
    axios
      .post(
        `https://mubytes-api.herokuapp.com/establishment/modify/${this.establishmentId}`,
        {
          name: this.name,
          adress: this.adress,
          zip_code: this.zip_Code,
          city: this.city,
          quality: this.quality,
        }
      )
      .then(() => {
        this.snackbarUpdateEstablishment = true;
        this.updateEstablishmentDialog = false;
        this.establishmentId = 0;
        this.allEstablishments();
      });
  }

  deleteEstablishment(id: number): void {
    axios
      .delete(`https://mubytes-api.herokuapp.com/establishment/delete/${id}`)
      .then(() => {
        this.snackbarDeleteEstablishment = true;
        this.allEstablishments();
      });
  }

  async allEstablishments(): Promise<void> {
    this.establishments = (
      await axios.get(`https://mubytes-api.herokuapp.com/establishment/all`)
    ).data as EstablishmentType[];
  }

  mounted(): void {
    this.allEstablishments();
  }
}
