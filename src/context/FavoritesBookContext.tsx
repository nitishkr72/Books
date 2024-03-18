import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState} from 'react';

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

const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error storing data in AsyncStorage:', error);
  }
};

export function FavoritesBookContextProvider({children}: any) {
  const [keys, setKeys] = useState<string[]>([]);

  const addKey = (key: string) => {
    setKeys(prev => [key, ...prev]);
  };

  const removeKey = (key: string) => {
    setKeys(prev =>
      prev.filter(val => {
        if (val === key) return false;
        return true;
      }),
    );
  };

  const getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        try {
          setKeys(JSON.parse(value));
        } catch (err) {
          console.error('Error retrieving data from AsyncStorage:', err);
        }
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    storeData('BOOK_ID', keys);
  }, [keys]);

  useEffect(() => {
    getData('BOOK_ID');
  }, []);

  return (
    <FavoritesBookContext.Provider value={{keys, addKey, removeKey}}>
      {children}
    </FavoritesBookContext.Provider>
  );
}
