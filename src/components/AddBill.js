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

const AddBill = ({ openBillModal, setOpenBillModal, setOpenPopup }) => {
    const [formData, setFormData] = useState({});
    const { currentBills, setCurrentBills } = useThisContext()
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
        setCurrentBills([formData, ...data])
        axios.post('http://localhost:5000/api/add-billing', formData)
            .then(res => {
                if (res.data) {
                    setOpenBillModal(false)
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
                    message: err.message
                })
                setOpenBillModal(false)
                setLoading(false)
                setCurrentBills([...data])
            })
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openBillModal}
            onClose={() => setOpenBillModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >

            <Fade in={openBillModal}>
                <Box sx={style}>
                    {loading && <LinearProgress />}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="name"
                            label="Full Name"
                            margin="dense"
                            onChange={handleChange}
                            required
                        />

                        <TextField
                            variant="outlined"
                            fullWidth
                            name="email"
                            label="Email"
                            margin="dense"
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            name="phone"
                            label="Phone"
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            name="amount"
                            label="Paid Amount"
                            onChange={handleChange}
                            required
                        />

                        <Button variant="contained" type="submit" style={{ marginTop: 10 }}>Add</Button>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
};

export default AddBill;