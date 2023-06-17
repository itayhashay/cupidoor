import { SliderProps } from '../../types/filters';

const FILTERS_DISPLAY_NAMES = {
  MATCH_PRECENT: 'Match Percent:',
  PRICE: 'Price Range:',
  ROOMS: 'Rooms:',
  SQUARE_METER: 'Square Meters:',
  FLOOR: 'Floor:',
  BALCONY: 'Balconies:',
  PARKING: 'Parkings:',
};

const FILTERS_NAMES = {
  MATCH_PRECENT: 'match',
  PRICE: 'rent',
  ROOMS: 'rooms:',
  SQUARE_METER: 'squareMeter',
  FLOOR: 'floor',
  BALCONY: 'balcony',
  PARKING: 'parkings',
};

//   export const DEFAULT_FILTERS = {
//     [FILTERS_NAMES.MATCH_PRECENT]: null,
//     [FILTERS_NAMES.PRICE]: null,
//     [FILTERS_NAMES.ROOMS]: null,
//     [FILTERS_NAMES.SQUARE_METER]: null,
//     [FILTERS_NAMES.FLOOR]: null,
//     [FILTERS_NAMES.BALCONY]: null,
//     [FILTERS_NAMES.PARKING]: null,
//   };

export const DEFAULT_FILTERS = {
  match: null,
  rent: null,
  rooms: null,
  squareMeter: null,
  floor: null,
  balcony: null,
  parkings: null,
  accessible: null,
  boiler: null,
  furnished: null,
  bars: null,
  garage: null,
  airConditioner: null,
  elevator: null,
  longTerm: null,
  shelter: null,
};

export const BALCONY_PROPS: SliderProps = {
  minDistance: 0,
  minValue: 0,
  maxValue: 5,
  step: 1,
  displayName: FILTERS_DISPLAY_NAMES.BALCONY,
  filterName: FILTERS_NAMES.BALCONY,
};

export const FLOOR_PROPS: SliderProps = {
  minDistance: 0,
  minValue: -1,
  maxValue: 20,
  step: 1,
  displayName: FILTERS_DISPLAY_NAMES.FLOOR,
  filterName: FILTERS_NAMES.FLOOR,
};

export const PARKING_PROPS: SliderProps = {
  minDistance: 0,
  minValue: 0,
  maxValue: 5,
  step: 1,
  displayName: FILTERS_DISPLAY_NAMES.PARKING,
  filterName: FILTERS_NAMES.PARKING,
};
export const PRECENT_MATCH_PROPS: SliderProps = {
  minDistance: 5,
  minValue: 0,
  maxValue: 100,
  step: 5,
  displayName: FILTERS_DISPLAY_NAMES.MATCH_PRECENT,
  filterName: FILTERS_NAMES.MATCH_PRECENT,
};

export const PRICE_PROPS: SliderProps = {
  minDistance: 10,
  minValue: 0,
  maxValue: 9000,
  step: 5,
  displayName: FILTERS_DISPLAY_NAMES.PRICE,
  filterName: FILTERS_NAMES.PRICE,
};

export const ROOMS_PROPS: SliderProps = {
  minDistance: 0,
  minValue: 1,
  maxValue: 10,
  step: 0.5,
  displayName: FILTERS_DISPLAY_NAMES.ROOMS,
  filterName: FILTERS_NAMES.ROOMS,
};

export const SQUARE_METER_PROPS: SliderProps = {
  minDistance: 10,
  minValue: 10,
  maxValue: 350,
  step: 5,
  displayName: FILTERS_DISPLAY_NAMES.SQUARE_METER,
  filterName: FILTERS_NAMES.SQUARE_METER,
};

export const FILTERS_TO_PATH = {
  [FILTERS_NAMES.MATCH_PRECENT]: 'match',
  [FILTERS_NAMES.PRICE]: 'rent',
  [FILTERS_NAMES.ROOMS]: 'rooms',
  [FILTERS_NAMES.SQUARE_METER]: 'squareMeter',
  [FILTERS_NAMES.FLOOR]: 'floor',
  [FILTERS_NAMES.BALCONY]: 'balcony',
  [FILTERS_NAMES.PARKING]: 'parkings',
};
