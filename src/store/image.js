import { observable, action, makeAutoObservable } from "mobx";
import { Uploader } from "../models";
import { message } from "antd";
class ImageStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable filename = "";
  @observable file = null;
  @observable isUploading = false;
  @observable serverFile = null;

  @action setFilename(newFilename) {
    this.filename = newFilename;
  }

  @action setFile(newFile) {
    this.file = newFile;
  }

  @action upload() {
    this.isUploading = true;
    this.serverFile = null;
    return new Promise((resolve, reject) => {
      Uploader.upload(this.file, this.filename)
        .then((serverFile) => {
          this.serverFile = serverFile;
          resolve(serverFile);
        })
        .catch((err) => {
          message.error("上传失败！");
          reject(err);
        })
        .finally(() => {
          this.isUploading = false;
        });
    });
  }
}

export default new ImageStore();
