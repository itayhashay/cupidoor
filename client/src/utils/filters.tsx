import _ from 'lodash';

import RoomsIcon from '../icons/apartment/rooms.png';
import FloorIcon from '../icons/apartment/floor.png';
import Mr2Icon from '../icons/apartment/mr.png';
import ParkingIcon from '../icons/apartment/parking.png';
import BalconyIcon from '../icons/apartment/balcony.png';
import PriceIcon from '../icons/apartment/shekel.png';
import PrecentIcon from '../icons/apartment/percentage.png';

import PetIcon from '../icons/lifeStyle/pet.png';
import SmokeIcon from '../icons/lifeStyle/smoke.png';
import RoomatesIcon from '../icons/lifeStyle/roomates.png';
import SalaryIcon from '../icons/lifeStyle/salary.png';
import RelationsIcon from '../icons/lifeStyle/relationship.png';

import { CheckBoxFilter, Filter } from '../types/filters';
import * as FILTERS from '../components/Filters/constants';
import { Apartment } from '../types/apartment';
import { FILTERS_TO_PATH } from '../components/Filters/constants';
import { USER_ROUTES } from '../components/UserRouter/constants';

import AllIcon from '../icons/sidebar/all.png';
import AllSelecedIcon from '../icons/sidebar/all-selected.png';
import LikedIcon from '../icons/sidebar/liked.png';
import LikedSelectedIcon from '../icons/sidebar/liked-selected.png';
import MyIcon from '../icons/sidebar/my.png';
import MySelecedIcon from '../icons/sidebar/my-selected.png';
import { FiltersStateType } from '../components/Sidebar';

export const BasicFilters: Filter[] = [
  {
    id: 1,
    displayName: 'Match Precent',
    icon: PrecentIcon,
    props: FILTERS.PRECENT_MATCH_PROPS,
  },
  {
    id: 2,
    displayName: 'Price',
    icon: PriceIcon,
    props: FILTERS.PRICE_PROPS,
  },
  {
    id: 3,
    displayName: 'Rooms',
    icon: RoomsIcon,
    props: FILTERS.ROOMS_PROPS,
  },
  {
    id: 4,
    displayName: 'Square Meter',
    icon: Mr2Icon,
    props: FILTERS.SQUARE_METER_PROPS,
  },
  {
    id: 5,
    displayName: 'Floor',
    icon: FloorIcon,
    props: FILTERS.FLOOR_PROPS,
  },
  {
    id: 6,
    displayName: 'Balcony',
    icon: BalconyIcon,
    props: FILTERS.BALCONY_PROPS,
  },
  {
    id: 7,
    displayName: 'Parking Spots',
    icon: ParkingIcon,
    props: FILTERS.PARKING_PROPS,
  },
];

export const LifeStyleFilters: Filter[] = [
  {
    id: 8,
    displayName: 'Pets',
    icon: PetIcon,
    props: FILTERS.PRECENT_MATCH_PROPS,
  },
  {
    id: 9,
    displayName: 'Smoke',
    icon: SmokeIcon,
    props: FILTERS.PRECENT_MATCH_PROPS,
  },
  {
    id: 10,
    displayName: 'Landlord',
    icon: RelationsIcon,
    props: FILTERS.PRECENT_MATCH_PROPS,
  },
  {
    id: 11,
    displayName: 'Income',
    icon: SalaryIcon,
    props: FILTERS.PRECENT_MATCH_PROPS,
  },
  {
    id: 12,
    displayName: 'Roomates',
    icon: RoomatesIcon,
    props: FILTERS.PRECENT_MATCH_PROPS,
  },
];

export const PropertyFeaturesFilters: CheckBoxFilter[] = [
  {
    displayName: 'Accessible',
    filterName: 'accessible',
    filterValue: false,
  },
  {
    displayName: 'Boiler',
    filterName: 'boiler',
    filterValue: false,
  },
  {
    displayName: 'Furnished',
    filterName: 'furnished',
    filterValue: false,
  },
  {
    displayName: 'Bars',
    filterName: 'bars',
    filterValue: false,
  },
  {
    displayName: 'Garage',
    filterName: 'garage',
    filterValue: false,
  },
  {
    displayName: 'A/C',
    filterName: 'airConditioner',
    filterValue: false,
  },
  {
    displayName: 'Elevator',
    filterName: 'elevator',
    filterValue: false,
  },
  {
    displayName: 'Long Term',
    filterName: 'longTerm',
    filterValue: false,
  },
  {
    displayName: 'Shelter',
    filterName: 'shelter',
    filterValue: false,
  },
];

export const UserMenuItems = [
  {
    id: 3,
    displayName: 'My Properties',
    urlName: USER_ROUTES.MY_PROPERTIES,
    icon: <img alt='' src={MyIcon} />,
    selectedIcon: <img alt='' src={MySelecedIcon} />,
    roles: ['landlord', 'both', 'admin'],
  },
  {
    id: 2,
    displayName: 'Liked Apartments',
    urlName: USER_ROUTES.LIKED_APARTMENTS,
    icon: <img alt='' src={LikedIcon} />,
    selectedIcon: <img alt='' src={LikedSelectedIcon} />,
    roles: ['tenant', 'both', 'admin'],
  },
  {
    id: 1,
    displayName: 'All Apartments',
    urlName: USER_ROUTES.ALL_APARTMENTS,
    icon: <img alt='' src={AllIcon} />,
    selectedIcon: <img alt='' src={AllSelecedIcon} />,
    roles: ['tenant', 'landlord', 'both', 'admin'],
  },
];

export const filtersToUrl = (filters: FiltersStateType): string => {
  let url = '?';
  let isChange = false;

  for (const filterName in filters) {
    if (filters[filterName] !== null) {
      url = url.concat(isChange ? '&' : '', `${filterName}=${filters[filterName]}`);
      isChange = true;
    }
  }
  return url;
};

export const queryToFilters = (queryString: string): FiltersStateType => {
  const paramsStr = queryString.substring(1);
  const params = paramsStr.split('&');

  const filtersObj = params.reduce((filtersObj: FiltersStateType, currentValue: string) => {
    const filterParts = currentValue.split('=');
    if (filterParts[1] === 'true') {
      filtersObj[filterParts[0]] = true;
    } else {
      const filterValuesStr = filterParts[1].split(',');
      const filterValues = filterValuesStr.map((value) => parseInt(value));
      filtersObj[filterParts[0]] = filterValues;
    }

    return filtersObj;
  }, {});
  return filtersObj;
};

export const filterByUserProperties = (
  filters: FiltersStateType,
  apartments: Apartment[],
): Apartment[] => {
  const enabledFilters: { [x: string]: number[] } = _.flow([
    Object.entries,
    (arr: any[]) => arr.filter(([key, value]) => value !== null),
    Object.fromEntries,
  ])(filters);

  for (const filterName in enabledFilters) {
    apartments = apartments.filter((apartment: Apartment) => {
      const filterValue = enabledFilters[filterName];
      if (typeof filterValue === 'boolean') {
        return apartment[filterName] == true;
      } else if (Array.isArray(filterValue)) {
        const apartmentValue: number = parseInt(
          apartment[filterName as keyof typeof apartment] as string,
        );
        const bottomValue: number = enabledFilters[filterName][0];
        const topValue: number = enabledFilters[filterName][1];

        return apartmentValue >= bottomValue && apartmentValue <= topValue;
      }
    });
  }

  return apartments;
};
