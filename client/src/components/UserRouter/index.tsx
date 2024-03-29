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
import { useAuth } from "../../context/AuthContext";
import { User } from "../../types/user";
import { Apartment } from "../../types/apartment";

const UserRouter = () => {
  const [houses, setHouses] = useState<any[]>([]);
  const {user,setUser} = useAuth();

  return (
    <Routes>
            <Route path={`/${USER_ROUTES.PERSONAL_INFO}`} element={<PersonalInfo user={user as User}/>}></Route>
            <Route path={`/${USER_ROUTES.LIKED_APARTMENTS}`} element={<GenericHousesList apartments={{} as Apartment[]}/>}></Route>
            <Route path={`/${USER_ROUTES.MY_PROPERTIES}`} element={<MyProperties />}></Route>
        </Routes>
  );
};

export default UserRouter;
