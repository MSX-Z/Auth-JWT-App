import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Services/Contexts/AuthContext';
import { TOKENS, setTokens } from '../Services';
import API from '../Services/Api/Axios';
import { Box, Grid, Typography } from '@mui/material';
import AlertBox from '../Components/AlertBox';
import LoginFormBox from '../Components/LoginFormBox';
import Loading from '../Components/Loading';
import { validateEmail } from '../Utils';
import { ILogin } from 'src/Types/Auth/Form';

function Login() {
    console.log('login render');
    const { login } = useAuth() || {};
    const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ILogin>({email: "", password: ""});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState({ status: false, message: '' });

    let { state } = location;
    //@ts-ignore
    let from: any = state?.from?.pathname ?? '/home';

    const onClose = useCallback(() => {
        setError(prev => ({ ...prev, status: false }));
    }, [error]);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        let keys = event.target.name;
        let values = event.target.value;
        setFormData(prev => ({ ...prev, [keys]: values }));
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { email, password } = formData;
        if (!email || !password)
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

                const { data: { id }, tokens } = response.data;
                setIsLoading(false);
                setTokens(TOKENS, JSON.stringify(tokens));
                if(login){
                    login(id, () => navigate(from, { replace: true }));
                }
            } catch (error) {
                let message = error?.response?.data?.message ?? error.message;
                setIsLoading(false);
                setError({ status: true, message });
                setFormData({email: "", password: ""});
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
                        <LoginFormBox formData={formData} onChange={onChange} onSubmit={onSubmit} />
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

export default Login