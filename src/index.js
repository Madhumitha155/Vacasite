import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Spinner from './utility/Spinner/Spinner';
import { Provider } from 'react-redux';
import reduxPromise from 'redux-promise';
import {createStore,applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers/rootReducer';
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler:autoMergeLevel2,
  blacklist:['siteModal',]}
const persistedReducer = persistReducer(persistConfig, rootReducer);
const theStore=applyMiddleware(reduxPromise)(createStore)(persistedReducer);
const persistor=persistStore(theStore);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={theStore}>
    <PersistGate loading={<Spinner/>} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>
);
reportWebVitals();
