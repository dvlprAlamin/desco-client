import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Typography, Container } from '@mui/material';
const Navigation = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Container>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h6">
                                Desco
                            </Typography>
                            <Typography variant="h6">
                                Paid Total: {0}
                            </Typography>
                        </Box>
                    </Container>

                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navigation;