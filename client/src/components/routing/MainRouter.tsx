import { Route, Routes } from 'react-router';
import AppRoutes from './AppRoutes';
import MainLayout from './MainLayout';
import Landing from '../Landing/Landing';
import LandingPage from '../Landing/LandingPage';
import UnAuthorizedPage from '../401/401';
import NotFoundPage from '../404/404';
// import Navbar from "../Navbar";

const MainRouter = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Landing />}></Route>
      <Route path={'/signIn'} element={<LandingPage />}></Route>
      <Route element={<MainLayout></MainLayout>}>
        {AppRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<>{route.element}</>} />
        ))}
      </Route>
      <Route path={'/401'} element={<UnAuthorizedPage />}></Route>
      <Route path={'*'} element={<NotFoundPage />}></Route>
    </Routes>
  );
};

// {!/401|404|\*/.test(route.path) &&
// route.path !== "/" &&
// route.path !== "/signIn" && <Navbar />}

export default MainRouter;
