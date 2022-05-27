import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
};

export const persistSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, { payload }) => {
			state.user = payload;
		},
	},
});

export const persistSelector = (state) => state.persist;

// Action creators are generated for each case reducer function
export const { setUser } = persistSlice.actions;

export default persistSlice.reducer;
