import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// const fetchUserById = createAsyncThunk(
//     'users/fetchByIdStatus',
//     async (userId, thunkAPI) => {
//       const response = await userAPI.fetchById(userId)
//       return response.data
//     }
//   )
export const billsReducer = createSlice({
    name: 'bills',
    initialState: {
        bills: [],
        currentPage: 1
    },
    reducers: {
        increment: (state) => {
            state.value += 1
        }
    },
    // extraReducers: (builder) => {
    //     // Add reducers for additional action types here, and handle loading state as needed
    //     builder.addCase(fetchUserById.fulfilled, (state, action) => {
    //       // Add user to the state array
    //       state.entities.push(action.payload)
    //     })
    //   },
})

// Action creators are generated for each case reducer function
export const { increment } = billsReducer.actions

export default billsReducer.reducer