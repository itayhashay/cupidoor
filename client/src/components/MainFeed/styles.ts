import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 100px;
`;

export const PublishPropertyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  position: relative;
  top: 40px;
`;

export const MainText = styled.h1`
  font-size: 70px;
  color: #1976d2;
  margin: 26px 0;
`;

export const SearchBar = styled.input`
  width: 550px;
  height: 30px;
  direction: ltr;
  outline: 0;
  margin: 0 auto;
  border-radius: 10px;
  border: 2px solid darkgrey;
  padding: 3px 0 4px 10px;
  font-size: 20px;
`;

export const SubText = styled.h3`
  font-size: 25px;
  color: #1976d2;
  margin: 26px 0;
`;
