import { Route, Routes } from "react-router";
import AppRoutes from "./AppRoutes";
import Navbar from "../Navbar";
import { Container, ContentSection } from "../App/styles";

const MainRouter = () => {
  return (
    // <Container>
      /* <ContentSection> */
        <Routes>
          {AppRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <>
                  {!/401|404|\*/.test(route.path) && route.path !== "/" && (
                    <Navbar />
                  )}
                  {route.element}
                </>
              }
            />
          ))}
        </Routes>
    // </Container>
)};

export default MainRouter;
