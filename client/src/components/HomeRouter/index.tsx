import { Apartment } from "../../types/apartment";
import { HOUSES, LIKED_APARTMENTS } from "../../utils/mock";
import Sidebar from "../Sidebar";
import { Route, Routes } from 'react-router-dom';
import { Container, ContentSection } from "./styles";
import { USER_ROUTES } from "../UserRouter/constants";
import MyProperties from "../UserRouter/MyProperties";
import GenericHousesList from "../GenericHousesList";

const HomeRouter = ({ apartments } : {apartments: Apartment[]}) => {
  return (
    <Container>
      <ContentSection>
        <Sidebar />
        <Routes>
            <Route path={`/${USER_ROUTES.ALL_APARTMENTS}`} element={<GenericHousesList apartments={HOUSES}/>}></Route>
            <Route path={`/${USER_ROUTES.LIKED_APARTMENTS}`} element={<GenericHousesList apartments={LIKED_APARTMENTS}/>}></Route>
            <Route path={`/${USER_ROUTES.MY_PROPERTIES}`} element={<MyProperties />}></Route>
        </Routes>
      </ContentSection>
    </Container>
  );
};

export default HomeRouter;
