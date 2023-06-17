import { Apartment } from "../../types/apartment";
import {LIKED_APARTMENTS } from "../../utils/mock";
import Sidebar from "../Sidebar";
import { Route, Routes } from "react-router-dom";
import { Container, ContentSection } from "./styles";
import { USER_ROUTES } from "../UserRouter/constants";
import MyProperties from "../UserRouter/MyProperties";
import GenericHousesList from "../GenericHousesList";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LikedApartments from "../UserRouter/LikedApartments";
import CupidoorSpinner from "../CupidoorSpinner";
const HomeRouter = ({ apartments }: { apartments: Apartment[] }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ap,setAp] = useState<Apartment[]>([] as Apartment[]);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchApartments = async ()=>{
      const response = await axiosPrivate.get("/apartment");
      setAp(response.data);
      setIsLoading(false);
    }

    fetchApartments();
  }, []);
  return (
    <Container>
      {isLoading ? (
        <CupidoorSpinner></CupidoorSpinner>
      ) : (
        <ContentSection>
          <Sidebar />
          <Routes>
            <Route
              path={`/${USER_ROUTES.ALL_APARTMENTS}`}
              element={<GenericHousesList apartments={ap} />}
            ></Route>
            <Route
              path={`/${USER_ROUTES.LIKED_APARTMENTS}`}
              element={<LikedApartments />}
            ></Route>
            <Route
              path={`/${USER_ROUTES.MY_PROPERTIES}`}
              element={<MyProperties />}
            ></Route>
          </Routes>
        </ContentSection>
      )}
    </Container>
  );
};

export default HomeRouter;
