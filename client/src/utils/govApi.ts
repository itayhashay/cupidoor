import axios from "axios";
import config from "../config.json";

export const getCitiesByQuery = async (query: string) => {
  const response = await axios.get(
    `${config.gov.baseUrl}`,
    { params: { resource_id: config.gov.resourcesKeys.cities, q: query} }
  );

  return response.data.result.records;
};

export const getStreetsByCity = async (city: string) => {
    const response = await axios.get(
      `${config.gov.baseUrl}`,
      { params: { resource_id: config.gov.resourcesKeys.streets, q: { [config.gov.fieldsNames.city]: city }} }
    );
  
    return response.data.result.records;
  };

  export const getStreetsByCityAndQuery = async (city: string, query: string) => {
    const response = await axios.get(
      `${config.gov.baseUrl}`,
      { params: { resource_id: config.gov.resourcesKeys.streets, q: { [config.gov.fieldsNames.city]: city, [config.gov.fieldsNames.street]: query }} }
    );
  
    return response.data.result.records;
  };