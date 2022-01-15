import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchBills = createAsyncThunk(
    'bills/fetchBills',
    async (fetchBillsUri) => {
        const headers = { 'headers': { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
        const response = await axios.get(fetchBillsUri, headers)
        return response.data
    }
)
export const deleteBill = createAsyncThunk(
    'bills/deleteBill',
    async (id) => {
        const response = await axios.delete(`http://localhost:5000/api/delete-billing/${id}`)
        console.log(response.data);
        return response.data
    }
)
export const billsReducer = createSlice({
    name: 'bills',
    initialState: {
        bills: [],
        count: 0,
        billPerPage: 10,
        pageCount: 1,
        deleteOnHold: {},
        status: 'idle',
        error: null
    },
    reducers: {
        increment: (state) => {
            state.value += 1
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchBills.fulfilled, (state, { payload }) => {
            // Add user to the state array
            state.bills = payload.bills;
            state.count = payload.count;
            state.pageCount = Math.ceil(payload.count / state.billPerPage);
        })
        builder.addCase(deleteBill.pending, (state, { payload, meta }) => {
            state.deleteOnHold = state.bills.bills.find(bill => bill._id === meta.arg)
            state.bills = { ...state.bills, bills: state.bills.bills.filter(bill => bill._id !== meta.arg) };
            state.pageCount = Math.ceil((state.bills.count - 1) / state.billPerPage);
            state.status = 'pending'
        })
        builder.addCase(deleteBill.fulfilled, (state, { meta }) => {
            state.deleteOnHold = {};
            state.status = 'fulfilled'
        })
        builder.addCase(deleteBill.rejected, (state, { meta, error }) => {
            state.error = error.message;
            state.bills.bills.unshift(state.deleteOnHold);
            state.pageCount = Math.ceil((state.bills.count + 1) / state.billPerPage);
            state.deleteOnHold = {};
            state.status = 'rejected'
        })
    },
})

// Action creators are generated for each case reducer function
export const { increment } = billsReducer.actions

export default billsReducer.reducer