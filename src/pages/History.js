import React from "react";
import { useStores } from "../store";
import List from "../components/List";
import Tips from "../components/Tips";
import { observer } from "mobx-react";

const History = observer(() => {
  const { UserStore } = useStores();
  return UserStore.currentUser ? <List /> : <Tips>未登录，请先登录</Tips>;
});

export default History;
