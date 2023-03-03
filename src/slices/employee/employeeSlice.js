import { createSlice } from "@reduxjs/toolkit";


const initialState = {
        email: ''
}

const employeeSlice = createSlice({
        name: 'employee',
        initialState,
        reducers: {
                getUserEmail: (state, {payload}) => {
                        state.email = payload.email
                }
        }
})

export const {getUserEmail} = employeeSlice.actions

export default employeeSlice.reducer