import { useNavigate } from 'react-router-dom';
import { AppBar, Button, Card, CardActions, CardContent, CardMedia, Grid, Stack, Box, Toolbar, Typography, Container } from '@mui/material/';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import { useAuth } from '../Services/Contexts/AuthContext';
import { TOKENS, removeTokens } from '../Services';
import { useEffect } from 'react';
import HttpClient from '../Services/Api/Axios/axios';
import CopyRight from '../Components/CopyRight';

const mock_cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Home() {
    console.log('home render');

    const navigate = useNavigate();
    const { stateAuth, logout } = useAuth() || {};
   
    const onLogout = async () => {
        try {
            const response = await HttpClient.post('/logout');
            const { status } = response.data;
            if (status && !!logout) {
                removeTokens(TOKENS);
                logout(() => {
                    navigate('/', { replace: true });
                });
            }
        } catch (error) {
            console.log("error", error?.response ?? error.message);
        }
    }
    
    useEffect(() => {
        (async () => {
            if(!stateAuth) return;
            const { id } = stateAuth;

            const response = await HttpClient.get(`/users/${id}`);
            console.log('Home data', response.data);
        })();
    }, [stateAuth]);

    return (
        <Box>
            <AppBar position="fixed">
                <Toolbar>
                    <CameraIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
                        Home
                    </Typography>
                    <Button color="inherit" onClick={() => navigate('/setting')}>Setting</Button>
                    <Button color="inherit" onClick={onLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 8,
                        mt: 8
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Album layout
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Something short and leading about the collection below—its contents,
                            the creator, etc. Make it short and sweet, but not too short so folks
                            don&apos;t simply skip over it entirely.
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained">Main call to action</Button>
                            <Button variant="outlined">Secondary action</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="lg">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {mock_cards.map((card: number) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            // pt: '56.25%',
                                            height: '40vh'
                                        }}
                                        image="https://source.unsplash.com/random"
                                        alt="random"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Heading
                                        </Typography>
                                        <Typography>
                                            This is a media card. You can use this section to describe the
                                            content.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">View</Button>
                                        <Button size="small">Edit</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
                </Typography>
                <CopyRight />
            </Box>
        </Box>
    );
}
export default Home;