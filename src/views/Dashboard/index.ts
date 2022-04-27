import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { Test } from "../../types/Test";

@Component
export default class Dashboard extends Vue {

  testApi = [];

  async test(): Promise<void> {
    this.testApi = (await axios.get(`/api/test`)).data;
  }

  mounted(): void {
    this.test();
  }
}