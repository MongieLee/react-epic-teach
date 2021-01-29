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
  @observable total = 0;
  @observable limit = 10;

  @action setData(newDataList) {
    this.dataList = newDataList;
  }

  @action changePage(page) {
    this.page = page;
  }

  @action find() {
    this.isLoading = true;
    Uploader.find({ page: this.page, limit: this.limit })
      .then((result) => {
        this.setData(result[1]);
        this.total = result[0];
      })
      .catch((err) => {
        console.error(err);
        message.error("加载失败...");
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  @action reset() {
    this.dataList = [];
    this.isLoading = false;
    this.hasMore = true;
    this.page = 0;
    this.total = 0;
  }
}

export default new HistoryStore();
