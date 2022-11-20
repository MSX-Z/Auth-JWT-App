import { Box, Typography, Container } from '@mui/material/';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IRegister } from 'src/Types/Auth/Form';
import AlertBox from '../Components/AlertBox';
import CopyRight from '../Components/CopyRight';
import Loading from '../Components/Loading';
import RegisterFormBox from '../Components/RegisterFormBox';
import Api from '../Services/Api/Axios';
import { validateEmail, validateName } from '../Utils';


function Register() {
    console.log('register render');
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<IRegister>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        terms: false
    });
    const [error, setError] = useState({ status: false, message: '' });

    const onClose = useCallback(() => {
        setError(prev => ({ ...prev, status: false }));
    }, [error]);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        let keys = event.target.name;
        let values = (event.target.type !== 'checkbox') ? event.target.value : event.target.checked;
        setFormData(prev => ({ ...prev, [keys]: values }));
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { firstname, lastname, email, password, terms } = formData;
        if (!firstname || !lastname || !email || !password)
            setError({ status: true, message: 'Full Name | Email | Password require.' });
        else if (!validateName(firstname) || !validateName(lastname))
            setError({ status: true, message: 'Invalid first & last name format.' });
        else if (!validateEmail(email))
            setError({ status: true, message: 'Invalid email format.' });
        else if (password.length < 8)
            setError({ status: true, message: 'Password must be longer than 8 characters.' });
        else if (!terms)
            setError({ status: true, message: 'Please accept the terms.' });
        else {
            setIsLoading(true);
            try {
                const response = await Api.post('/register', formData);
                const { status } = response.data;
                if (status) {
                    setIsLoading(false);
                    setFormData({firstname: "", lastname: "", email: "", password: "", terms: false});
                    navigate('/', { replace: true });
                }
            } catch (error) {
                console.log('error', error?.response);
                let message = error?.response?.data?.message ?? error.message;
                message = (message === 'Validation error') ? 'Some of the data has already been used.' : message;
                setIsLoading(false);
                setError({ status: true, message });
                setFormData({firstname: "", lastname: "", email: "", password: "", terms: false});
            }
        }
    };

    return (
        <>
            <Loading isLoading={isLoading} />
            <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifySelf: 'center'
                    }}
                >
                    <Typography variant="h3" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        Register
                    </Typography>
                    <RegisterFormBox formData={formData} onChange={onChange} onSubmit={onSubmit} />
                </Box>
                <Box sx={{ mt: 2, position: 'relative' }}>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: -80,
                            width: '100%'
                        }}
                    >
                        <AlertBox title={"Error Authentication"} error={error} onClose={onClose} />
                    </Box>
                </Box>
                <CopyRight />
            </Container>
        </>
    );
}

export default Register;