import { Route, Routes } from "react-router";
import AppRoutes from "./AppRoutes";
import Navbar from "../Navbar";
import { Container, ContentSection } from "../App/styles";

const MainRouter = () => {
  return (
    <Container>
      <ContentSection>
        <Routes>
          {AppRoutes.map((route) => (
            <Route
              key={`Route - ${route.path}`}
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
      </ContentSection>
    </Container>
  );
};

export default MainRouter;
