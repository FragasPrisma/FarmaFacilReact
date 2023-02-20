
import { configureStore , combineReducers } from '@reduxjs/toolkit'
import planoReducer from './PlanoContas'
import Language from './Language';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}

const persistConfig1 = {
  key: 'language',
  storage,
}

const persistedReducer = persistReducer(persistConfig,planoReducer)
const persistedReducer1 = persistReducer(persistConfig1,Language)

const rootReducer = combineReducers({
  planoReducer: persistedReducer,
  Language: persistedReducer1,
});

export default () => {
 const store = configureStore({
    reducer: rootReducer,
  }) 
  const persistor = persistStore(store)
  return { store, persistor }
}
