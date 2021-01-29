import { observable, action, makeAutoObservable } from "mobx";
import { Uploader } from "../models";
import { message } from "antd";

class HistoryStore {
  constructor() {
    makeAutoObservable(this);
  }
  @observable dataList = [];
  @observable isLoading = false;
  @observable hasMore = true;
  @observable page = 0;
  @observable limit = 10;

  @action appen(newDataList) {
    this.dataList = this.dataList.concat(newDataList);
  }

  @action find() {
    this.isLoading = true;
    return new Promise((resolve, reject) => {
      Uploader.find({ page: this.page, limit: this.limit })
        .then((result) => {
          this.appen(result);
          this.page++;
          if (result.length < this.limit) {
            this.hasMore = false;
          }
        })
        .catch((err) => message.error("加载失败..."))
        .finally(() => {
          this.isLoading = false;
        });
    });
  }

  @action reset() {
    this.dataList = [];
    this.isLoading = false;
    this.hasMore = true;
    this.page = 0;
  }
}

export default new HistoryStore();
