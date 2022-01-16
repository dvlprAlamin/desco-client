import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { LinearProgress, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useThisContext } from '../../context';
import { useDispatch } from 'react-redux';
import { addBill, updateBill } from '../../redux/billsSlice';

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
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const handleChange = e => {
        const newData = { ...formData };
        newData[e.target.name] = e.target.value;
        setFormData(newData);
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (billModal.data) {
            const data = { ...formData, _id: billModal.data._id };
            dispatch(updateBill(data, data))
            setBillModal({
                open: false,
                data: null
            })
        } else {
            dispatch(addBill(formData, formData))
            setBillModal({
                open: false,
                data: null
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
                            type={'text'}
                            label="Full Name"
                            margin="dense"
                            defaultValue={billModal.data ? billModal.data.name : ''}
                            onChange={handleChange}
                            required
                        />

                        <TextField
                            variant="outlined"
                            fullWidth
                            type={'email'}
                            name="email"
                            label="Email"
                            margin="dense"
                            defaultValue={billModal.data ? billModal.data.email : ''}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            name="phone"
                            label="Phone"
                            type={'number'}
                            defaultValue={billModal.data ? billModal.data.phone : ''}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            type={'number'}
                            name="amount"
                            label="Paid Amount"
                            defaultValue={billModal.data ? billModal.data.amount : ''}
                            onChange={handleChange}
                            required
                        />

                        <Button variant="contained" type="submit" style={{ marginTop: 10 }}>Save</Button>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
};

export default AddBill;