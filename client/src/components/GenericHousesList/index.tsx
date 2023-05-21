import { useState, useEffect } from "react";
import { Container, EnabledFilters } from "./styles";
import HouseCard from "../HouseCard";
import Spinner from "../Spinner";
import { Apartment } from "../../types/apartment";
import { HOUSES } from "../../utils/mock";
import Sidebar from "../Sidebar";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from 'react-router-dom';
import { DEFAULT_FILTERS } from "../Filters/constants";
import { BasicFilters, filtersToUrl, queryToFilters } from "../../utils/filters";
import { Chip, Stack } from "@mui/material";
import { Filter } from "../../types/filters";

const GenericHousesList = ({ apartments } : {apartments: any}) => {
  const [houses, setHousess] = useState<Apartment[]>(HOUSES);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<{[x: string]: number[] | null}>(DEFAULT_FILTERS);
  const location = useLocation()
  const navigate = useNavigate();

  useEffect(() => {
    const queryString = window.location.search;
    if(!queryString) {
      setFilters(DEFAULT_FILTERS);
      return;
    }
    const enabledFilters: {[x: string]: number[] | null} = queryToFilters(queryString);
    const newFilters: {[x: string]: number[] | null} = { ...enabledFilters};

    setFilters(newFilters);
  }, [location])

  useEffect(() => {
    
  }, [filters])

  useEffect(() => {
    if(apartments) {
      // setHousess(apartments);
      setIsLoading(false);  
    }
  }, [apartments]);

  const applyFilters = (newFilters: {[x: string]: number[] | null}) => {
    const url = filtersToUrl(newFilters);
    navigate(url);
  }

  const handleDeleteFilter = (filterKey: string) => () => {
    const newFilters: {[x: string]: number[] | null} = { ...filters, [filterKey]: null};
    applyFilters(newFilters);
  };

  const renderFilters = () => {
    const filterLabels = [];

    for (const [key, value] of Object.entries(filters)) {
      if(value) {
        const currFilter: Filter | undefined = BasicFilters.find(filter => filter.props.filterName === key);
        filterLabels.push({id: key, label: <span><b>{currFilter?.displayName}</b>{` from ${value[0]} to ${value[1]}`}</span>});
      }
    }


    return(
      <Stack direction="row" spacing={1}>
        {filterLabels.map((filter) => <Chip label={filter.label} onDelete={handleDeleteFilter(filter.id)} sx={{fontWeight: 400 ,fontSize: "14px"}}/>)}
      </Stack>);
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box sx={{display: "flex", flexDirection: "row"}}>
          <Sidebar />
          <Box>
            <EnabledFilters >
              {renderFilters()}
            </EnabledFilters>
            <Container className="apis-container">
              {houses.map((house, index) => {
                return (
                  <div key={index}>
                    <HouseCard houseData={house}/>
                  </div>
                );
              })}
          </Container>
          </Box>
        </Box>
      )}
    </>
  );
};

export default GenericHousesList;
