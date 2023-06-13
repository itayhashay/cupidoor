import { SxProps, Theme } from "@mui/material";
import { AboutProps, AddressProps, CheckboxProps, ImagesProps, NewApartment, PaymentsProps } from "./types";

export const DIALOG_STYLES: SxProps<Theme> = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80vw",
  height: "80vh",
  bgcolor: 'background.paper',
  p: 4,
  border: 0,
  borderRadius: "10px",
  boxShadow: "rgba(226, 226, 226, 0.5) 0px 2px 4px 0px"
};

export const STEPS: string[] = [
    "Property Address",
    "About The Property",
    "Payments",
    "Photos and Videos",
  ];


export const DEFAULT_NEW_APARTMENT_DATA: NewApartment = {
    user: "",
    city: "",
    street: "",
    houseNumber: 0,
    propertyCondition: "",
    houseArea: 0,
    rooms: 1,
    floor: 0,
    parkings: 0,
    balconies: 0,
    description: "",
    accessible: false,
    boiler: false,
    furnished: false,
    airConditioner: false,
    bars: false,
    elevator: false,
    garage: false,
    longTerm: false,
    shelter: false,
    price: 0,
    tax: 0,
    committee: 0,
    numOfPayments: 0,
    entranceDate: null,
    paymentDay: 10,
    totalPrice: 0,
    images: []
  }
  
// About //

export const DEFAULT_ABOUT: AboutProps = {
    propertyCondition: "",
    houseArea: 0,
    rooms: 1,
    floor: 0,
    parkings: 0,
    balconies: 0,
    description: "",
    accessible: false,
    boiler: false,
    furnished: false,
    airConditioner: false,
    bars: false,
    elevator: false,
    garage: false,
    longTerm: false,
    shelter: false,
  }

export const CHECKBOXES_DEFAULT: CheckboxProps[] = [
    {
      key: "accessible",
      display: "Accessible",
    },
    {
      key: "boiler",
      display: "Boiler",
    },
    {
      key: "furnished",
      display: "Furnished",
    },
    {
      key: "airConditioner",
      display: "A/C",
    },
    {
      key: "bars",
      display: "Bars",
    },
    {
      key: "elevator",
      display: "Elevator",
    },
    {
      key: "garage",
      display: "Garage",
    },
    {
      key: "longTerm",
      display: "Long Term",
    },
    {
      key: "shelter",
      display: "Shelter",
    },
  ];

// Address //

export const DEFAULT_ADDRESS: AddressProps = {
    city: "",
    street: "",
    houseNumber: 0
}

// Payments //

export const DEFAULT_PAYMENTS: PaymentsProps = {
    price: 0,
    tax: 0,
    committee: 0,
    numOfPayments: 0,
    entranceDate: null,
    paymentDay: 10,
    totalPrice: 0,
  }

// Images //

export const DEFAULT_IMAGES: ImagesProps = {
    images: []
}
