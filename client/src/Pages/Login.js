import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Services/Contexts/AuthContext';
import API from '../Services/Api/Axios';
import _ from "lodash";
import { Alert, AlertTitle, Box, Button, Collapse, Grid, IconButton, Link, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ACCESS_TOKEN, REFRESH_TOKEN, setTokens } from '../Services/util';


function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
}

export default function Login() {
    console.log('login render');
    const { Login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [error, setError] = useState({ status: false, message: '' });

    const onChange = (e) => {
        let keys = e.target.name;
        let values = e.target.value;
        setFormData(prev => (!values && (!prev?.password || !prev?.email)) ? ({}) : ({ ...prev, [keys]: values }));
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = formData;
        if (_.isEmpty(formData) || !email || !password)
            setError({ status: true, message: 'Email | Password require.' });
        else if (!validateEmail(email))
            setError({ status: true, message: 'Invalid email format.' });
        else if (password.length < 8)
            setError({ status: true, message: 'Password must be longer than 8 characters.' });
        else {
            try {
                const response = await API.post('/login', formData);
                if (response.status !== 200 || !response.data.status)
                    return;

                const { data: { accessToken, refreshToken } } = response.data;
                setTokens(ACCESS_TOKEN, accessToken);
                setTokens(REFRESH_TOKEN, refreshToken);
                Login(() => {
                    navigate('/home', { replace: true });
                })
            } catch (error) {
                const { data } = error.response;
                setError({ status: true, message: data.message });
                setFormData({});
            }
        }
    };

    return (
        <Grid
            container
            component="main"
            sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                item
                xs={12}
                sm={8}
                md={5}>
                <Box
                    sx={{
                        position: 'relative',
                        mx: 4,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                        Login
                    </Typography>
                    <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit} sx={{ mt: 4 }}>
                        <TextField
                            required
                            margin="normal"
                            fullWidth
                            id="email"
                            name="email"
                            type="email"
                            label="Email Address"
                            autoComplete="email"
                            placeholder="example@gmail.com"
                            value={formData?.email ?? ''}
                            onChange={onChange}
                        />
                        <TextField
                            required
                            margin="normal"
                            fullWidth
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            autoComplete="password"
                            placeholder="********"
                            value={formData?.password ?? ''}
                            onChange={onChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Register"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box
                        sx={{
                            mb: 4,
                            position: 'absolute',
                            width: '100%',
                            bottom: 0,
                        }}
                    >
                        <Collapse in={error.status} orientation='vertical'>
                            <Alert
                                severity='error'
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => setError(prev => ({ ...prev, status: false }))}
                                        sx={{
                                            my: 'auto'
                                        }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                }
                            >
                                <AlertTitle>Error Authentication</AlertTitle>
                                <Typography>{error.message}</Typography>
                            </Alert>
                        </Collapse>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}