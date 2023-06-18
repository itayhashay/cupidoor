import { Route, Routes } from 'react-router';
import AppRoutes from './AppRoutes';
import MainLayout from './MainLayout';
// import Navbar from "../Navbar";

const MainRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout></MainLayout>}>
        {AppRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<>{route.element}</>} />
        ))}
      </Route>
    </Routes>
  );
};

// {!/401|404|\*/.test(route.path) &&
// route.path !== "/" &&
// route.path !== "/signIn" && <Navbar />}

export default MainRouter;
