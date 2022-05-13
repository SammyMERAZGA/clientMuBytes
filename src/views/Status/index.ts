import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { Status as StatusType } from "../../types/Status";

@Component
export default class Status extends Vue {
  addStatusDialog = false;
  updateStatusDialog = false;

  overlay = false;

  status: StatusType[] = [];

  statusId = 0;
  libelle = "";

  // Snackbar
  snackbarAddStatus = false;
  snackbarUpdateStatus = false;
  snackbarDeleteStatus = false;

  headersStatusTable = [
    {
      text: "Nom du statut",
      align: "start",
      value: "libelle",
    },
    { text: "Modifier", value: "update", sortable: false },
    { text: "Supprimer", value: "delete", sortable: false },
  ];

  addStatus(): void {
    this.overlay = true;
    axios
      .put(`https://mubytes-api.herokuapp.com/status/create`, {
        libelle: this.libelle,
      })
      .then(() => {
        this.snackbarAddStatus = true;
        this.addStatusDialog = false;
        this.allStatus();
        this.overlay = false;
      });
  }

  editStatus(item: StatusType): void {
    this.libelle = item.libelle;
    this.updateStatusDialog = true;
    this.statusId = item.id;
  }

  updateStatus(): void {
    axios
      .post(
        `https://mubytes-api.herokuapp.com/status/modify/${this.statusId}`,
        {
          libelle: this.libelle,
        }
      )
      .then(() => {
        this.snackbarUpdateStatus = true;
        this.updateStatusDialog = false;
        this.statusId = 0;
        this.allStatus();
      });
  }

  deleteStatus(id: number): void {
    axios
      .delete(`https://mubytes-api.herokuapp.com/status/delete/${id}`)
      .then(() => {
        this.snackbarDeleteStatus = true;
        this.allStatus();
      });
  }

  async allStatus(): Promise<void> {
    this.status = (
      await axios.get(`https://mubytes-api.herokuapp.com/status/all`)
    ).data as StatusType[];
  }

  mounted(): void {
    this.allStatus();
  }
}
