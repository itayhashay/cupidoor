import styled from "styled-components";
import { styled as styledMui } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

export const Container = styled.div`
  height: 100%;
  background-color: white;
  overflow: hidden;
`;

export const ContentSection = styled.div`
  max-height: calc(100% - 14vh);
  overflow-y: auto;
  display: flex;
  flex-direction: row;
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  height: 5vh;
  border-bottom: 1px solid lightgray;
`;

export const PersonalInfoContainer = styled.div`
  height: auto;
  display: flex;
  background: #eee;
  width: auto%;
  margin: auto;
  border-radius: 0.5rem;
  margin-top: 16px;
  border: 0;
  padding: 1.5rem 0.75rem;
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
  align-items: center;
  margin: 25px 0;
  padding: 0 25px;
  width: 30vh;
`;

export const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin-bottom: 16px;
  object-fit: cover;
`;

export const Frame = styled.div`
  border: 0;
  height: auto;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  background: white;
  box-shadow: 0 2px 15px -3px rgba(0,0,0,.07), 0 10px 20px -2px rgba(0,0,0,.04);
  
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.75rem;
`;

export const LinksDividerLine = styled.hr`
  height: 1px;
  width: 100%;
  background: #d3d3d3;
  border: none;
  border-radius: 15px;
  margin: 0;
`;

export const LinkIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;

export const StepIconRoot = styledMui('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  zIndex: 1,
  width: 50,
  height: 50,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const StepIcon = styled.img`
  width: 40px;
  height: 40px;
  z-index: 1;
`;

export const StepIconConnector = styledMui(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
    left: "calc(-50% + 25px)",
    right: "calc(50% + 25px)"
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));
