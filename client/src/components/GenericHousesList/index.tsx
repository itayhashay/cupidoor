import { useState, useEffect } from "react";
import HouseCard from "../HouseCard";
import Spinner from "../Spinner";
import { Apartment } from "../../types/apartment";
import { HOUSES } from "../../utils/mock";
import Sidebar from "../Sidebar";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import { DEFAULT_FILTERS } from "../Filters/constants";
import {
  BasicFilters,
  filterByUserProperties,
  filtersToUrl,
  queryToFilters,
} from "../../utils/filters";
import { Chip, Container, Grid, Stack } from "@mui/material";
import { Filter } from "../../types/filters";

const GenericHousesList = ({ apartments }: { apartments: Apartment[] }) => {
  const [houses, setHousess] = useState<Apartment[]>(apartments);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageHome, setIsHomePage] = useState(false);
  const [isMyProperties, setIsMyProperties] = useState(false);
  const [filtersAmount, setFiltersAmount] = useState<number>(0);
  const [filters, setFilters] = useState<{ [x: string]: number[] | null }>(
    DEFAULT_FILTERS
  );
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsHomePage(window.location.pathname === "/home");
    setIsMyProperties(window.location.pathname === "/user/my-properties");
    const queryString = window.location.search;
    if (!queryString) {
      setFilters(DEFAULT_FILTERS);
      return;
    }
    const enabledFilters: { [x: string]: number[] | null } =
      queryToFilters(queryString);
    const newFilters: { [x: string]: number[] | null } = { ...enabledFilters };

    setFilters(newFilters);
  }, [location]);

  const getAmountOfFilters = (): number => {
    const filtersValues: (number[] | null)[] = Object.values(filters);
    const enabledFiltersValues = filtersValues.filter(
      (filter: number[] | null) => filter !== null
    );
    return enabledFiltersValues.length;
  };

  useEffect(() => {
    const amountOfFilters: number = getAmountOfFilters();
    setFiltersAmount(amountOfFilters);
    const filteredApartments: Apartment[] = filterByUserProperties(
      filters,
      apartments
    );
    setHousess(filteredApartments);
  }, [filters]);

  useEffect(() => {
    if (apartments) {
      setHousess(apartments);
      setIsLoading(false);
    }
  }, [apartments]);

  const updateUrl = (newFilters: { [x: string]: number[] | null }) => {
    const url = filtersToUrl(newFilters);
    navigate(url);
  };

  const handleDeleteFilter = (filterKey: string) => () => {
    const newFilters: { [x: string]: number[] | null } = {
      ...filters,
      [filterKey]: null,
    };
    updateUrl(newFilters);
  };

  const renderFilters = () => {
    const filterLabels = [];

    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        const currFilter: Filter | undefined = BasicFilters.find(
          (filter) => filter.props.filterName === key
        );
        filterLabels.push({
          id: key,
          label: (
            <span>
              <b>{currFilter?.displayName}</b>
              {` from ${value[0]} to ${value[1]}`}
            </span>
          ),
        });
      }
    }

    return (
      <Stack direction="row" spacing={1}>
        {filterLabels.map((filter, index) => (
          <Chip
            key={index}
            label={filter.label}
            onDelete={handleDeleteFilter(filter.id)}
            sx={{ fontWeight: 400, fontSize: "14px" }}
          />
        ))}
      </Stack>
    );
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            height: "calc(100% - 9vh)",
          }}
        >
          {isPageHome && <Sidebar />}
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                position: "sticky",
                width: "100%",
                background: "#ffffff",
                zIndex: "1",
                borderBottom: "1px solid lightgrey",
                height: "8vh",
                padding: "5px 10px",
                display: isPageHome && filtersAmount > 0 ? "flex" : "none",
                alignItems: "center",
                maxWidth: "calc(100vw - 270px)",
                overflowX: "auto",
              }}
            >
              {renderFilters()}
            </Box>


            <Box>
              <Grid container spacing={4} padding={2}>
                {HOUSES.map((house, index) => {
                  return (
                    <Grid item xs={6} sm={6} md={6} lg={4} xl={3}  key={house._id}>
                      <HouseCard
                        houseData={house}
                        isMyProperties={isMyProperties}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default GenericHousesList;
