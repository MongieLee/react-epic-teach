import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import zhCN from "antd/lib/locale/zh_CN";
import { ConfigProvider } from "antd";
import { HashRouter as Router } from "react-router-dom";
ReactDOM.render(
  <Router>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Router>,
  document.getElementById("root")
);
