import LandingPage from '../Landing/LandingPage';
import NotFoundPage from '../404/404';
import ProtectedRoute from './ProtectedRoute';
import UnAuthorizedPage from '../401/401';
import MainFeed from '../MainFeed';
import QuestionsStepper from '../QuestionsStepper';
import HomeRouter from '../HomeRouter';
import ApartmentDetails from '../ApartmentDetails';
import UserRouter from '../UserRouter';
import Landing from '../Landing/Landing';
import PrerequisiteRoute from './PrerequisiteRoute';
import PreFetch from './PreFetch';

// Will Change!!!!
let tmpApartments: any = [];

const appRoutes = [
  // { path: '/', element: <Landing /> },
  // { path: '/signIn', element: <LandingPage /> },
  // { path: '/Mainfeed', element: <MainFeed /> },

  {
    path: '/questions',
    element: <QuestionsStepper displayHouses={tmpApartments} />,
  },
  {
    path: '/home/*',
    element: (
      <PrerequisiteRoute>
        <HomeRouter />
      </PrerequisiteRoute>
    ),
  },
  {
    path: '/apartment/:id',
    element: (
      <PrerequisiteRoute>
        <ApartmentDetails />
      </PrerequisiteRoute>
    ),
  },
  {
    path: '/user/*',
    element: (
      <PrerequisiteRoute>
        <UserRouter />
      </PrerequisiteRoute>
    ),
  },
];

export default appRoutes;
