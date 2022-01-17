import { createSlice } from '@reduxjs/toolkit'
import { addBill, deleteBill, fetchBills, fetchTotalBills, updateBill } from './billsSlice';


export const alertReducer = createSlice({
    name: 'alert',
    initialState: [],
    reducers: {
        addAlert: (state, { payload }) => {
            state.push(payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBills.rejected, (state, { error }) => {
            state.push({
                severity: 'error',
                message: error.message
            })
        })
        builder.addCase(fetchTotalBills.rejected, (state, { error }) => {
            state.push({
                severity: 'error',
                message: error.message
            })
        })

        // Add bill reducers
        builder.addCase(addBill.fulfilled, (state, { payload }) => {
            state.push({
                severity: 'success',
                message: 'Bill Added Successfully',
            })

        })
        builder.addCase(addBill.rejected, (state, { error, meta }) => {
            state.push({
                severity: 'error',
                message: error.message
            })
        })

        // Update bill Reducers
        builder.addCase(updateBill.fulfilled, (state, { payload, meta }) => {
            state.push({
                severity: 'success',
                message: 'Bill Updated Successfully',
            })
        })
        builder.addCase(updateBill.rejected, (state, { meta, error }) => {
            state.push({
                severity: 'error',
                message: error.message
            })
        })
        //  Delete bill Reducers
        builder.addCase(deleteBill.fulfilled, (state, { meta }) => {
            state.push({
                severity: 'success',
                message: 'Bill deleted Successfully',
            })
        })
        builder.addCase(deleteBill.rejected, (state, { error }) => {
            state.push({
                severity: 'error',
                message: error.message
            })
        })
    },
})

// Action creators are generated for each case reducer function
export const { addAlert } = alertReducer.actions

export default alertReducer.reducer