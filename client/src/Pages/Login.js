import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Services/Contexts/AuthContext';
import { TOKENS, setTokens } from '../Utils';
import API from '../Services/Api';
import _ from "lodash";
import { Box, Grid, Typography } from '@mui/material';
import AlertBox from '../Components/AlertBox';
import FormBox from '../Components/FormBox';
import Loading from '../Components/Loading';
import { validateEmail } from '../Utils';

export default function Login() {
    console.log('login render');
    const { Login } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ status: false, message: '' });

    let { state } = location;
    let from = state?.from?.pathname ?? '/home';

    const onClose = useCallback(() => {
        setError(prev => ({ ...prev, status: false }));
    }, [error]);

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
            setIsLoading(true);
            try {
                const response = await API.post('/login', formData);
                if (response.status !== 200 || !response.data.status)
                    return;

                const { data } = response.data;
                setIsLoading(false);
                setTokens(TOKENS, JSON.stringify(data));
                Login(() => navigate(from, { replace: true }));
            } catch (error) {
                let message = error?.response?.data?.message ?? error.message;
                setIsLoading(false);
                setError({ status: true, message });
                setFormData({});
            }
        }
    }

    return (
        <>
            <Loading isLoading={isLoading} />
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
                        backgroundPosition: 'center'
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
                        <FormBox formData={formData} onChange={onChange} onSubmit={onSubmit} />
                        <Box
                            sx={{
                                mb: 4,
                                position: 'absolute',
                                width: '100%',
                                bottom: 0,
                            }}
                        >
                            <AlertBox title={"Error Authentication"} error={error} onClose={onClose} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}