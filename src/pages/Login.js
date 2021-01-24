import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../store';

const Component = observer(() => {
  const { AuthStore } = useStores();
  return <div>Login{AuthStore.values.username}</div>;
});

export default Component;
