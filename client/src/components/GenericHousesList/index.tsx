import { useState, useEffect } from "react";
import { Container } from "./styles";
import HouseCard from "../HouseCard";
import Spinner from "../Spinner";
import { Apartment } from "../../types/apartment";
import { HOUSES } from "../../utils/mock";

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
        <Container className="apis-container">
          {HOUSES.map((house) => {
            return (
              <div key={house.address}>
                <HouseCard houseData={house}/>
              </div>
            );
          })}
        </Container>
      )}
    </>
  );
};

export default GenericHousesList;
