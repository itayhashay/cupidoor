import { PaymentsCond } from './paymentsCond';
import { User } from './user';

export type ServerApartmentImages = {
  name: string;
  url: string;
  _id: string;
};
export type Apartment = {
  [key: string]: string | any;
  _id: string;
  user: User;
  description: string;
  propertyCondition: string;
  city: string;
  street: string;
  houseNumber: number;
  floor: number;
  rooms: number;
  elevator: boolean;
  houseArea: number;
  parkings: number;
  balconies: number;
  entranceDate: Date;
  furnished: boolean;
  bars: boolean;
  boiler: boolean;
  airConditioner: boolean;
  accessible: boolean;
  garage: boolean;
  shelter: boolean;
  longTerm: boolean;
  numOfPayments: number;
  paymentDay: number;
  price: number;
  committee: number;
  tax: number;
  totalPrice: number;
  images: ServerApartmentImages[];
  createdAt: Date;
  match?:number;
  imagesBackup?:ServerApartmentImages[]
};
