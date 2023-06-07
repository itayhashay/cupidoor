import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Grid, Button, Avatar, Link } from "@mui/material";
import { blue } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    appBar: {
      main: string;
      secondary: string;
    };
  }

  interface ThemeOptions {
    appBar?: {
      main?: string;
      secondary?: string;
    };
  }
}

const theme = createTheme({
  appBar: {
    main: blue[300],
    secondary: "#FFFDD0",
  },
});

const Landing = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        bgcolor={"#F1F1DF"}
        spacing={3}
        justifyContent={"center"}
        padding={5}
      >
        <Grid item>
          <Typography
            fontSize={"3rem"}
            fontWeight={"bold"}
            fontFamily={"OpenSans"}
            color={"#434336"}
          >
            Your House is a Match <br /> Away Waiting <br />
            For You!
          </Typography>
          <Button variant="contained" sx={{ mt: 3 }}>
            Match Now!
          </Button>
        </Grid>
        <Grid item>
          <Box display={"flex"}>
            <Avatar
              src="/landing.jpg"
              sx={{ width: 250, height: 250 }}
            ></Avatar>

            <Grid container spacing={2} ml={3} width={200}>
              <Grid item xs={12}>
                <Box display={"flex"}>
                  <Avatar></Avatar>
                  <Box ml={2}>
                    <Typography
                      fontWeight={"bold"}
                      fontSize={"1rem"}
                      color={"#434336"}
                    >
                      100
                    </Typography>
                    <Typography variant="subtitle2" color={"GrayText"}>
                      Listed Apartments
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display={"flex"}>
                  <Avatar></Avatar>
                  <Box ml={2}>
                    <Typography
                      fontWeight={"bold"}
                      fontSize={"1rem"}
                      color={"#434336"}
                    >
                      150
                    </Typography>
                    <Typography variant="subtitle2" color={"GrayText"}>
                      Registerd Tenants
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display={"flex"}>
                  <Avatar></Avatar>
                  <Box ml={2}>
                    <Typography
                      fontWeight={"bold"}
                      fontSize={"1rem"}
                      color={"#434336"}
                    >
                      50
                    </Typography>
                    <Typography variant="subtitle2" color={"GrayText"}>
                      Signed Contracts
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Landing;
