import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchBills = createAsyncThunk(
    'bills/fetchBills',
    async (uri) => {
        const headers = { 'headers': { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
        const response = await axios.get(uri, headers)
        return response.data
    }
)
export const fetchTotalBills = createAsyncThunk(
    'bills/fetchTotalBills',
    async () => {
        const headers = { 'headers': { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
        const response = await axios.get('http://localhost:5000/api/billing-list', headers)
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
        return response.data
    }
)
export const billsReducer = createSlice({
    name: 'bills',
    initialState: {
        bills: [],
        count: 0,
        paidTotal: 0,
        billPerPage: 10,
        pageCount: 1,
        billOnHold: {},
        status: {
            add: 'idle',
            delete: 'idle',
            update: 'idle'
        },
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        // fetch bills
        builder.addCase(fetchBills.fulfilled, (state, { payload }) => {
            state.bills = payload.bills;
            state.count = payload.count;
            state.pageCount = Math.ceil(payload.count / state.billPerPage);
        })

        //fetch all bills 
        builder.addCase(fetchTotalBills.fulfilled, (state, { payload }) => {
            state.paidTotal = +payload.bills?.reduce((preValue, currValue) => preValue + +currValue.amount, 0).toFixed(2);
        })

        // Add bill reducers
        builder.addCase(addBill.pending, (state, { meta }) => {
            state.bills.unshift(meta.arg);
            state.pageCount = Math.ceil((state.count + 1) / state.billPerPage);
            state.status = 'pending';
            state.paidTotal += +meta.arg.amount;
        })
        builder.addCase(addBill.fulfilled, (state, { payload }) => {
            state.bills[0]._id = payload.insertedId;
            state.status = 'fulfilled';
        })
        builder.addCase(addBill.rejected, (state, { error, meta }) => {
            state.bills.shift();
            state.pageCount = Math.ceil((state.count - 1) / state.billPerPage);
            state.status = 'rejected';
            state.error = error.message;
            state.paidTotal -= +meta.arg.amount;

        })

        // Update bill Reducers
        builder.addCase(updateBill.pending, (state, { meta }) => {
            state.billOnHold = state.bills.find(bill => bill._id === meta.arg._id);
            const updatedBill = { ...state.billOnHold }
            meta.arg.name && (updatedBill.name = meta.arg.name);
            meta.arg.email && (updatedBill.email = meta.arg.email);
            meta.arg.phone && (updatedBill.phone = meta.arg.phone);
            meta.arg.amount && ((updatedBill.amount = meta.arg.amount) && (state.paidTotal += (+meta.arg.amount - +state.billOnHold.amount)));
            state.bills = [updatedBill, ...state.bills.filter(bill => bill._id !== meta.arg._id)];
            state.status = 'pending'
        })
        builder.addCase(updateBill.fulfilled, (state, { payload, meta }) => {
            state.status = 'fulfilled'
            state.billOnHold = {};
        })
        builder.addCase(updateBill.rejected, (state, { meta, error }) => {
            state.bills = [state.billOnHold, ...state.bills.filter(bill => bill._id !== meta.arg._id)];
            meta.arg.amount && (state.paidTotal += (+state.billOnHold.amount - +meta.arg.amount));
            state.status = 'rejected'
            state.billOnHold = {};
            state.error = error.message;
        })
        //  Delete bill Reducers
        builder.addCase(deleteBill.pending, (state, { meta }) => {
            state.billOnHold = state.bills.find(bill => bill._id === meta.arg)
            state.bills = state.bills.filter(bill => bill._id !== meta.arg);
            state.pageCount = Math.ceil((state.count - 1) / state.billPerPage);
            state.paidTotal -= +state.billOnHold.amount;
            state.status = 'pending';
        })
        builder.addCase(deleteBill.fulfilled, (state, { meta }) => {
            state.billOnHold = {};
            state.status = 'fulfilled'
        })
        builder.addCase(deleteBill.rejected, (state, { error }) => {
            state.error = error.message;
            state.bills.unshift(state.billOnHold);
            state.pageCount = Math.ceil((state.count + 1) / state.billPerPage);
            state.paidTotal += +state.billOnHold.amount;
            state.billOnHold = {};
            state.status = 'rejected';
        })
    },
})

// Action creators are generated for each case reducer function


export default billsReducer.reducer