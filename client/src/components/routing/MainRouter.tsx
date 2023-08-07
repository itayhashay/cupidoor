import { Route, Routes } from 'react-router';
import AppRoutes from './AppRoutes';
import MainLayout from './MainLayout';
import Landing from '../Landing/Landing';
import LandingPage from '../Landing/LandingPage';
import UnAuthorizedPage from '../403/403';
import NotFoundPage from '../404/404';

const MainRouter = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Landing />} />
      <Route path={'/signIn'} element={<LandingPage />} />
      <Route element={<MainLayout />}>
        {AppRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<>{route.element}</>} />
        ))}
      </Route>
      <Route path={'/401'} element={<UnAuthorizedPage />} />
      <Route path={'*'} element={<NotFoundPage />} />
    </Routes>
  );
};

// {!/401|404|\*/.test(route.path) &&
// route.path !== "/" &&
// route.path !== "/signIn" && <Navbar />}

export default MainRouter;
