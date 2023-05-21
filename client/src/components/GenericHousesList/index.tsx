import { useState, useEffect } from "react";
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
  const [filtersAmount, setFiltersAmount] = useState<number>(0);
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

  const getAmountOfFilters = (): number => {
    const filtersValues: (number[] | null)[] = Object.values(filters);
    const enabledFiltersValues = filtersValues.filter((filter: number[] | null) => filter !== null);
    return enabledFiltersValues.length;
  }

  useEffect(() => {
    const amountOfFilters: number = getAmountOfFilters();
    setFiltersAmount(amountOfFilters);
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
            <Box sx={{position: "sticky",
                      width: "100%",
                      background: "#ffffff",
                      zIndex: "1",
                      borderBottom: "1px solid lightgrey",
                      height: "7vh",
                      padding: "5px 10px",
                      display: filtersAmount === 0 ? "none" : "flex",
                      alignItems: "center"}}>
              {renderFilters()}
            </Box>
            <Box className="apis-container" sx={{display: "flex",
                                        justifyContent: "center",
                                        flexWrap: "wrap",
                                        maxHeight: filtersAmount === 0 ? "91vh" : "84vh",
                                        overflow: "auto",
                                        position: "relative",
                                        width: "100%" }}>
              {houses.map((house, index) => {
                return (
                  <div key={index}>
                    <HouseCard houseData={house}/>
                  </div>
                );
              })}
          </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default GenericHousesList;
