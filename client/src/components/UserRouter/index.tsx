import { Routes, Route } from "react-router-dom";
import { Container, ContentSection } from "./styles";
import Navigator from "./Navigator";
import { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import MyProperties from "./MyProperties";
import LikedApartments from "./LikedApartments";
import Navbar from "../Navbar";
import GenericHousesList from "../GenericHousesList";

const UserRouter = () => {
  const [houses, setHouses] = useState<any[]>([]);

  // TODO : REMOVE NAVBAR OMER!!!
  return (
    <Container>
      <Navbar />
      <Navigator />
      <ContentSection>
        <Routes>
            <Route path={`/personal-info`} element={<PersonalInfo />}></Route>
            <Route path={`/liked-apartments`} element={<GenericHousesList apartments={houses}/>}></Route>
            <Route path={`/my-properties`} element={<GenericHousesList apartments={houses}/>}></Route>
        </Routes>
      </ContentSection>
    </Container>
  );
};

export default UserRouter;
