import { Routes, Route } from "react-router-dom";
import MainFeed from "../MainFeed";
import { Container, ContentSection } from "./styles";
import Navbar from "../Navbar";
import QuestionsStepper from "../QuestionsStepper";
import GenericHousesList from "../GenericHousesList";
import { useState } from "react";
import ApartmentDetails from "../ApartmentDetails";
import UserRouter from "../UserRouter";

const App = () => {
  const [houses, setHouses] = useState<any[]>([]);

  return (
    <Container>
      <Navbar />
      <ContentSection>
      <Routes>
        <Route path={`/`} element={<MainFeed />}></Route>
        <Route path={`/questions`} element={<QuestionsStepper displayHouses={(apartments : any[]) => setHouses(apartments)} />}></Route>
        <Route path={`/home`} element={<GenericHousesList apartments={houses}/>}></Route>
        <Route path={`/apartment/:id`} element={<ApartmentDetails />}></Route>
        <Route path={`/user/*`} element={<UserRouter />}></Route>
      </Routes>
      </ContentSection>
    </Container>
  );
};

export default App;
