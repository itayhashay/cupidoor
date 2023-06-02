import { Container, ContentSection } from "./styles";
import Navbar from "../Navbar";
import { useState } from "react";
import MainRouter from "../routing/MainRouter";

const App = () => {
  const [houses, setHouses] = useState<any[]>([]);

  return (
    <Container>
      <Navbar />
      <ContentSection>
        <MainRouter />
      </ContentSection>
    </Container>
  );
};

export default App;
