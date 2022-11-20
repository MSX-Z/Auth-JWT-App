import { ChangeEvent, FormEvent, useMemo } from "react";
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { fullName } from "../Models";
import { IRegister } from "src/Types/Auth/Form";

type Props = {
    formData: IRegister;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;  
}

function RegisterFormBox(props: Props) {
    const { formData: { firstname, lastname, email, password, terms }, onChange, onSubmit } = props;

    const randomFullName = useMemo(() => {
        let index = Math.floor(Math.random() * fullName.length);
        return fullName[index];
    }, [])

    return (
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: '50px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="firstname"
                        name="firstname"
                        type='text'
                        label="First Name"
                        autoComplete="given-name"
                        placeholder={randomFullName.fn}
                        value={firstname ?? ''}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="lastname"
                        name="lastname"
                        type='text'
                        label="Last Name"
                        autoComplete="family-name"
                        placeholder={randomFullName.ln}
                        value={lastname ?? ''}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        name="email"
                        type="email"
                        label="Email Address"
                        autoComplete="email"
                        placeholder="example@gmail.com"
                        value={email ?? ''}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        autoComplete="password"
                        placeholder="********"
                        value={password ?? ''}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox checked={!!terms} name="terms" color="primary" onChange={onChange} />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Register
            </Button>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link to='/' style={{ color: '#1976d2', fontFamily: 'Roboto', fontWeight: 400, fontSize: 14 }}>
                        Already have an account? Login
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
}

export default RegisterFormBox;