import React, {createContext, useState} from 'react';

type KEYS_TYPE = {
  keys: string[];
  addKey: (key: string) => void;
  removeKey: (key: string) => void;
};

export const FavoritesBookContext = createContext<KEYS_TYPE>({
  keys: [],
  addKey: () => {},
  removeKey: () => {},
});

export function FavoritesBookContextProvider({children}: any) {
  const [keys, setKeys] = useState<string[]>([]);

  const addKey = (key: string) => {
    setKeys(prev => [...prev, key]);
  };

  const removeKey = (key: string) => {
    setKeys(prev =>
      prev.filter(val => {
        if (val === key) return false;
        return true;
      }),
    );
  };

  return (
    <FavoritesBookContext.Provider value={{keys, addKey, removeKey}}>
      {children}
    </FavoritesBookContext.Provider>
  );
}
