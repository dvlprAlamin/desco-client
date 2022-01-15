import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { TableContainer, Container } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper, ButtonGroup, Button, Pagination } from '@mui/material';
import { styled } from '@mui/styles';
import AddBill from './AddBill';
import { useEffect } from 'react';
import axios from 'axios';
import Popup from './../Popup';
import { useThisContext } from '../../context';
import TableSearch from './TableSearch';


const StyledTableRow = styled(TableRow)({
    '& th,td': {
        padding: '10px 15px',
    },
    '&:nth-of-type(odd)': {
        backgroundColor: '#eee',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
});
const HeadingCell = styled(TableCell)({
    color: '#fff',
    fontWeight: 600
});
const DataTable = () => {
    const { billPerPage, pageCount, setPageCount, billCount, setBillCount, openPopup, setOpenPopup, currentBills, setCurrentBills, setSearchedBills, searchedBills } = useThisContext();
    const [billModal, setBillModal] = useState({
        open: false,
        data: null
    });
    // const [loading, setLoading] = useState(false)
    // const [openPopup, setOpenPopup] = useState(false)
    // const [bills, setBills] = useState([]);
    // const [currentBills, setCurrentBills] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    // const billPerPage = 10;
    // const [pageCount, setPageCount] = useState(0);
    // const [billCount, setBillCount] = useState(0)
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        // setPage(value)
    };
    useEffect(() => {
        const AuthString = `Bearer ${localStorage.getItem('token')}`
        axios.get(`http://localhost:5000/api/billing-list?page=${currentPage - 1}&size=${billPerPage}`, { 'headers': { 'Authorization': AuthString } })
            .then(res => {
                setCurrentBills(res.data?.bills);
                setSearchedBills(res.data?.bills);
                setPageCount(Math.ceil(res.data?.count / billPerPage))
                setBillCount(res.data?.count)
            })
    }, [currentPage])
    console.log(billCount);
    const billsDeleteHandler = id => {
        let deletedBill = currentBills.find(bill => bill._id === id);
        setSearchedBills(preValue => preValue.filter(bill => bill._id !== id))
        setPageCount(Math.ceil((billCount - 1) / billPerPage))
        // setLoading(true)
        axios.delete(`https://stormy-cliffs-96809.herokuapp.com/api/delete-billing/${id}`)
            .then(res => {
                if (res.data) {
                    // setCurrentBills(preValue => preValue.filter(bill => bill._id !== id))
                    setOpenPopup({
                        status: true,
                        severity: 'success',
                        message: 'Bill deleted successfully'
                    })
                }
                // setLoading(false)
            })
            .catch(err => {
                setOpenPopup({
                    status: true,
                    severity: 'error',
                    message: err.message
                })
                setSearchedBills(preValue => [deletedBill, ...preValue]);
                setPageCount(Math.ceil(billCount / billPerPage))
                // setLoading(false)
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
            <TableSearch
                setBillModal={setBillModal}
                billModal={billModal}
                setOpenPopup={setOpenPopup}
                openPopup={openPopup}
            />
            <TableContainer component={Paper} variant='outlined'>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow sx={{ background: '#4f51fe' }}>
                            <HeadingCell>Billing ID</HeadingCell>
                            <HeadingCell align="center">Full Name</HeadingCell>
                            <HeadingCell align="center">Email</HeadingCell>
                            <HeadingCell align="center">Phone</HeadingCell>
                            <HeadingCell align="center">Paid Amount</HeadingCell>
                            <HeadingCell align="center">Action</HeadingCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchedBills?.map(({ _id, name, email, phone, amount }) => (
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
                count={pageCount}
                page={currentPage}
                onChange={handlePageChange}
            />
        </Container >
    );
};

export default DataTable;