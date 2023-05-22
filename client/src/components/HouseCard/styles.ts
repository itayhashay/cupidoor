import styled from "styled-components";

export const Container = styled.div``;

export const DividerLine = styled.hr`
  height: 1px;
  width: 90%;
  background: #e0e0e0;
  border: none;
  border-radius: 15px;
`;

export const cardStyles = {
  maxWidth: 345,
  width: "16rem",
  height: "25rem",
  margin: "20px 15px",
  borderRadius: "8px",
  boxShadow: "rgb(0 0 0 / 35%) 0px 5px 15px",
  position: "relative",
  "&:hover": {
    borderColor: "dimgray",
    boxShadow: "rgb(0 0 0 / 60%) 0px 5px 25px",
  },
};

export const addressStyles = {
  textAlign: "center",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
  fontSize: "18px"
}

export const likeButtonStyles = {    
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "#ffffffd1",
  height: "40px",
  width: "40px"
}

export const AvatarStyles = {
  margin: "auto",
  bottom: "30px",
  width: "50px",
  height: "50px",
  border: "5px solid #fff"
}

export const CardContentStyles = {
  maxHeight: "220px",
  overflowY: "auto",
  position: "relative",
  bottom: "32px",
  margin: "8px 0",
  padding: "0 8px",
};

export const MatchLabelStyles = {
  textAlign: "center",
  fontSize: "16px", 
  marginBottom: "8px", 
  fontWeight: "bold",     
  position: "absolute",
  top: "20px",
  background: "#ffffff",
  borderRadius: "0 8px 8px 0",
  padding:" 0 5px"
}