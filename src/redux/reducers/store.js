import { applyMiddleware, createStore } from 'redux';
import rootReducer from './rootReducer';
import initState from '../state';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, initState(), composeWithDevTools(applyMiddleware(thunk)))
export const persistor = persistStore(store)
export default store