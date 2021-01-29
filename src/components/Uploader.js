import React, { useRef } from "react";
import { useStores } from "../store";
import { observer, useLocalStore } from "mobx-react";
import { Upload, Image, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import styled from "styled-components";
const { Dragger } = Upload;

const Result = styled.div`
  margin-top: 30px;
  border: 1px dashed #ccc;
  padding: 20px;
  > h1 {
    text-align: center;
    margin: 20px 0;
  }
`;

const Component = observer(() => {
  const { ImageStore, UserStore } = useStores();
  const widthRef = useRef();
  const heightRef = useRef();
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

  const handleMaxWidth = () => {
    localStore.setWidthStr(widthRef.current.value);
  };
  const handleMaxHeight = () => {
    localStore.setHeightStr(heightRef.current.value);
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
        {ImageStore.serverFile && (
          <Result>
            <h1>上传结果</h1>
            <dl>
              <dt>可预览地址</dt>
              <dd>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={ImageStore.serverFile.attributes.url.attributes.url}
                >
                  {ImageStore.serverFile.attributes.url.attributes.url}
                </a>
              </dd>
              <dt>文件名</dt>
              <dd>{ImageStore.filename}</dd>
              <dt>图片预览</dt>
              <dd>
                <Image
                  style={{ maxWidth: 300 }}
                  src={ImageStore.serverFile.attributes.url.attributes.url}
                />
              </dd>
              <dt>更多尺寸</dt>
              <dd>
                <input
                  placeholder="最大宽度(可选)"
                  ref={widthRef}
                  onChange={handleMaxWidth}
                />
                <input
                  ref={heightRef}
                  placeholder="最大高度(可选)"
                  onChange={handleMaxHeight}
                />
              </dd>
              <dt>修改尺寸后的预览链接</dt>
              <dd>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={localStore.fullStr}
                >
                  {localStore.fullStr}
                </a>
              </dd>
            </dl>
          </Result>
        )}
      </div>
    </div>
  );
});

export default Component;
