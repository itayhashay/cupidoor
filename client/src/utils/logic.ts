import { City } from "../types/address";

export const getFirsthundredCities = (citiesList: City[]): City[] => {
  return citiesList.slice(0, 100);
};

export const generateArrayFromRange = (from: number, to: number, step: number = 1) => {
  return Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, index) =>
  from + index * step
);
}