import { City } from "../types/city";

export const getFirsthundredCities = (citiesList: City[]): City[] => {
  return citiesList.slice(0, 100);
};
