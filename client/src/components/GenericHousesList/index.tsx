import { useState, useEffect } from "react";
import { Container } from "./styles";
import HouseCard from "../HouseCard";
import Spinner from "../Spinner";
import { Apartment } from "../../types/apartment";
import { HOUSES } from "../../utils/mock";
import Sidebar from "../Sidebar";
import Box from "@mui/material/Box";

const GenericHousesList = ({ apartments } : {apartments: any}) => {
  const [houses, setHousess] = useState<Apartment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(apartments) {
      setHousess(apartments);
      setIsLoading(false);  
    }
  }, [apartments]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box sx={{display: "flex", flexDirection: "row"}}>
          <Sidebar />
          <Container className="apis-container">
            {HOUSES.map((house) => {
              return (
                <div key={house.address}>
                  <HouseCard houseData={house}/>
                </div>
              );
            })}
          </Container>
        </Box>
      )}
    </>
  );
};

export default GenericHousesList;
