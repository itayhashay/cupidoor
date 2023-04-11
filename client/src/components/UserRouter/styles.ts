import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  background-color: white;
`;

export const ContentSection = styled.div`
  height: calc(100% - 9vh);
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  height: auto;
  border-bottom: 1px solid lightgray;
`;

export const PersonalInfoContainer = styled.div`
  height: auto;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  background: #e7e7e7;
  width: 65%;
  margin: auto;
  border-radius: 16px;
  margin-top: 16px;
  border: 1px solid #88888894;
  padding: 50px 0;
`;

export const UserForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45%;
`;

export const FullNameFields = styled.div`    
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const ProfilePictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  left: 50px;
`;

export const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin-bottom: 8px;
`;