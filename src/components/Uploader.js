import React, { useRef } from "react";
import { useStores } from "../store";
import { observer } from "mobx-react";
import { Upload, Image, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const Component = observer(() => {
  const { ImageStore, UserStore } = useStores();
  const props = {
    showUploadList: false,
    beforeUpload(file) {
      console.log(file);
      ImageStore.setFile(file);
      ImageStore.setFilename(file.name);
      if (!UserStore.currentUser) {
        message.warning("尚未登陆，无法进行图片上传");
        return false;
      }
      ImageStore.upload()
        .then(() => {
          console.log("上传成功");
        })
        .catch((err) => console.log(err));
      return false;
    },
  };

  return (
    <div>
      <h1>文件上传</h1>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">单击或拖动文件到此区域上传</p>
        <p className="ant-upload-hint">
          支持单次或批量上传，严禁上传公司数据等文件。
        </p>
      </Dragger>
      <div>
        <h1>上传结果</h1>
        {ImageStore.serverFile && (
          <>
            <Image
              width={200}
              src={ImageStore.serverFile.attributes.url.attributes.url}
            />
            <p>{ImageStore.serverFile.attributes.url.attributes.url}</p>
          </>
        )}
        {}
      </div>
    </div>
  );
});

export default Component;
