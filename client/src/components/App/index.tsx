import { Container, ContentSection } from "./styles";
import Navbar from "../Navbar";
import { useState } from "react";
import MainRouter from "../routing/MainRouter";
import CupidChat from "../Chat";
import { useAuth } from "../../context/AuthContext";
import { ThemeProvider, createTheme } from "@mui/material";

const App = () => {
  const [houses, setHouses] = useState<any[]>([]);
  const { user } = useAuth();
  const theme = createTheme({
    palette: {
      primary: {
        main: "#9c27b0",
        dark: "#7b1fa2",
        light: "#ba68c8",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Navbar />
        <ContentSection>
          <MainRouter />
        </ContentSection>
        {user && <CupidChat></CupidChat>}
      </Container>
    </ThemeProvider>
  );
};

export default App;
