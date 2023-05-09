import RoomsIcon from "../icons/aparment/rooms.png";
import FloorIcon from "../icons/aparment/floor.png";
import Mr2Icon from "../icons/aparment/mr.png";
import ParkingIcon from "../icons/aparment/parking.png";
import BalconyIcon from "../icons/aparment/balcony.png";
import PriceIcon from "../icons/aparment/shekel.png";
import PrecentIcon from "../icons/aparment/percentage.png";

import PrecentsSlider from "../components/Filters/PrecentsRangeSlider";
import PriceRangeSlider from "../components/Filters/PriceRangeSlider";
import RoomsRangeSlider from "../components/Filters/RoomsRangeSlider";
import SquareMeterRangeSlider from "../components/Filters/SquareMeterRangeSlider";
import FloorRangeSlider from "../components/Filters/FloorRangeSlider";
import BalconyRangeSlider from "../components/Filters/BalconyRangeSlider";
import ParkingRangeSlider from "../components/Filters/ParkingRangeSlider";


export const BasicFilters: { id: number, displayName: string, icon: string, component?: JSX.Element}[] = [
  {
    id: 1,
    displayName: "Minimum Match",
    icon: PrecentIcon,
    component: <PrecentsSlider />
  },
  {
    id: 2,
    displayName: "Price",
    icon: PriceIcon,
    component: <PriceRangeSlider />
  },
  {
    id: 3,
    displayName: "Rooms",
    icon: RoomsIcon,
    component: <RoomsRangeSlider />
  },
  {
    id: 4,
    displayName: "Square Meter",
    icon: Mr2Icon,
    component: <SquareMeterRangeSlider />
  },
  {
    id: 5,
    displayName: "Floor",
    icon: FloorIcon,
    component: <FloorRangeSlider />
  },
  {
    id: 5,
    displayName: "Balcony",
    icon: BalconyIcon,
    component: <BalconyRangeSlider />
  },
  {
    id: 5,
    displayName: "Parking Spots",
    icon: ParkingIcon,
    component: <ParkingRangeSlider />
  },
];

