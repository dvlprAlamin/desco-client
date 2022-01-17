import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomAlert() {
    const alerts = useSelector(state => state.alert);
    const [alert, setAlert] = useState({ severity: '', message: '' })
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (alerts.length > 0) {
            setAlert(alerts[alerts.length - 1]);
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 5000);
        }
    }, [alerts])
    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar
                open={show}
                autoHideDuration={5000}
                onClose={() => setShow(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert onClose={() => setShow(false)} severity={alert?.severity} sx={{ width: '100%' }}>
                    {alert?.message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}