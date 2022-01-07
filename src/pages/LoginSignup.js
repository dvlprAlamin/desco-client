import { Button, Container, Grid, Paper, Typography, TextField } from '@mui/material';
import React, { useState } from 'react';
import loginImg from './../img/login.jpg'
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useThisContext } from '../context';
const LoginSignup = () => {
    const { userEmail, setUserUserEmail } = useThisContext();
    const history = useHistory();
    const { state, pathname } = useLocation();

    const [loginInfo, setLoginInfo] = useState({})
    const handleChange = e => {
        const newLoginInfo = { ...loginInfo };
        newLoginInfo[e.target.name] = e.target.value;
        setLoginInfo(newLoginInfo)
    }
    const signupHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/registration', loginInfo)
            .then(res => {
                console.log(res.data);
            })
        // console.log(loginInfo);
    }
    const loginHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/login', loginInfo)
            .then(res => {
                if (res.data?.status) {
                    localStorage.setItem('token', res.data?.token);
                    setUserUserEmail(res.data?.email)
                    history.push('/')
                };
            })
    }
    return (
        <>
            <Container>
                <Typography variant="h2" sx={{ mt: 3, textAlign: 'center' }}> Welcome to Desco</Typography>
                <Grid container spacing={4}>
                    <Grid item sm={12} md={6} lg={6} style={{ minHeight: 600, display: 'flex', alignItems: 'center' }}>
                        <Paper variant="outlined" style={{ padding: 20, textAlign: 'center' }}>
                            <Typography color="primary" variant="h5" textAlign="center">{pathname === '/signup' ? 'Sign up' : 'Login'}</Typography>
                            <form onSubmit={pathname === '/signup' ? signupHandler : loginHandler}>
                                {
                                    pathname === '/signup' &&
                                    <TextField
                                        label="Name"
                                        fullWidth
                                        margin="normal"
                                        name="name"
                                        type="text"
                                        onChange={handleChange}
                                    />}
                                <TextField
                                    label="Email"
                                    fullWidth
                                    margin="normal"
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Password"
                                    fullWidth
                                    margin="normal"
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                />
                                <Button variant="contained" type="submit" fullWidth sx={{ my: 2, py: 1 }}>{pathname === '/signup' ? 'Sign up' : 'Login'}</Button>

                                {pathname === '/signup' ?
                                    <Typography variant="body1">Already have an account? <Link to="/login">Login</Link> </Typography> :
                                    <Typography variant="body1">Need an account? <Link to="/signup">Sign up</Link> </Typography>}
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item sm={12} md={6} lg={6}>
                        <img width="100%" src={loginImg} alt="" />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default LoginSignup;