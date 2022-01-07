import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Grid, LinearProgress, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useThisContext } from '../context';

const style = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    maxHeight: 'fit-content',
    maxWidth: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: 4,
};

const AddBill = ({ billModal, setBillModal, setOpenPopup }) => {
    const [formData, setFormData] = useState({});
    const { currentBills, setCurrentBills, setPageCount, billPerPage, bills } = useThisContext()
    const [loading, setLoading] = useState(false)

    const handleChange = e => {
        const newData = { ...formData };
        newData[e.target.name] = e.target.value;
        setFormData(newData);
    }
    const handleSubmit = e => {
        setLoading(true)
        e.preventDefault();
        console.log(formData);
        let data = currentBills;
        if (billModal.data) {
            setCurrentBills([{ ...formData, _id: billModal.data._id }, ...data.filter(bill => bill._id !== billModal.data._id)])
            axios.put(`http://localhost:5000/api/update-billing/${billModal.data._id}`, formData)
                .then(res => {
                    if (res.data) {
                        setBillModal({
                            open: false,
                            data: null
                        })
                        setLoading(false);
                        console.log(res.data);
                        setOpenPopup({
                            status: true,
                            severity: 'success',
                            message: 'Bill updated successfully'
                        })
                    }
                })
                .catch(err => {
                    setOpenPopup({
                        status: true,
                        severity: 'error',
                        message: err.message
                    })
                    setBillModal({
                        open: false,
                        data: null
                    })
                    setLoading(false)
                    setCurrentBills([...data])
                })

        } else {
            setCurrentBills([formData, ...data])
            setPageCount(Math.ceil((bills.length + 1) / billPerPage))
            axios.post('http://localhost:5000/api/add-billing', formData)
                .then(res => {
                    console.log(res);
                    if (res.data) {
                        setBillModal({
                            open: false,
                            data: null
                        })
                        setLoading(false);
                        console.log(res.data);
                        setOpenPopup({
                            status: true,
                            severity: 'success',
                            message: 'Bill added successfully'
                        })
                        setCurrentBills([{ ...formData, _id: res.data.insertedId }, ...data])
                    }
                })
                .catch(err => {
                    setOpenPopup({
                        status: true,
                        severity: 'error',
                        message: err.response?.data || err.message
                    })
                    setBillModal({
                        open: false,
                        data: null
                    })
                    setLoading(false)
                    setCurrentBills([...data])
                    setPageCount(Math.ceil(bills.length / billPerPage))
                })
        }

    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={billModal.open}
            onClose={() => setBillModal({
                open: false,
                data: null
            })}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >

            <Fade in={billModal.open}>
                <Box sx={style}>
                    {loading && <LinearProgress />}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="name"
                            label="Full Name"
                            margin="dense"
                            defaultValue={billModal.data ? billModal.data.name : ''}
                            onChange={handleChange}
                        // required
                        />

                        <TextField
                            variant="outlined"
                            fullWidth
                            name="email"
                            label="Email"
                            margin="dense"
                            defaultValue={billModal.data ? billModal.data.email : ''}
                            onChange={handleChange}
                        // required
                        />
                        <TextField
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            name="phone"
                            label="Phone"
                            defaultValue={billModal.data ? billModal.data.phone : ''}
                            onChange={handleChange}
                        // required
                        />
                        <TextField
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            name="amount"
                            label="Paid Amount"
                            defaultValue={billModal.data ? billModal.data.amount : ''}
                            onChange={handleChange}
                        // required
                        />

                        <Button variant="contained" type="submit" style={{ marginTop: 10 }}>Save</Button>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
};

export default AddBill;