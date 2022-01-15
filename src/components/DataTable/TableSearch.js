import React, { useEffect, useState } from 'react';
import { useThisContext } from '../../context';
import { Container, Paper, Box, Typography, TextField, Button } from '@mui/material'
import AddBill from './AddBill';
import Popup from '../Popup';
const TableSearch = ({ openPopup, setOpenPopup, billModal, setBillModal }) => {
    const { currentBills, setCurrentBills, searchedBills, setSearchedBills } = useThisContext()
    const [query, setQuery] = useState('');


    useEffect(() => {
        // if (query) {
        setSearchedBills(currentBills.filter(bill =>
            bill.name?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
            bill.email?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
            bill.phone?.toLowerCase().indexOf(query.toLowerCase()) > -1));
        // }

    }, [query])
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
                    setOpenPopup={setOpenPopup}
                    billModal={billModal}
                    setBillModal={setBillModal}
                />
            </Paper>
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            />
        </>
    );
};

export default TableSearch;