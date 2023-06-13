import { Route, Routes } from "react-router";
import AppRoutes from "./AppRoutes";
// import Navbar from "../Navbar";

const MainRouter = () => {
  return (
    <Routes>
      {AppRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={<>{route.element}</>} />
      ))}
    </Routes>
  );
};

// {!/401|404|\*/.test(route.path) &&
// route.path !== "/" &&
// route.path !== "/signIn" && <Navbar />}

export default MainRouter;
