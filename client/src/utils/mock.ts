import { Apartment } from "../types/apartment";
import { randomDate, randomNumber, randomPaymentCond } from "./random";
import { PROPERTY_CONDITIONS } from "./properyConditions";
import { User } from "../types/user";

const DESC_MOCK: string = `This apartment is great, has nice view, and tenants \nWe love animals, Sports and having fun on Fridays. \nLooking for someone like me`

export const LANDLORD_MOCK: User = {
    id: 0,
    firstName: "Avi",
    lastName: "Cohen",
    familiarity: `I am Avi, like pets, and having car parking.
        Looking for a second tenant to the great
        current one.`,
    isLandlord: true,
    email: "Avi@gmail.com",
    password: "Password1",
    dateOfBirth: new Date()
}

export const TANENT_MOCK: User = {
    id: 0,
    firstName: "Moshe",
    lastName: "Levi",
    familiarity: `I am Moshe, like pets, and having car parking.
        Looking for a second tenant to the great
        current one.`,
    isLandlord: false,
    email: "Moshe@gmail.com",
    password: "Password1",
    dateOfBirth: new Date()
}

export const HOUSES: Apartment[] = [
{id: 1, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Tel Aviv, George Wise 2' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 2, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Jerusalem, Gooday 32' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 5, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 3, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Rishon, Yordei hasira 4' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 4, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Maccabbim-Reut, Meshushim 666' , propertyCond: PROPERTY_CONDITIONS.RENOVATION_IS_NEEDED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 5, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Tivon, Pashus 99' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 6, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Hod hasharon, Tsharnichovsky 11' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 7, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Neverland, Chip 55' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 8, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Eilat, Hovevei zion 34' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 9, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Holon, Matityahu 12' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 3, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 10, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Modiin, Lev hair 10' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 2, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 11, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Dimona, Lilach 92' , propertyCond: PROPERTY_CONDITIONS.PRESERVED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 4, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 12, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Tel Aviv, George Wise 2' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 13, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Jerusalem, Gooday 32' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 5, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 14, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Maccabbim-Reut, Meshushim 666' , propertyCond: PROPERTY_CONDITIONS.RENOVATION_IS_NEEDED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 15, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Tivon, Pashus 99' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 16, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Hod hasharon, Tsharnichovsky 11' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 17, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Neverland, Chip 55' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 18, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Eilat, Hovevei zion 34' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 19, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Holon, Matityahu 12' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 3, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 20, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Modiin, Lev hair 10' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 2, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 21, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Dimona, Lilach 92' , propertyCond: PROPERTY_CONDITIONS.PRESERVED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 4, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 22, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Jerusalem, Gooday 32' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 5, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 23, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Rishon, Yordei hasira 4' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 24, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Maccabbim-Reut, Meshushim 666' , propertyCond: PROPERTY_CONDITIONS.RENOVATION_IS_NEEDED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 25, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Tivon, Pashus 99' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 26, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Hod hasharon, Tsharnichovsky 11' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 27, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Neverland, Chip 55' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 28, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Eilat, Hovevei zion 34' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 29, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Holon, Matityahu 12' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 3, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 30, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Modiin, Lev hair 10' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 2, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 31, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Dimona, Lilach 92' , propertyCond: PROPERTY_CONDITIONS.PRESERVED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 4, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 32, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Jerusalem, Gooday 32' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 5, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 33, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Rishon, Yordei hasira 4' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 34, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Maccabbim-Reut, Meshushim 666' , propertyCond: PROPERTY_CONDITIONS.RENOVATION_IS_NEEDED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 35, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Tivon, Pashus 99' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 36, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Hod hasharon, Tsharnichovsky 11' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 37, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Neverland, Chip 55' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 38, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Eilat, Hovevei zion 34' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 39, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Holon, Matityahu 12' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 3, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 40, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Modiin, Lev hair 10' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 2, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 41, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Tel Aviv, George Wise 2' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 42, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Jerusalem, Gooday 32' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 5, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 43, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Rishon, Yordei hasira 4' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 44, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Maccabbim-Reut, Meshushim 666' , propertyCond: PROPERTY_CONDITIONS.RENOVATION_IS_NEEDED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 45, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Tivon, Pashus 99' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 46, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Hod hasharon, Tsharnichovsky 11' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 47, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Neverland, Chip 55' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 48, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Eilat, Hovevei zion 34' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 49, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Holon, Matityahu 12' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 3, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 50, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Modiin, Lev hair 10' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 2, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 51, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Tel Aviv, George Wise 2' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 52, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Jerusalem, Gooday 32' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 5, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 53, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Rishon, Yordei hasira 4' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 54, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Maccabbim-Reut, Meshushim 666' , propertyCond: PROPERTY_CONDITIONS.RENOVATION_IS_NEEDED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 55, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Tivon, Pashus 99' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 56, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Hod hasharon, Tsharnichovsky 11' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 57, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Neverland, Chip 55' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 58, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Eilat, Hovevei zion 34' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 59, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Holon, Matityahu 12' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 3, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
{id: 60, landlord: LANDLORD_MOCK, description: DESC_MOCK, address: 'Modiin, Lev hair 10' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 2, match: randomNumber(0, 100), rooms: 3, rent: randomNumber(3000, 9000), paymentsCond: randomPaymentCond()},
]

export const USER_INIT: User = {
    id: 0,
    firstName: '',
    lastName: '',
    familiarity: '',
    isLandlord: false,
    email: "",
    password: "",
    dateOfBirth: new Date()
}

export const HOUSE_INIT: Apartment = {
    id: 0, landlord: USER_INIT,
    description: '', address: '', propertyCond: PROPERTY_CONDITIONS.NEW, entryDate: new Date(),
    floor: 0, squareMeter: 0, balcony: 0, parkings: 0, match: 0, rooms: 0, rent: 0, paymentsCond: {
        rent: 0, 
        propertyTax: 0,
        numOfPayments: 0,
        houseCommittee: 0,
        paymentDay: 0
    }
}