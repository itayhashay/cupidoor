import { Route, Routes } from "react-router";
import AppRoutes from "./AppRoutes";
import Navbar from "../Navbar";
import { Container, ContentSection } from "../App/styles";

const MainRouter = () => {
  return (
    <Routes>
      {AppRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <>
              {!/401|404|\*/.test(route.path) &&
                route.path !== "/" &&
                route.path !== "/signIn" && <Navbar />}
              {route.element}
            </>
          }
        />
      ))}
    </Routes>
  );
};

export default MainRouter;
