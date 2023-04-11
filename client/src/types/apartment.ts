import { PaymentsCond } from "./paymentsCond";
import { User } from "./user";

export type Apartment = {
    id: number;
    landlord: User;
    description: string;
    address: string;
    propertyCond: string;
    entryDate: Date;
    floor: number;
    squareMeter: number;
    balcony: number;
    match: number;
    parkings: number;
    rooms: number;
    paymentsCond: PaymentsCond
}