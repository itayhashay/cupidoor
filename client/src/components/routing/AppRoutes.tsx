import LandingPage from "../Landing/LandingPage";
import NotFoundPage from "../404/404";
import ProtectedRoute from "./ProtectedRoute";
import UnAuthorizedPage from "../401/401";
import MainFeed from "../MainFeed";
import QuestionsStepper from "../QuestionsStepper";
import HomeRouter from "../HomeRouter";
import ApartmentDetails from "../ApartmentDetails";
import UserRouter from "../UserRouter";
import Landing from "../Landing/Landing";
import PrerequisiteRoute from "./PrerequisiteRoute";

// Will Change!!!!
let tmpApartments: any = [];

const appRoutes = [
  { path: "/", element: <Landing /> },
  { path: "/signIn", element: <LandingPage /> },
  { path: "/Mainfeed", element: <MainFeed /> },
  {
    path: "/questions",
    element: (
      <ProtectedRoute>
        <QuestionsStepper displayHouses={tmpApartments} />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home/*",
    element: (
      <ProtectedRoute>
        <PrerequisiteRoute>
          <HomeRouter apartments={[]} />
        </PrerequisiteRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "/apartment/:id",
    element: (
      <ProtectedRoute>
        <PrerequisiteRoute>
          <ApartmentDetails />
        </PrerequisiteRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/*",
    element: (
      <ProtectedRoute>
        <PrerequisiteRoute>
          <UserRouter />
        </PrerequisiteRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "/401",
    element: <UnAuthorizedPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default appRoutes;
