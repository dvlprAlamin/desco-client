import React, { useState } from 'react';
import { TableCell, ButtonGroup, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useThisContext } from '../../context';

const BillsAction = ({ billsUpdateHandler, bill }) => {
    const { setCurrentBills } = useThisContext()
    const [loading, setLoading] = useState(false)
    const billsDeleteHandler = id => {
        setLoading(true)
        axios.delete(`http://localhost:5000/api/delete-billing/${id}`)
            .then(res => {
                if (res.data) {
                    setCurrentBills(preValue => preValue.filter(item => item._id !== id))
                    // setOpenPopup({
                    //     status: true,
                    //     severity: 'success',
                    //     message: 'Bill deleted successfully'
                    // })
                }
                setLoading(false)
            })
            .catch(err => {
                // setOpenPopup({
                //     status: true,
                //     severity: 'error',
                //     message: err.message
                // })
                setLoading(false)
            })
    }
    return (
        <TableCell align="center">
            <ButtonGroup size='small' variant="contained">
                <Button
                    color="primary"
                    onClick={() => billsUpdateHandler(bill)}
                >Edit</Button>
                <Button
                    sx={{ position: 'relative' }}
                    color="secondary"
                    onClick={() => billsDeleteHandler(bill._id)}
                >Delete


                    {loading && <CircularProgress style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, margin: 'auto' }} size={22} />}
                </Button>
            </ButtonGroup>
        </TableCell>
    );
};

export default BillsAction;