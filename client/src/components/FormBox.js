import { Box, Button, Grid, Link, TextField } from '@mui/material';

function FormBox(props) {
    const { formData: { email, password }, onChange, onSubmit } = props;
    return (
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
                value={email ?? ''}
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
                value={password ?? ''}
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
                    {/* <Link href="#" variant="body2">
                        Forgot password?
                    </Link> */}
                </Grid>
                <Grid item>
                    <Link href="/register" variant="body2">
                        Don't have an account? Register
                    </Link>
                </Grid>
            </Grid>
        </Box>
    )
}

export default FormBox;