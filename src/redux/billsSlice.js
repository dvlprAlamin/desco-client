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
export const addBill = createAsyncThunk(
    'bills/addBill',
    async (data) => {
        const response = await axios.post('http://localhost:5000/api/add-billing', data)
        return response.data
    }
)
export const updateBill = createAsyncThunk(
    'bills/updateBill',
    async (data) => {
        const { _id, ...restData } = data;
        const response = await axios.put(`http://localhost:5000/api/update-billing/${_id}`, restData)
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
        billOnHold: {},
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

        // Add bill reducers
        builder.addCase(addBill.pending, (state, { meta }) => {
            console.log(meta);
            state.bills.unshift(meta.arg);
            state.pageCount = Math.ceil((state.count + 1) / state.billPerPage);
            state.status = 'pending'
        })
        builder.addCase(addBill.fulfilled, (state, { payload }) => {
            state.bills[0]._id = payload.insertedId;
            state.status = 'fulfilled'
        })
        builder.addCase(addBill.rejected, (state, { error }) => {
            state.bills.shift();
            state.pageCount = Math.ceil((state.count - 1) / state.billPerPage);
            state.status = 'rejected';
            state.error = error.message;
        })

        // Update bill Reducers
        builder.addCase(updateBill.pending, (state, { meta }) => {
            state.billOnHold = state.bills.find(bill => bill._id === meta.arg._id);
            const updatedBill = { ...state.billOnHold }
            meta.arg.name && (updatedBill.name = meta.arg.name);
            meta.arg.email && (updatedBill.email = meta.arg.email);
            meta.arg.phone && (updatedBill.phone = meta.arg.phone);
            meta.arg.amount && (updatedBill.name = meta.arg.name);
            state.bills = [updatedBill, ...state.bills.filter(bill => bill._id !== meta.arg._id)];
            state.status = 'pending'
        })
        builder.addCase(updateBill.fulfilled, (state, { payload, meta }) => {
            state.status = 'fulfilled'
            state.billOnHold = {};
        })
        builder.addCase(updateBill.rejected, (state, { meta }) => {
            state.bills = [state.billOnHold, ...state.bills.filter(bill => bill._id !== meta.arg._id)];
            state.status = 'rejected'
            state.billOnHold = {};
        })
        //  Delete bill Reducers
        builder.addCase(deleteBill.pending, (state, { meta }) => {
            state.billOnHold = state.bills.find(bill => bill._id === meta.arg)
            state.bills = state.bills.filter(bill => bill._id !== meta.arg);
            state.pageCount = Math.ceil((state.count - 1) / state.billPerPage);
            state.status = 'pending'
        })
        builder.addCase(deleteBill.fulfilled, (state, { meta }) => {
            state.billOnHold = {};
            state.status = 'fulfilled'
        })
        builder.addCase(deleteBill.rejected, (state, { error }) => {
            state.error = error.message;
            state.bills.bills.unshift(state.billOnHold);
            state.pageCount = Math.ceil((state.count + 1) / state.billPerPage);
            state.billOnHold = {};
            state.status = 'rejected'
        })
    },
})

// Action creators are generated for each case reducer function
export const { increment } = billsReducer.actions

export default billsReducer.reducer