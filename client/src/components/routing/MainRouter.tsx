import { Route, Routes } from "react-router";
import AppRoutes from "./AppRoutes";
import Navbar from "../Navbar";
import { Container, ContentSection } from "../App/styles";

const MainRouter = () => {
  return (
    <Container>
      <Navbar />
      <ContentSection>
        <Routes>
          {AppRoutes.map((route) => (
            <Route
              key={`Route - ${route.path}`}
              path={route.path}
              element={<>{route.element}</>}
            />
          ))}
        </Routes>
      </ContentSection>
    </Container>
  );
};

export default MainRouter;
