import { SliderProps } from "../../types/filters";

const FILTERS_NAMES = {
    MATCH_PRECENT: "match-precent",
    PRICE: "price",
    ROOMS: "rooms",
    SQUARE_METER: "square-meter",
    FLOOR: "floor",
    BALCONY: "balcony",
    PARKING: "parking",
  };

  export const DEFAULT_FILTERS = {
    [FILTERS_NAMES.MATCH_PRECENT]: null,
    [FILTERS_NAMES.PRICE]: null,
    [FILTERS_NAMES.ROOMS]: null,
    [FILTERS_NAMES.SQUARE_METER]: null,
    [FILTERS_NAMES.FLOOR]: null,
    [FILTERS_NAMES.BALCONY]: null,
    [FILTERS_NAMES.PARKING]: null,
  };

  export const BALCONY_PROPS: SliderProps = {
      minDistance: 0,
      minValue: 0,
      maxValue: 5,
      step: 1,
      filterName: FILTERS_NAMES.BALCONY,
  };

  export const FLOOR_PROPS: SliderProps = {
      minDistance: 0,
      minValue: -1,
      maxValue: 20,
      step: 1,
      filterName: FILTERS_NAMES.FLOOR,
  }

export const PARKING_PROPS: SliderProps = {
    minDistance: 0,
    minValue: 0,
    maxValue: 5,
    step: 1,
    filterName: FILTERS_NAMES.PARKING,
}
export const PRECENT_MATCH_PROPS: SliderProps = {
    minDistance: 5,
    minValue: 0,
    maxValue: 100,
    step: 5,
    filterName: FILTERS_NAMES.MATCH_PRECENT,

}

export const PRICE_PROPS: SliderProps = {
    minDistance: 10,
    minValue: 0,
    maxValue: 9000,
    step: 5,
    filterName: FILTERS_NAMES.PRICE,

}

export const ROOMS_PROPS: SliderProps = {
    minDistance: 0,
    minValue: 1,
    maxValue: 10,
    step: 0.5,
    filterName: FILTERS_NAMES.ROOMS,

}

export const SQUARE_METER_PROPS: SliderProps = {
    minDistance: 10,
    minValue: 10,
    maxValue: 350,
    step: 5,
    filterName: FILTERS_NAMES.SQUARE_METER,

}

export const FILTERS_TO_PATH = {
    [FILTERS_NAMES.MATCH_PRECENT]: "match",
    [FILTERS_NAMES.PRICE]: "rent",
    [FILTERS_NAMES.ROOMS]: "rooms",
    [FILTERS_NAMES.SQUARE_METER]: "squareMeter",
    [FILTERS_NAMES.FLOOR]: "floor",
    [FILTERS_NAMES.BALCONY]: "balcony",
    [FILTERS_NAMES.PARKING]: "parkings",
  };
