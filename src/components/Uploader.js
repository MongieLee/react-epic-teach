import React from "react";
import { useStores } from "../store";
import { observer, useLocalStore } from "mobx-react";
import { Upload, Image, message, Spin, InputNumber } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import styled from "styled-components";
const { Dragger } = Upload;

const Result = styled.div`
  margin-top: 30px;
  border: 1px dashed #ccc;
  padding: 20px;
  background-color: white;
  > h2 {
    text-align: center;
  }
`;

const Component = observer(() => {
  const { ImageStore, UserStore } = useStores();
  const localStore = useLocalStore(() => ({
    width: "",
    height: "",
    get widthStr() {
      return this.width ? `/w/${this.width}` : "";
    },
    setWidthStr(width) {
      this.width = width;
    },
    get heightStr() {
      return this.height ? `/h/${this.height}` : "";
    },
    setHeightStr(height) {
      this.height = height;
    },
    get fullStr() {
      return `${ImageStore.serverFile.attributes.url.attributes.url}?imageView2/0${this.widthStr}${this.heightStr}`;
    },
  }));
  const props = {
    showUploadList: false,
    beforeUpload(file) {
      ImageStore.setFile(file);
      ImageStore.setFilename(file.name);
      if (!UserStore.currentUser) {
        message.warning("尚未登陆，无法进行图片上传，请先登录");
        return false;
      }
      if (!/(svg$)|(png$)|(jpg$)|(jpeg$)|(gif$)/gi.test(file.type)) {
        message.error("文件格式有误，请上传svg/png/jpg/jpeg/gif格式的图片");
        return false;
      }
      if (file.size > 1024 * 1024) {
        message.error("文件大小超出限制，请上传1M内的文件");
        return false;
      }
      ImageStore.upload()
        .then(() => {
          message.success("上传成功");
        })
        .catch((err) => console.error(err));
      return false;
    },
  };

  const handleMaxWidth = (value) => {
    localStore.setWidthStr(value);
  };
  const handleMaxHeight = (value) => {
    localStore.setHeightStr(value);
  };

  return (
    <div>
      <h1>图片上传</h1>
      <Spin tip="图片上传中..." spinning={ImageStore.isUploading}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">单击或拖动文件到此区域上传</p>
          <p className="ant-upload-hint">
            仅支持上传.svg/.png/.gif/.jpg/.jpeg格式的图片，图片最大1M
          </p>
        </Dragger>
      </Spin>
      <div>
        {ImageStore.serverFile && (
          <Result>
            <h2>上传结果：</h2>
            <section>
              <div>文件名：{ImageStore.filename}</div>
              <div>
                图片地址：
                <a
                  style={{
                    color: "#1890ff",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={ImageStore.serverFile.attributes.url.attributes.url}
                >
                  {ImageStore.serverFile.attributes.url.attributes.url}
                </a>
              </div>
              <Image
                style={{ maxWidth: 300 }}
                src={ImageStore.serverFile.attributes.url.attributes.url}
              />
              <p>可自定义图片的最大宽度及最大高度</p>
              <div>
                <InputNumber
                  style={{ width: 300 }}
                  placeholder="最大宽度(可选)"
                  onChange={handleMaxWidth}
                />
                <InputNumber
                  style={{ marginLeft: "2em", width: 300 }}
                  placeholder="最大高度(可选)"
                  onChange={handleMaxHeight}
                />
              </div>
              <div
                style={{
                  marginTop: "1em",
                }}
              >
                自定义最大宽高后的图片地址：
                <a
                  style={{
                    color: "#1890ff",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={localStore.fullStr}
                >
                  {localStore.fullStr}
                </a>
              </div>
            </section>
          </Result>
        )}
      </div>
    </div>
  );
});

export default Component;
