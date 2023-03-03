import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';
import persistedReducer from './persist';
import employeeSlice from './employee/employeeSlice';

const reducers = combineReducers({
	user: userReducer,
	employee: employeeSlice,
	persist: persistedReducer,
});

const rootReducer = (state, action) => {
	return reducers(state, action);
};

export default rootReducer;
