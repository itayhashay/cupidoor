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
  return (
    <Container>
      <Navbar />
      <ContentSection>
        <MainRouter />
      </ContentSection>
      {user && <CupidChat></CupidChat>}
    </Container>
  );
};

export default App;
