/* eslint-disable import/no-anonymous-default-export */
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers';
import employeeSlice from './employee/employeeSlice';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['persist'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = configureStore({
	reducer: persistedReducer,
	employeen: employeeSlice,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

let persistor = persistStore(store);

export { store, persistor };
