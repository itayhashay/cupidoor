import { PaymentsCond } from "./paymentsCond";
import { User } from "./user";

export type Apartment = {
  _id: string;
  user: User;
  description: string;
  address: string;
  images:string[],
  propertyCond: string;
  entryDate: Date;
  floor: number;
  squareMeter: number;
  balcony: number;
  match: number;
  parkings: number;
  rooms: number;
  cost: number;
  isBasement: boolean;
  haveBoiler: boolean;
  haveBalcony: boolean;
  furnished: boolean;
  accessible: boolean;
  hasElevator: boolean;
  hasGarage: boolean;
  hasAirConditioning: boolean;
  isLongTerm: boolean;
  hasBars: boolean;
  isRenovated: boolean;
  hasShelter: boolean;
  paymentsCond: PaymentsCond;
};
