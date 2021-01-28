import React, { useRef } from "react";
import { useStores } from "../store";
import { observer } from "mobx-react";
const Component = observer(() => {
  const ref = useRef();
  const { ImageStore } = useStores();
  const bindChange = () => {
    if (ref.current.files.length > 0) {
      ImageStore.setFile(ref.current.files[0]);
      ImageStore.setFilename(ref.current.files[0].name);
      ImageStore.upload()
        .then(() => {
          console.log("上传成功");
        })
        .catch((err) => console.log(err));
    }
    window.ref = ref.current;
  };
  return (
    <div>
      <h1>文件上传</h1>
      <input type="file" ref={ref} onChange={bindChange} />
    </div>
  );
});

export default Component;
