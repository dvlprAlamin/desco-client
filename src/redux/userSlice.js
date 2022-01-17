import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getUser = createAsyncThunk(
    'user/getUser',
    async (uri) => {
        const response = await axios.get('')
        return response.data
    }
)

export const userReducer = createSlice({
    name: 'user',
    initialState: {
        name: '',
        email: ''
    },
    reducers: {
        setUser: (state, { payload }) => {
            state.email = payload;
        }
    },
    extraReducers: (builder) => {
        // fetch bills
        builder.addCase(getUser.fulfilled, (state, { payload }) => {

        })

    },
})

// Action creators are generated for each case reducer function
export const { setUser } = userReducer.actions

export default userReducer.reducer