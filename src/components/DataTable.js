import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { TableContainer, Container } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper, TextField, Typography, ButtonGroup, Box, Button, Pagination } from '@mui/material';
import { styled } from '@mui/styles';
import AddBill from './AddBill';
import { useEffect } from 'react';
import axios from 'axios';
import Popup from './Popup';
import { useThisContext } from '../context';


const StyledTableRow = styled(TableRow)({
    '& th,td': {
        padding: '10px',
    },
    '&:nth-of-type(odd)': {
        backgroundColor: '#eee',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
});

const DataTable = () => {
    const { currentBills, setCurrentBills } = useThisContext();
    const [billModal, setBillModal] = useState({
        open: false,
        data: null
    });
    const [openPopup, setOpenPopup] = useState(false)
    const [bills, setBills] = useState([]);
    // const [currentBills, setCurrentBills] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const billPerPage = 10;
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        // setPage(value)
    };
    useEffect(() => {
        axios.get(`http://localhost:5000/api/billing-list?page=${currentPage - 1}&size=${billPerPage}`)
            .then(res => {
                setCurrentBills(res.data)
            })
    }, [currentPage])
    useEffect(() => {
        axios.get('http://localhost:5000/api/billing-list')
            .then(res => {
                setBills(res.data)
            })
    }, [])
    const billsDeleteHandler = id => {
        axios.delete(`http://localhost:5000/api/delete-billing/${id}`)
            .then(res => {
                if (res.data) {
                    setCurrentBills(preValue => preValue.filter(item => item._id !== id))
                    setOpenPopup({
                        status: true,
                        severity: 'success',
                        message: 'Bill deleted successfully'
                    })
                }
            })
            .catch(err => {
                setOpenPopup({
                    status: true,
                    severity: 'error',
                    message: err.message
                })
            })
    }

    const billsUpdateHandler = data => {
        setBillModal({
            open: true,
            data: data
        })
    }
    return (
        <Container>
            <Paper variant='outlined' sx={{ p: 1, my: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ mx: 1 }}>Billing</Typography>
                    <TextField
                        size='small'
                        label='Search'
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
            <TableContainer component={Paper} variant='outlined'>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow sx={{ background: 'cyan' }}>
                            <TableCell>Billing ID</TableCell>
                            <TableCell align="center">Full Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Phone</TableCell>
                            <TableCell align="center">Paid Amount</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentBills.map(({ _id, name, email, phone, amount }) => (
                            <StyledTableRow key={_id}>
                                <TableCell component="th" scope="row">
                                    {_id || 'Generating Id'}
                                </TableCell>

                                <TableCell align="center">{name}</TableCell>
                                <TableCell align="center">{email}</TableCell>
                                <TableCell align="center">{phone}</TableCell>
                                <TableCell align="center">{amount}</TableCell>
                                <TableCell align="center">
                                    <ButtonGroup size='small' variant="contained">
                                        <Button
                                            color="primary"
                                            onClick={() => billsUpdateHandler({ _id, name, email, phone, amount })}
                                        >Edit</Button>
                                        <Button
                                            color="secondary"
                                            onClick={() => billsDeleteHandler(_id)}
                                        >Delete</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                sx={{ display: 'flex', justifyContent: 'center', my: 2 }}
                color="primary"
                count={Math.ceil(bills.length / billPerPage)}
                page={currentPage}
                onChange={handlePageChange}
            />
        </Container >
    );
};

export default DataTable;