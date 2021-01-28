import React from "react";
import { observer } from "mobx-react";
import { useStores } from "../store";

const Home = observer((props) => {
  const { UserStore } = useStores();
  console.log(props);
  return (
    <>
      {UserStore.currentUser ? (
        <>home {UserStore.currentUser.attributes.username}</>
      ) : (
        "用户没有登录"
      )}
    </>
  );
});

export default Home;
