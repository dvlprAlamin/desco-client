import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Popup({ openPopup, setOpenPopup }) {
    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar
                open={openPopup?.status}
                autoHideDuration={6000}
                onClose={() => setOpenPopup({ ...openPopup, status: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setOpenPopup({ ...openPopup, status: false })} severity={openPopup?.severity} sx={{ width: '100%' }}>
                    {openPopup?.message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}