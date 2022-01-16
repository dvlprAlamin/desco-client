import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Typography, Container } from '@mui/material';
import { useEffect } from 'react';
import { fetchTotalBills } from '../redux/billsSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const Navigation = () => {
    const dispatch = useDispatch()
    const total = useSelector(state => state.bills.paidTotal)
    useEffect(() => {
        dispatch(fetchTotalBills())
    }, [])
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: '#4f51fe' }}>
                <Toolbar>
                    <Container>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h6">
                                Desco
                            </Typography>
                            <Typography variant="h6">
                                Paid Total: {total || 0}
                            </Typography>
                        </Box>
                    </Container>

                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navigation;