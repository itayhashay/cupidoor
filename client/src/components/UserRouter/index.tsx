import { Routes, Route } from "react-router-dom";
import { Container, ContentSection } from "./styles";
import Navigator from "./Navigator";
import { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import MyProperties from "./MyProperties";
import LikedApartments from "./LikedApartments";
import Navbar from "../Navbar";
import GenericHousesList from "../GenericHousesList";
import { USER_ROUTES } from "./constants";

const UserRouter = () => {
  const [houses, setHouses] = useState<any[]>([]);

  return (
    <Container>
      <Navbar />
      <Navigator />
      <ContentSection>
        <Routes>
            <Route path={`/${USER_ROUTES.PERSONAL_INFO}`} element={<PersonalInfo />}></Route>
            <Route path={`/${USER_ROUTES.LIKED_APARTMENTS}`} element={<GenericHousesList apartments={houses}/>}></Route>
            <Route path={`/${USER_ROUTES.MY_PROPERTIES}`} element={<GenericHousesList apartments={houses}/>}></Route>
        </Routes>
      </ContentSection>
    </Container>
  );
};

export default UserRouter;
