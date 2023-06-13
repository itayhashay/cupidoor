import { Box, Chip, Typography } from "@mui/material";
import { Grid, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ApartmentIcon from "@mui/icons-material/Apartment";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import MoodIcon from "@mui/icons-material/Mood";

const CustomLihgtningIcon = () => (
  <span style={{ color: "#8e24aa" }}>
    <FlashOnIcon />
  </span>
);

const Landing = () => {
  const handleMatchClick = () => {
    // Will do something
  };

  return (
    <Grid
      container
      bgcolor={"#F1F0F7"}
      spacing={3}
      justifyContent={"center"}
      padding={5}
      height={"100vh"}
      alignContent={"center"}
    >
      <Grid item>
        <Chip
          icon={<CustomLihgtningIcon />}
          label="Find your match now!"
          sx={{
            backgroundColor: "#ffffff",
            color: "#8e24aa",
            width: "178px",
          }}
        />
        <Typography
          fontSize={"3.5rem"}
          fontWeight={"bold"}
          color={"#434336"}
          sx={{ margin: "20px 40px 10px 0", lineHeight: "1.25" }}
        >
          Your House Is
          <br />
          Waiting For You!
        </Typography>
        <Typography
          fontSize={"15px"}
          color={"#A3A5A7"}
          sx={{ marginBottom: "22px" }}
        >
          your new landlord/tenant is Waiting for you just some few clicks!{" "}
          <br /> It is never to late to actually like and trust your
          landlord/tenant
        </Typography>
        <Chip
          label="Match Now!"
          sx={{
            width: "180px",
            height: "46px",
            backgroundColor: "purple",
            color: "white",
            fontSize: "18px",
          }}
          component={Link}
          to={"/signIn"}
          onClick={handleMatchClick}
        />
      </Grid>
      <Grid item display={"flex"} alignItems={"center"}>
        <Box display={"flex"}>
          <Avatar src="/landing.jpg" sx={{ width: 250, height: 250 }}></Avatar>

          <Grid container spacing={2} ml={3} width={200}>
            <Grid item xs={12}>
              <Box display={"flex"} alignItems={"center"}>
                <Avatar>
                  <ApartmentIcon />
                </Avatar>
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
                <Avatar>
                  <MoodIcon />
                </Avatar>
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
                <Avatar>
                  <RequestPageIcon />
                </Avatar>
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
  );
};

export default Landing;
