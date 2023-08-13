import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, IconButton } from "@mui/material";
import {useNavigate,useLocation} from "react-router-dom"
const BackButton =({bgcolor,color}:{bgcolor?:string,color?:string})=>{
const navigate = useNavigate();
const location = useLocation();
const handleClick= ()=>{
    if(location.key === "default"){
        navigate('/home/all-apartments');
        return;
    }
    navigate("/home/all-apartments");
}

    return (
      <IconButton onClick={handleClick} sx={{ bgcolor:bgcolor ? bgcolor : 'primary.dark',"&.MuiIconButton-root:hover":{
        bgcolor:"primary.light"
      } }}>
        <ArrowBackIcon sx={{ color: 'white' }} />
      </IconButton>
    );
}

export default BackButton;