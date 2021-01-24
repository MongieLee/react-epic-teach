import React, { useRef } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../store';

const Component = observer(() => {
  const { AuthStore } = useStores();
  const inputRef = useRef(null);
  const bindChange = () => {
    console.log(inputRef.current);
    AuthStore.setUsername(inputRef.current.value);
  };
  return (
    <>
      <div>Register {AuthStore.values.username}</div>
      <input onChange={bindChange} ref={inputRef} />
    </>
  );
});

export default Component;
