
import { configureStore } from '@reduxjs/toolkit'
import planoReducer from './PlanoContas'
<<<<<<< Updated upstream
=======
import Language from './Language';
import Search from './Search';
>>>>>>> Stashed changes

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}
<<<<<<< Updated upstream
const persistedReducer = persistReducer(persistConfig, planoReducer)
=======

const persistConfig1 = {
  key: 'language',
  storage,
}

const persistedReducer = persistReducer(persistConfig,planoReducer)
const persistedReducer1 = persistReducer(persistConfig1,Language)

const rootReducer = combineReducers({
  planoReducer: persistedReducer,
  Language: persistedReducer1,
  search : Search
});
>>>>>>> Stashed changes

export default () => {
 const store = configureStore({
    reducer: persistedReducer
  }) 
  const persistor = persistStore(store)
  return { store, persistor }
}
