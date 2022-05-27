import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';
import persistedReducer from './persist';

const reducers = combineReducers({
	user: userReducer,
	persist: persistedReducer,
});

const rootReducer = (state, action) => {
	return reducers(state, action);
};

export default rootReducer;
