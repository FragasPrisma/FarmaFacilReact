
import { configureStore } from '@reduxjs/toolkit'
import planoReducer from './PlanoContas'

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, planoReducer)

export default () => {
 const store = configureStore({
    reducer: persistedReducer
  }) 
  const persistor = persistStore(store)
  return { store, persistor }
}
