import { Dayjs } from "dayjs";

export type NewApartment = {
    user: string;
    city: string;
    street: string;
    houseNumber: number;
    propertyCondition: string;
    houseArea: number;
    rooms: number;
    floor: number;
    parkings: number;
    balconies: number;
    description: string;
    accessible: boolean;
    boiler: boolean;
    furnished: boolean;
    airConditioner: boolean;
    bars: boolean;
    elevator: boolean;
    garage: boolean;
    longTerm: boolean;
    shelter: boolean;
    price: number;
    tax: number;
    committee: number;
    numOfPayments: number;
    entranceDate: Dayjs | null;
    paymentDay: number;
    totalPrice: number;
    images: any[];
  }

  // About //

  export type AboutProps = {
    propertyCondition: string;
    houseArea: number;
    rooms: number;
    floor: number;
    parkings: number;
    balconies: number;
    description: string;
    accessible: boolean,
    boiler: boolean,
    furnished: boolean,
    airConditioner: boolean,
    bars: boolean,
    elevator: boolean,
    garage: boolean,
    longTerm: boolean,
    shelter: boolean,
  }

export type ApartmentAbout = Pick<NewApartment, keyof AboutProps>;

export type CheckboxProps = {
    key: string;
    display: string;
}

// Address //

export type AddressProps = {
    city: string;
    street: string;
    houseNumber: number;
}

export type ApartmentAddress = Pick<NewApartment, keyof AddressProps>;

// Payments //

export type PaymentsProps = {
    price: number;
    tax: number;
    committee: number;
    numOfPayments: number;
    entranceDate: Dayjs | null;
    paymentDay: number;
    totalPrice: number;
  }

export type ApartmentPayments = Pick<NewApartment, keyof PaymentsProps>;

// Images //

export type ImagesProps = {
    images: any[]
}

export type ApartmentImages = Pick<NewApartment, keyof ImagesProps>;
