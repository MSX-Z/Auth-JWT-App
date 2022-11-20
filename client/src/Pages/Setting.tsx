import { Box, Typography, Container } from '@mui/material/';
import CopyRight from '../Components/CopyRight';

function Setting() {
    console.log('setting render');
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
                <Typography variant="h2" component="h1" gutterBottom>
                    Setting Page
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    {'Pin a footer to the bottom of the viewport.'}
                    {'The footer will move as the main element of the page grows.'}
                </Typography>
                <Typography variant="body1">Sticky footer placeholder.</Typography>
            </Container>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                    position: 'sticky',
                    bottom: 0
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="body1">
                        Footer can be found here.
                    </Typography>
                    <CopyRight />
                </Container>
            </Box>
        </Box>
    );
}

export default Setting;