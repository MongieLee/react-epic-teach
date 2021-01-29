import { observable, action, makeAutoObservable } from "mobx";
import { Auth } from "../models";
import UserStore from "./user";
import { message } from "antd";
import HistoryStore from "./history";
import ImageStore from "./image";
class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }
  @observable values = {
    username: "",
    password: "",
  };

  @action setUsername(username) {
    this.values.username = username;
  }

  @action setPassword(password) {
    this.values.password = password;
  }

  @action login() {
    return new Promise((resolve, reject) => {
      Auth.login(this.values.username, this.values.password)
        .then((user) => {
          UserStore.pullUser();
          resolve(user);
        })
        .catch((err) => {
          UserStore.resetUser();
          message.error("账号或密码错误");
          reject(err);
        });
    });
  }

  @action register() {
    return new Promise((resolve, reject) => {
      Auth.register(this.values.username, this.values.password)
        .then((user) => {
          UserStore.pullUser();
          resolve(user);
        })
        .catch((err) => {
          UserStore.resetUser();
          message.error("注册失败");
          reject(err);
        });
    });
  }

  @action logout() {
    Auth.logout();
    HistoryStore.reset();
    ImageStore.reset();
    UserStore.resetUser();
  }
}

export default new AuthStore();
