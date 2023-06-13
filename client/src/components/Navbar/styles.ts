import styled from "styled-components";

export const UserSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 170px;
  justify-content: end;
`;
export const DividerLine = styled.hr`
  height: 1px;
  width: 100%;
  background: #d3d3d3;
  border: none;
  border-radius: 15px;
  margin: 15px 0;
`;

export const linkStyles = {
  display: "flex",
  alignItems: "center",
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 35,
  padding: "0 30px",
  textAlign: "center",
};