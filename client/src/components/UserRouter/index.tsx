import { Routes, Route } from "react-router-dom";
import { Container, ContentSection } from "./styles";
import Navigator from "./Navigator";
import { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import MyProperties from "./MyProperties";
import LikedApartments from "./LikedApartments";
import Navbar from "../Navbar";

const UserRouter = () => {
  const [houses, setHouses] = useState<any[]>([]);

  return (
    <Container>
      <Navbar />
      <Navigator />
      <ContentSection>
        <Routes>
            <Route path={`/personal-info`} element={<PersonalInfo />}></Route>
            <Route path={`/liked-apartments`} element={<LikedApartments />}></Route>
            <Route path={`/my-properties`} element={<MyProperties />}></Route>
        </Routes>
      </ContentSection>
    </Container>
  );
};

export default UserRouter;
