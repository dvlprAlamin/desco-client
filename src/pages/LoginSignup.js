import { Button, Container, Grid, Paper, Typography, TextField, LinearProgress } from '@mui/material';
import React, { useState } from 'react';
import loginImg from './../img/login.jpg';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { addAlert } from '../redux/alertSlice';
const LoginSignup = () => {
    const history = useHistory();
    const { pathname } = useLocation();
    const [loading, setLoading] = useState(false)
    const [loginInfo, setLoginInfo] = useState({})
    const dispatch = useDispatch()
    const handleChange = e => {
        const newLoginInfo = { ...loginInfo };
        newLoginInfo[e.target.name] = e.target.value;
        setLoginInfo(newLoginInfo)
    }
    const signupHandler = e => {
        e.preventDefault();
        setLoading(true)
        axios.post('https://stormy-cliffs-96809.herokuapp.com/api/registration', loginInfo)
            .then(res => {
                if (res.data?.acknowledged) {
                    dispatch(addAlert({
                        severity: 'success',
                        message: 'Account Created Successfully',
                    }))
                    e.target.reset();
                    history.push('/login')
                };
                setLoading(false)
            }).catch(err => {
                setLoading(false);
                dispatch(addAlert({
                    severity: 'error',
                    message: err.response?.data?.message || err.message,
                }))
            })
    }
    const loginHandler = e => {
        e.preventDefault();
        setLoading(true)
        axios.post('https://stormy-cliffs-96809.herokuapp.com/api/login', loginInfo)
            .then(res => {
                if (res.data?.status) {
                    localStorage.setItem('token', res.data?.token);
                    dispatch(setUser(res.data?.email));
                    dispatch(addAlert({
                        severity: 'success',
                        message: 'Login Successful',
                    }))
                    history.push('/')
                };
                setLoading(false)
            }).catch(err => {
                setLoading(false);
                dispatch(addAlert({
                    severity: 'error',
                    message: err.response?.data?.message || err.message,
                }))
            })
    }
    return (
        <>
            <Container>
                <Typography variant="h2" sx={{ mt: 3, textAlign: 'center', color: '#4f51fe' }}> Welcome to Desco</Typography>
                <Grid container spacing={4}>
                    <Grid item sm={12} md={6} lg={6} style={{ minHeight: 600, display: 'flex', alignItems: 'center' }}>
                        <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', position: 'relative' }}>
                            <Typography color='#4f51fe' variant="h5" textAlign="center">{pathname === '/signup' ? 'Sign up' : 'Login'}</Typography>
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
                                        required
                                    />}
                                <TextField
                                    label="Email"
                                    fullWidth
                                    margin="normal"
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    label="Password"
                                    fullWidth
                                    margin="normal"
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                    required
                                />
                                <Button variant="contained" type="submit" fullWidth sx={{ my: 2, py: 1 }}>{pathname === '/signup' ? 'Sign up' : 'Login'}</Button>

                                {pathname === '/signup' ?
                                    <Typography variant="body1">Already have an account? <Link to="/login">Login</Link> </Typography> :
                                    <Typography variant="body1">Need an account? <Link to="/signup">Sign up</Link> </Typography>}
                            </form>
                            {loading && <LinearProgress sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }} />}
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