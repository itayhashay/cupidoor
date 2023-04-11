import Button from "@mui/material/Button";
import SearchBar from "./SearchBar";
import {
  Container,
  PublishPropertyContainer,
  MainText,
  SubText,
} from "./styles";

const MainFeed = () => {
  return (
    <Container>
      <MainText>Rent to people we love</MainText>
      <SearchBar />
      <PublishPropertyContainer>
        <SubText>Market your property to the world</SubText>
        <Button variant="contained">List a Property</Button>
      </PublishPropertyContainer>
    </Container>
  );
};

export default MainFeed;
