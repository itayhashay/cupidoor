import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  background-color: white;
  padding: 15px;
  max-height: 86vh;
  overflow: auto;
`;

export const Frame = styled.div`
  border: 1px solid lightgray;
  height: 100%;
  border-radius: 8px;
  margin: 5px 0;
`;

// Line 1

export const ElementsLineOne = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const DryDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 15px 15px 80px;
    width: 33%;
    align-items: flex-start;
    justify-content: space-between;
`;

export const ImageContainer = styled.div`
  margin: 15px 15px 0px;
  width: 33%;
  height: fit-content;
`;

export const NumbersSection = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid lightgray;
  padding-bottom: 5px;
`;

export const numbersPropertyStyles = {
  flexDirection: "column",
  alignItems: "center",
  margin: "0 15px",
  justifyContent: "center",
  height: "9vh"
}

export const PropertyIcon = styled.img`
  height: 30px;
  width: 30px;
`;

// Line 2

export const ElementsLineTwo = styled.div`
  display: flex;
  flex-direction: row;
  height: 50%;
`;

export const SubFrame = styled.div`
  border: 1px solid lightgray;
  border-radius: 8px;
  padding: 10px 15px;
  margin: 15px;
  height: fit-content;
`;

export const AvatarConatiner = styled.div`
  width: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PaymentProperty = styled.div`
  display: flex;
  flex-direction: revert;
  justify-content: flex-start;
  align-items: center;
  height: auto;
  margin: 8px 0;
`;