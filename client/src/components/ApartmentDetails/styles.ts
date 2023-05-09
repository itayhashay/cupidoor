import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  background-color: white;
  margin: 15px;
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
  height: 33%;
`;

export const DryDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 25px;
    align-items: flex-start;
    justify-content: space-around;
`;

export const ImageContainer = styled.div`
  margin: 15px;
  display: flex;
  justify-content: flex-start;
`;

export const Image = styled.img`
  width: -webkit-fill-available;
  border-radius: 8px;
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

export const RentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: -webkit-fill-available;
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
  margin: 15px;
  padding: 10px 15px;
  height: -webkit-fill-available;
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