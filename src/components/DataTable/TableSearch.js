import React, { useEffect, useState } from 'react';
import { Paper, Box, Typography, TextField, Button } from '@mui/material'
import AddBill from './AddBill';
const TableSearch = ({ billModal, setBillModal }) => {
    const [query, setQuery] = useState('');


    // useEffect(() => {


    // }, [query])
    return (
        <>
            <Paper variant='outlined' sx={{ p: 1, my: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ mx: 1 }}>Billing</Typography>
                    <TextField
                        size='small'
                        label='Search'
                        onChange={e => setQuery(e.target.value)}
                    />
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setBillModal({
                        open: true,
                        data: null
                    })}
                >Add New Bill</Button>
                <AddBill
                    billModal={billModal}
                    setBillModal={setBillModal}
                />
            </Paper>
        </>
    );
};

export default TableSearch;