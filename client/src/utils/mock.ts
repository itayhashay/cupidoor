import { Apartment } from "../types/apartment";
import { randomDate, randomNumber, randomPaymentCond, randomProperties } from "./random";
import { PROPERTY_CONDITIONS } from "./properyConditions";
import { LINKS_NAMES, User } from "../types/user";

const DESC_MOCK: string = `This apartment is great, has nice view, and tenants \nWe love animals, Sports and having fun on Fridays. \nLooking for someone like me`

export const LANDLORD_MOCK: User = {
    _id: "0",
    firstName: "Avi",
    lastName: "Cohen",
    name:"Avi Cohen",
    description: `I am Avi, like pets, and having car parking.
        Looking for a second tenant to the great
        current one.`,
    isLandlord: true,
    email: "Avi@gmail.com",
    password: "Password1",
    age: "27",
    role: "both",
    phone: "0525915998",
    dateOfBirth: new Date(),
    isFilledAllQ: false
}

export const TANENT_MOCK: User = {
    _id: "0",
    firstName: "Moshe",
    lastName: "Levi",
    description: `I am Moshe, like pets, and having car parking.
        Looking for a second tenant to the great
        current one.`,
    isLandlord: false,
    email: "Moshe@gmail.com",
    password: "Password1",
    age: "27",
    jobTitle: "Full Stack Developer",
    role: "tenant",
    phone: "0525915998",
    dateOfBirth: new Date(),
    linkes: [
        {
            name: LINKS_NAMES.LINKEDIN,
            value: "moshe-levi",
            link: "https://www.linkedin.com/in/matan-amzaleg-058050252/"
        },
        {
            name: LINKS_NAMES.INSTAGRAM,
            value: "@MosheLevi",
            link: "https://www.instagram.com/"
        },
        {
            name: LINKS_NAMES.FACEBOOK,
            value: "Moshe Levi",
            link: "https://www.facebook.com/people/%D7%A0%D7%98%D7%9C%D7%99-%D7%9C%D7%99%D7%90%D7%95%D7%9F/100002037339530/?comment_id=Y29tbWVudDo1MjgzNjY5MjM5NDgxOTRfNTI4NzUzNjg3MjQyODUx"
        },
        {
            name: LINKS_NAMES.TIKTOK,
            value: "@MosheLevi",
            link: "https://www.tiktok.com/music/Originalton-7235275824898181915"
        },
        {
            name: LINKS_NAMES.TWITTER,
            value: "moshe-levi",
            link: "https://twitter.com/rothmar"
        }
    ],
    isFilledAllQ: false
}

