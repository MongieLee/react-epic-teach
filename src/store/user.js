import { observable, action, makeAutoObservable } from "mobx";
import { Auth } from "../models";
class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable currentUser = null;

  @action pullUser() {
    this.currentUser = Auth.getCurrentUser();
  }

  @action resetUser() {
    this.currentUser = null;
  }
}

export default new UserStore();
