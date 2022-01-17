import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { TableContainer, Container } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper, ButtonGroup, Button, Pagination, Skeleton } from '@mui/material';
import { styled } from '@mui/styles';
import { useEffect } from 'react';
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
    const fetchBillUri = `https://stormy-cliffs-96809.herokuapp.com/api/billing-list?page=${currentPage - 1}&size=${billPerPage}`
    useEffect(() => {
        dispatch(fetchBills(fetchBillUri))
    }, [currentPage])

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
                        {bills.length > 0 ? bills.map(({ _id, name, email, phone, amount }) => (
                            <StyledTableRow key={_id || email}>
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
                            </StyledTableRow>)) :
                            [...Array.from(new Array(10))].map((item, i) => (
                                <StyledTableRow key={i}>
                                    <TableCell><Skeleton animation="wave" /></TableCell>
                                    <TableCell><Skeleton animation="wave" /></TableCell>
                                    <TableCell><Skeleton animation="wave" /></TableCell>
                                    <TableCell><Skeleton animation="wave" /></TableCell>
                                    <TableCell><Skeleton animation="wave" /></TableCell>
                                    <TableCell><Skeleton animation="wave" /></TableCell>
                                </StyledTableRow>
                            ))

                        }
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