export const HOUSES_IMAGES: string[] = [
    "https://images1.apartments.com/i2/q0uzoy-nkMudYSWqT2ekYIYuJGC2N4Mj6SxD1DaWz_Y/102/820-michigan-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/dR2wcxeSyitSwkn2EDYMyAKa_cXD_thKVIAJi5QuImI/102/regents-park-chicago-il-diningliving-room.jpg",
    "https://images1.apartments.com/i2/og0KioIje520gp0isHGeQmKhHhVCqwvpiLQAhObB6x4/102/731-plymouth-chicago-il-renovated-2-bedroom.jpg",
    "https://images1.apartments.com/i2/v8tE7PDDakCErZLVFuc9_rkxiFEYLiagRvWMWwmcARY/102/420-e-ohio-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/6WxBq4hG0sk5VVQVbgppBzDjKzeL-NpU1ozFxhKv-VU/102/the-bush-temple-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/nk7D1e2rmY7zn3aFGyNeAljazY777g9CTq9ntw0yZ1A/102/park-michigan---1212-s-michigan-ave-chicago-il-one-bed---living-room.jpg",
    "https://images1.apartments.com/i2/6sCNne0UybGGL89KBvQvdQ4DweAwG_V7HmeVGzK7Pq8/102/sonu-digs-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/W1TTqNmbJ7sO0OvUu7S3AZ0DJlsWEkebkIF48eGNIRs/102/1401-s-state-chicago-il-kitchen.jpg",
    "https://images1.apartments.com/i2/m7wJmw4987akrzsNWfcwgxx66aXSAoFJckz76gNMURY/102/avenir-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/lhas4Yd-A7yTM0zVSw0XQg6j6JkcIE7H1O0nvTIJ2Aw/102/morningside-south-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/gxAkDwJShdOKlqTDCT30_4ZG9_Wd0rVQGh8QWn3wkg0/102/one-superior-place-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/iGY3ChYMg9-6WNn2N3B5DLIM7N-fOUqYPfrqKTdAf4I/102/the-otis-chicago-il-rooftop-party-room.jpg",
    "https://images1.apartments.com/i2/kOjS9m_jETIHIdbH7qOrrxvAmsubaHB0syUIuqPvb4c/102/state-and-grand-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/lQrcQCfaTSZaxQJxIWTX1Vm6zu2Dvhah0st5Mo5eOd0/102/sentral-michigan-avenue-chicago-il-sentralchicago1br4210a3f1280x960001.jpg",
    "https://images1.apartments.com/i2/j-w7ny9PMQWpITL54aqBeHHDAmyfJo2BO77aYRZzb5A/102/am1980-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/5qAsgXWE2mr_jQTkPzj-gNtweqwNe8Rf8u1DgkomA3s/102/2555-n-clark-st-chicago-il-kitchen-breakfast-bar.jpg",
    "https://images1.apartments.com/i2/S_nwN_zUFnU6iSWIbB3pYORv-NZnjuARCeIIHRNjR_c/102/arrive-lex-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/1ZDJMRbDJJNvwjPYEdhZ1ApxqZBkMWpAwwZxwI0gLQg/102/noca-blu-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/Rbx_rkiHrTWo5WpSuhlaAShUgeI6UCzP96MP4b44WMs/102/north-harbor-tower-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/7qzDvq3c6q_57o7tvG98O-eLfccYp4DWwP1y7S_OK7A/102/shoreham-and-tides-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/4BcoMSLlh6a5GIwg-9RwrEM1-lVPiSyPEhw_mjPp6L4/102/arrive-south-loop-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/pvUdP9jJxsKmUlHhRGaXDZMuqT_RcsdDA6x_nc4C0Fc/102/exhibit-on-superior-chicago-il-interior-photo.jpg",
    "https://images1.apartments.com/i2/xyCPN3mdqKdEKHCECJjK4jqToXBnOgyjOWoBLZAFOIQ/102/cascade-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/I442sJamSF_7beyZCfDN8zaTRyYKpat4RtwDrGjnbW8/102/the-elle-apartments-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/URxCdQn_u5eKroGUKatRNgtyO1FMMk2sqeaRh_fKCHg/102/the-residences-at-the-eagle-building---383-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/MV64f2nlZ-vNIWAoclfvfLj-fEOYQ881XC3Q-9LkytY/102/1001-south-state-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/YPoNCZYBSTjPgDKKOBGuHmu5schH0oVs57MGdaP__r0/102/the-shelby-chicago-il-kitchen.jpg",
    "https://images1.apartments.com/i2/HoPZwIPFhdUl8ujdDoNI040PktKHuXfuUMUf6ZHj6O8/102/the-morgan-at-loyola-station-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/8iar9XQuLFHdBptgVkbRIYjdtRwClFR4i7JT2585_f4/102/850-lake-shore-drive-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/GK5aZM5wMCwInfslSV_mOAeswoSp-2_ozRLHTBfVfRI/102/coast-at-lakeshore-east-chicago-il-coast-features-views-of-the-river.jpg",
    "https://images1.apartments.com/i2/KJ6xQlCT5VRVDGpJchTcNlymi9fFu7K7z9ma_8dlXPE/102/aston-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/yh7vyptas1w3gh1blmNhvon56wZutDxcz-TTdxRCV0A/102/the-bernardin-chicago-il-the-bernardin-furnished-model-home.jpg",
    "https://images1.apartments.com/i2/NF-GijqHdoiU0AcGdrUF7wgNZrIl_pybJMjp1XJp3dk/102/mondial-river-west-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/BqWjx2g4WG7gT5pSo1WW9o2el4UR5nyd1DJW0d_vGjU/102/the-reed-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/8RLUybEb0bNb49zMlYJVYj9GLt-6wzT6t4MqGia7VZA/102/cobbler-square-lofts-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/iCoD-ZUlNtSA7gwGPu43apVKJFUbA3tmEIzKeE6fSlI/102/river-west-lofts-chicago-il-502-1-bed-plus-den.jpg",
    "https://images1.apartments.com/i2/ectMzJMI3UMPxtdbTuqf8B6nb3DFMEmhrPEAWZwixS0/102/platform-4611-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/EEWiuo_nMVPV3XI468DRqNdYNsksxVuHMmcg3PQ00GA/102/coeval-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/6Eyqz_i37WQ5bBF3WdKq593E2NuEjgUtSygrNYp1OOQ/102/jeffjack-apartments-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/zRLWxhi6LRi6Y439ay68tjVY4eJxcZzE4W9RVjPIx1Y/102/chestnut-tower-apartments-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/JNiSsN2Ans-xQjmV5IxK3AgX8iQxfUgB_iHbVjMtRJc/102/the-streeter-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/n6yG-RGeGOpWTMxOsXIIWqf07o61FMtuNnst_ZYUphM/102/the-parker-fulton-market-chicago-il-interior-photo.jpg",
    "https://images1.apartments.com/i2/vu-JhPXYNqbH2SLSgGu1tMprwEl6yZwEOfU9wVYMOUs/102/one-six-six-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/VugNX39O5TqkvrpeOZ8cjHi25PJo_U63GsYvCKOGe54/102/amli-river-north-chicago-il-rivernorthinteriorliving-room.jpg",
    "https://images1.apartments.com/i2/w9WVgxI00cPmyEphbxi89uzEfZsUgJY9CQnFh3yYoWs/102/sono-east-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/QfMdQ9SmH9PZ2rZUmv-gP7kFvY5JGcJiCmmOsPaGkpo/102/westerly-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/xKSAA3jhS8wysOBa_sCLEfva31x7IbakAissGYYSeI4/102/north-water-apartments-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/ugkY_a-bYh3dRGcArit-PZdqWYYlBH0O1sB9HJmzZZU/102/amli-808-chicago-il-808interiorkitchen-3.jpg",
    "https://images1.apartments.com/i2/-7ZSsEtrgiUs7RWyVH6haL4TprOJvdDZ3bUHUb7N2g0/102/the-van-buren-chicago-il-interior-photo.jpg",
    "https://images1.apartments.com/i2/BOMaAotsuo4y11F2_Fs67dm0mcAPoCJSrPC1J34Mk1U/102/8-east-huron-chicago-il-residences-at-8-e-huron.jpg",
    "https://images1.apartments.com/i2/NSqnANcUMTqg23QmIfng7qMpPD53ncQy6_8_iFTPp3E/102/gateway-west-loop-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/zIIiPuMUo5pbx0SwcYhjELfHPwwpeNefJac-5JmnIlg/102/circa-922-chicago-il-interior-photo.jpg",
    "https://images1.apartments.com/i2/P_Y7XSHDu7DlhKIgg3HAOo5MkMyW6Jodq_nkTDNW-9w/102/aurelien-chicago-il-interior-photo.jpg",
    "https://images1.apartments.com/i2/gwmN0-0c3IqLW5B-CWiVlE50fdls848gNZKWplzcs2k/102/logan-apartments-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/yWzkBTxafzm6vtSGy3OlUVB6CayV289I6IKkDvwMOUw/102/5252-chicago-il-building-photo.jpg",
    "https://images1.apartments.com/i2/q_fImH8TyyFOMQrC9hgOdJWdmljQ0qdQIFIHzNeZbyU/116/the-belden-stratford-chicago-il-primary-photo.jpg?p=1",
    "https://images1.apartments.com/i2/XHChfFADxcKywMjRst0b4_HO-kBJ0-GFa47PZhu3jCc/116/fulbrix-chicago-il-primary-photo.jpg?p=1",
    "https://images1.apartments.com/i2/XO5Jol3fwQsAl45014RP6CbkJeZhfySJc-cenCOYQkw/116/the-808-cleveland-by-common-chicago-il-primary-photo.jpg?p=1",
    "https://www.apartments.com/images/default-source/2019-naa/parkline-apartment-in-miami-fla2dc2731-e6f2-4dca-89c5-38245ccacea1.tmb-featuredim.jpg?sfvrsn=55bc41ed_1",
    "https://images1.apartments.com/i2/uswEseKnMnU4ebRfW82ffcgXEYpOCC83yHHHKKNUEzM/116/the-residences-at-newcity-chicago-il-primary-photo.jpg?p=1"
];


