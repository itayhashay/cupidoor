import { AppBar, Box, Container, Toolbar, Typography, Grid, Button, Avatar,Link } from "@mui/material";
import { blue } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LogoImg } from "../Navbar/styles";
import Logo from "../../icons/logo.png";

declare module '@mui/material/styles' {
    interface Theme {
        appBar: {
            main: string;
            secondary: string;
        };
    }

    interface ThemeOptions {
        appBar?: {
            main?: string;
            secondary?: string
        }
    }
}



const theme = createTheme({
    appBar: {
        main: blue[300],
        secondary: 'black'
    }
})

const Landing = () => {

    return (
        <ThemeProvider theme={theme}>

            <Box sx={{ flexGrow: 1 }} height={64}>
                <AppBar sx={{ bgcolor: theme.appBar.main }}>
                    <Toolbar >
                        <Box display={"flex"} justifyContent={"flex-start"} alignItems={'center'}>
                            {/* <LogoImg src={Logo}></LogoImg> */}
                            <Typography variant="h6" noWrap sx={{}} textAlign={'center'}>
                                CupiDoor
                            </Typography>
                        </Box>
                        <Button sx={{ width: 90 }} color="inherit"> <Link href="signIn" sx={{color:'white',textDecoration:'none'}}> Sign In</Link></Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Grid container bgcolor={'black'} spacing={3} justifyContent={'center'} padding={5}>
                <Grid item>
                    <Typography fontSize={'3rem'} fontWeight={'bold'} fontFamily={'OpenSans'} color={'white'} >
                        Your House <br /> Is Waiting <br />For You!
                    </Typography>
                    <Button variant="contained" sx={{ mt: 3 }}>
                        Enquire Now
                    </Button>
                </Grid>
                <Grid item>
                    <Box display={'flex'}>
                        <Avatar src="/landing.jpg" sx={{ width: 250, height: 250 }}>

                        </Avatar>

                        <Grid container spacing={2} ml={3} width={200}>
                            <Grid item xs={12}>
                                <Box display={'flex'}>
                                    <Avatar>

                                    </Avatar>
                                    <Box ml={2}>
                                        <Typography fontWeight={'bold'} fontSize={'1rem'} color={'white'} >
                                            100
                                        </Typography>
                                        <Typography variant="subtitle2" color={'GrayText'}>
                                            Listed Apartments
                                        </Typography>
                                    </Box>
                                </Box>


                            </Grid>
                            <Grid item xs={12}>
                                <Box display={'flex'}>
                                    <Avatar>

                                    </Avatar>
                                    <Box ml={2}>
                                        <Typography fontWeight={'bold'} fontSize={'1rem'} color={'white'} >
                                            150
                                        </Typography>
                                        <Typography variant="subtitle2" color={'GrayText'}>
                                            Registerd Tenants
                                        </Typography>
                                    </Box>
                                </Box>


                            </Grid>
                            <Grid item xs={12}>
                                <Box display={'flex'}>
                                    <Avatar>

                                    </Avatar>
                                    <Box ml={2}>
                                        <Typography fontWeight={'bold'} fontSize={'1rem'} color={'white'} >
                                            50
                                        </Typography>
                                        <Typography variant="subtitle2" color={'GrayText'}>
                                            Signed Contracts
                                        </Typography>
                                    </Box>
                                </Box>


                            </Grid>
                        </Grid>
                    </Box>

                </Grid>

            </Grid>
        </ThemeProvider >
    );
};

export default Landing;
