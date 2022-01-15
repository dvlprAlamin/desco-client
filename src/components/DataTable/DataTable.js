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
import { useDispatch } from 'react-redux';
import { deleteBill, fetchBills } from '../../redux/billsSlice';
import { useSelector } from 'react-redux';


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
    const { openPopup, setOpenPopup } = useThisContext();
    const [billModal, setBillModal] = useState({
        open: false,
        data: null
    });
    const [currentPage, setCurrentPage] = useState(1)
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        // setPage(value)
    };
    const dispatch = useDispatch();
    const bills = useSelector(state => state.bills.bills)
    const billPerPage = useSelector(state => state.bills.billPerPage)
    const pageCount = useSelector(state => state.bills.pageCount)
    const status = useSelector(state => state.bills.status)
    const state = useSelector(state => state)

    const fetchBillUri = `http://localhost:5000/api/billing-list?page=${currentPage - 1}&size=${billPerPage}`
    useEffect(() => {
        dispatch(fetchBills(fetchBillUri))
    }, [currentPage])

    useEffect(() => {
        if (status === 'fulfilled') {
            setOpenPopup({
                status: true,
                severity: 'success',
                message: 'Bill deleted successfully'
            })
        } else if (status === 'rejected') {
            setOpenPopup({
                status: true,
                severity: 'error',
                message: state.error
            })
        }
    }, [status])

    const billsDeleteHandler = id => {
        dispatch(deleteBill(id, id))
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
                        {bills?.map(({ _id, name, email, phone, amount }) => (
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