import { Dayjs } from "dayjs";
import { User } from "../../types/user";
import { ServerApartmentImages } from "../../types/apartment";
import { QuestionAnswer } from "../../types/questionAnswer";

export type StepperApartment = {
    [key:string]:any;
    _id?: string;
    user?: User | string;
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
    entranceDate: Date | Dayjs | null;
    paymentDay: number;
    totalPrice: number;
    images: ServerApartmentImages[];
    newImages: string[],
    removedImages: string[],
    answers?:QuestionAnswer[]
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

export type ApartmentAbout = Pick<StepperApartment, keyof AboutProps>;

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

export type ApartmentAddress = Pick<StepperApartment, keyof AddressProps>;

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

export type ApartmentPayments = Pick<StepperApartment, keyof PaymentsProps>;

// Images //

export type ImagesProps = {
    images: ServerApartmentImages[];
}

export type ApartmentImages = Pick<StepperApartment, keyof ImagesProps>;

export type UploadedImage = {
  file: File,
  base64: string
}