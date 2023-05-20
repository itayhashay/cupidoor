import { useState, useEffect } from "react";
import { Container } from "./styles";
import HouseCard from "../HouseCard";
import Spinner from "../Spinner";
import { Apartment } from "../../types/apartment";
import { HOUSES } from "../../utils/mock";
import Sidebar from "../Sidebar";
import Box from "@mui/material/Box";
import { useLocation } from 'react-router-dom';
import { DEFAULT_FILTERS } from "../Filters/constants";
import { queryToFilters } from "../../utils/filters";

const GenericHousesList = ({ apartments } : {apartments: any}) => {
  const [houses, setHousess] = useState<Apartment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<{[x: string]: number[] | null}>(DEFAULT_FILTERS);
  const location = useLocation()

  useEffect(() => {
    const queryString = window.location.search;
    if(!queryString) {
      setFilters(DEFAULT_FILTERS);
      return;
    }
    const enabledFilters: {[x: string]: number[] | null} = queryToFilters(queryString);

    setFilters({ ...filters, ...enabledFilters});
  }, [location])

  useEffect(() => {
    // TODO: apply filters on houses
    console.log(filters);
  }, [filters])

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
            {HOUSES.map((house, index) => {
              return (
                <div key={index}>
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