const randomImages = ()=>{
    const randomImageArray = [...HOUSES_IMAGES];
    const randomIndex = Math.floor(Math.random() * randomImageArray.length -2);
    randomImageArray[0] = randomImageArray[randomIndex];
    return randomImageArray;
}

export const HOUSES: Apartment[] = [
{_id: "1", images:randomImages(),user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Tel Aviv, George Wise 2' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "2", images:randomImages(),user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Jerusalem, Gooday 32' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 5, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "3", images:randomImages(),user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Rishon, Yordei hasira 4' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "4", images:randomImages(),user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Maccabbim-Reut, Meshushim 666' , propertyCond: PROPERTY_CONDITIONS.RENOVATION_IS_NEEDED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "5", images:randomImages(),user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Tivon, Pashus 99' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "6", images:randomImages(),user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Hod hasharon, Tsharnichovsky 11' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "7", images:randomImages(),user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Neverland, Chip 55' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "8", images:randomImages(),user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Eilat, Hovevei zion 34' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "9", images:randomImages(),user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Holon, Matityahu 12' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 3, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "10",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Modiin, Lev hair 10' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 2, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "11",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Dimona, Lilach 92' , propertyCond: PROPERTY_CONDITIONS.PRESERVED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 4, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "12",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Tel Aviv, George Wise 2' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "13",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Jerusalem, Gooday 32' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 5, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "14",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Maccabbim-Reut, Meshushim 666' , propertyCond: PROPERTY_CONDITIONS.RENOVATION_IS_NEEDED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "15",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Tivon, Pashus 99' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "16",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Hod hasharon, Tsharnichovsky 11' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "17",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Neverland, Chip 55' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "18",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Eilat, Hovevei zion 34' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "19",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Holon, Matityahu 12' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 3, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "20",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Modiin, Lev hair 10' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 2, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "21",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Dimona, Lilach 92' , propertyCond: PROPERTY_CONDITIONS.PRESERVED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 4, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "22",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Jerusalem, Gooday 32' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 5, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "23",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Rishon, Yordei hasira 4' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "24",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Maccabbim-Reut, Meshushim 666' , propertyCond: PROPERTY_CONDITIONS.RENOVATION_IS_NEEDED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "25",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Tivon, Pashus 99' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "26",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Hod hasharon, Tsharnichovsky 11' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "27",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Neverland, Chip 55' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "28",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Eilat, Hovevei zion 34' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "29",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Holon, Matityahu 12' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 3, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "30",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Modiin, Lev hair 10' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 2, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "31",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Dimona, Lilach 92' , propertyCond: PROPERTY_CONDITIONS.PRESERVED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 4, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "32",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Jerusalem, Gooday 32' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 5, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "33",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Rishon, Yordei hasira 4' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "34",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Maccabbim-Reut, Meshushim 666' , propertyCond: PROPERTY_CONDITIONS.RENOVATION_IS_NEEDED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "35",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Tivon, Pashus 99' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "36",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Hod hasharon, Tsharnichovsky 11' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "37",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Neverland, Chip 55' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "38",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Eilat, Hovevei zion 34' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "39",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Holon, Matityahu 12' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 3, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "40",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Modiin, Lev hair 10' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 2, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "41",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Tel Aviv, George Wise 2' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "42",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Jerusalem, Gooday 32' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 5, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "43",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Rishon, Yordei hasira 4' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "44",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Maccabbim-Reut, Meshushim 666' , propertyCond: PROPERTY_CONDITIONS.RENOVATION_IS_NEEDED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "45",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Tivon, Pashus 99' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "46",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Hod hasharon, Tsharnichovsky 11' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "47",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Neverland, Chip 55' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "48",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Eilat, Hovevei zion 34' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "49",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Holon, Matityahu 12' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 3, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "50",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Modiin, Lev hair 10' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 2, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "51",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Tel Aviv, George Wise 2' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "52",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Jerusalem, Gooday 32' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 5, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "53",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Rishon, Yordei hasira 4' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "54",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Maccabbim-Reut, Meshushim 666' , propertyCond: PROPERTY_CONDITIONS.RENOVATION_IS_NEEDED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "55",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Tivon, Pashus 99' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "56",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Hod hasharon, Tsharnichovsky 11' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "57",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Neverland, Chip 55' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "58",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Eilat, Hovevei zion 34' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "59",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Holon, Matityahu 12' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 3, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
{_id: "60",images:randomImages(), user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Modiin, Lev hair 10' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 2, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
];

export const USER_INIT: User = {
    _id: "0",
    firstName: '',
    lastName: '',
    description: '',
    isLandlord: false,
    email: "",
    password: "",
    age: "",
    role: "tenant",
    phone: "",
    dateOfBirth: new Date(),
    isFilledAllQ: false
};

export const HOUSE_INIT: Apartment = {
    _id: "0", user: USER_INIT,
    images:[],
    description: '', address: '', propertyCond: PROPERTY_CONDITIONS.NEW, entryDate: new Date(),
    floor: 0, squareMeter: 0, balcony: 0, parkings: 0, match: 0, rooms: 0, cost: 0,accessible:false,furnished:false,haveBalcony:false,haveBoiler:false,isBasement:false, hasElevator:false,
    hasGarage:false,
    hasAirConditioning:false,
    isLongTerm:false,
    hasBars:false,
    isRenovated:false,
    hasShelter:false,
    paymentsCond: {
        rent: 0, 
        propertyTax: 0,
        numOfPayments: 0,
        houseCommittee: 0,
        paymentDay: 0
    }
};




export const PROFILE_PICTURES: string[] = [
    "https://images.unsplash.com/photo-1461088945293-0c17689e48ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwyMXx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1679679008383-6f778fe07828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MXwxfHNlYXJjaHwyMnx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwyM3x8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwyNHx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1463453091185-61582044d556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwyNXx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwyNnx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1484863137850-59afcfe05386?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwyN3x8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1492567291473-fe3dfc175b45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwyOHx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1659482633371-c51d3a02bc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MXwxfHNlYXJjaHwyOXx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1517586979036-b7d1e86b3345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzMHx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzMXx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzMnx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzM3x8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzNHx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1511732351157-1865efcb7b7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzNXx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1657310209576-6595b2c68d6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MXwxfHNlYXJjaHwzNnx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1481437642641-2f0ae875f836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzN3x8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzOHx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1484353371297-d8cfd2895020?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzOXx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1492446845049-9c50cc313f00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHw0MHx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1461088945293-0c17689e48ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwyMXx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1679679008383-6f778fe07828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MXwxfHNlYXJjaHwyMnx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwyM3x8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwyNHx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1463453091185-61582044d556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwyNXx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwyNnx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1484863137850-59afcfe05386?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwyN3x8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1492567291473-fe3dfc175b45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwyOHx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1659482633371-c51d3a02bc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MXwxfHNlYXJjaHwyOXx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1517586979036-b7d1e86b3345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzMHx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzMXx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzMnx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzM3x8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzNHx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1511732351157-1865efcb7b7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzNXx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1657310209576-6595b2c68d6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MXwxfHNlYXJjaHwzNnx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1481437642641-2f0ae875f836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzN3x8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzOHx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1484353371297-d8cfd2895020?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzOXx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1492446845049-9c50cc313f00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHw0MHx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1461088945293-0c17689e48ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwyMXx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1679679008383-6f778fe07828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MXwxfHNlYXJjaHwyMnx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwyM3x8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwyNHx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1463453091185-61582044d556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwyNXx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwyNnx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1484863137850-59afcfe05386?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwyN3x8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1492567291473-fe3dfc175b45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwyOHx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1659482633371-c51d3a02bc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MXwxfHNlYXJjaHwyOXx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1517586979036-b7d1e86b3345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzMHx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOHww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzMXx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzMnx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzM3x8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzNHx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1511732351157-1865efcb7b7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzNXx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1657310209576-6595b2c68d6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MXwxfHNlYXJjaHwzNnx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1481437642641-2f0ae875f836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzN3x8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzOHx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1484353371297-d8cfd2895020?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzOXx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1492446845049-9c50cc313f00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHw0MHx8UGVvcGxlfGVufDF8fHx8MTY4NDc4NjIyOXww&ixlib=rb-4.0.3&q=80&w=200",
];

export const LANDLORD_PROPERTIES: Apartment[] = [
    {_id: "1",images:[], user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Tel Aviv, George Wise 2' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
    {_id: "2",images:[], user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Jerusalem, Gooday 32' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 5, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
    {_id: "3",images:[], user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Rishon, Yordei hasira 4' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
]

export const LIKED_APARTMENTS: Apartment[] = [
    {_id: "4",images:[], user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Maccabbim-Reut, Meshushim 666' , propertyCond: PROPERTY_CONDITIONS.RENOVATION_IS_NEEDED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
    {_id: "5",images:[], user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Tivon, Pashus 99' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
    {_id: "6",images:[], user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Hod hasharon, Tsharnichovsky 11' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
    {_id: "7",images:[], user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Neverland, Chip 55' , propertyCond: PROPERTY_CONDITIONS.RENOVATED ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 1, squareMeter: 60, balcony: 1, parkings: 3, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
    {_id: "8",images:[], user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Eilat, Hovevei zion 34' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 0, squareMeter: 60, balcony: 1, parkings: 1,match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
    {_id: "9",images:[], user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Holon, Matityahu 12' , propertyCond: PROPERTY_CONDITIONS.NEW_FROM_A_CONTRACTOR ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 3, squareMeter: 60, balcony: 1, parkings: 0, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
    {_id: "10", images:[],user: LANDLORD_MOCK, description: DESC_MOCK, address: 'Modiin, Lev hair 10' , propertyCond: PROPERTY_CONDITIONS.NEW ,entryDate: randomDate(new Date(2012, 0, 1), new Date()), floor: 2, squareMeter: 60, balcony: 1, parkings: 2, match: randomNumber(0, 100), rooms: 3, cost: randomNumber(3000, 9000), paymentsCond: randomPaymentCond(), ...randomProperties()},
]    

export const USER_NAMES: string[] = [
    "Pedro Keller",
    "Gwen Maxwell",
    "Haris Pratt",
    "Bertha Townsend",
    "Kimberley Mcdonald",
    "Alana Spencer",
    "Sebastian Woodward",
    "Taya Dale",
    "Kyan Frye",
    "Gabriela Lloyd"
  ];