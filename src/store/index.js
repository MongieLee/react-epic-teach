import React, { createContext, useContext } from 'react';
import AuthStore from './auth';

const content = createContext({
  AuthStore: new AuthStore(),
});

export const useStores = () => useContext(content);
