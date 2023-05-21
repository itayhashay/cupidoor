import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-height: 84vh;
  overflow: auto;
  position: relative; 
  width: 100%; 
`;

export const EnabledFilters = styled.div`
  position: sticky;
  width: 100%;
  background: #ffffff;
  z-index: 1;
  border-bottom: 1px solid lightgrey;
  height: 7vh;
  padding: 5px 10px;
  display: flex;
  align-items: center;
`;