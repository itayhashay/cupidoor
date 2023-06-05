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
import { HOUSES } from "../../utils/mock";

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
        <HomeRouter apartments={[]} />
      </ProtectedRoute>
    ),
  },
  {
    path: "/apartment/:id",
    element: (
      <ProtectedRoute>
        <ApartmentDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/*",
    element: (
      <ProtectedRoute>
        <UserRouter />
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
