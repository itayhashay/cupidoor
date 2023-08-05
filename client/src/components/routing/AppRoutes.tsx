import QuestionsStepper from '../QuestionsStepper';
import HomeRouter from '../HomeRouter';
import ApartmentDetails from '../ApartmentDetails';
import UserRouter from '../UserRouter';
import PrerequisiteRoute from './PrerequisiteRoute';
import AdminRouter from '../Admin';

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
  {
    path: '/admin/*',
    element: <AdminRouter />,
  },
];

export default appRoutes;
