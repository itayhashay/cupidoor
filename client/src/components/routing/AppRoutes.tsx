import LandingPage from "../Landing/LandingPage";
import NotFoundPage from "../404/404";
import ProtectedRoute from "./ProtectedRoute.js";
import UnAuthorizedPage from "../401/401";
import MainFeed from "../MainFeed";
import QuestionsStepper from "../QuestionsStepper";
import GenericHousesList from "../GenericHousesList";
import ApartmentDetails from "../ApartmentDetails";
import UserRouter from "../UserRouter";

// Will Change!!!!
let tmpApartments: any = [];

const appRoutes = [
  { path: "/", element: <LandingPage /> },
  { path: "/Mainfeed", element: <MainFeed /> },
  {
    path: "/questions",
    element: <QuestionsStepper displayHouses={tmpApartments} />,
  },
  {
    path: "/home",
    element: <GenericHousesList apartments={tmpApartments} />,
  },
  {
    path: "/apartment/:id",
    element: <ApartmentDetails />,
  },
  {
    path: "/user/*",
    element: <UserRouter />,
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