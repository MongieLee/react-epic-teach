import React from "react";
import { observer } from "mobx-react";
import { useStores } from "../store";
import Uploader from "../components/Uploader";
import Tips from "../components/Tips";

const Home = observer(() => {
  const { UserStore } = useStores();
  return (
    <>
      {
        UserStore.currentUser ? null : <Tips>未登录，请先登录</Tips>
      }
      <Uploader />
    </>
  );
});

export default Home;
