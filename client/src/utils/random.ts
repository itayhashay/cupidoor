import { PaymentsCond } from "../types/paymentsCond";

export const randomNumber = (min: number, max: number): number => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
export const randomDate = (start: Date, end: Date): Date => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export const randomPaymentCond = (): PaymentsCond => {
    const pc: PaymentsCond = {
        rent: randomNumber(3000, 6000),
        propertyTax: randomNumber(100, 350),
        numOfPayments: randomNumber(1, 12),
        houseCommittee: randomNumber(50, 200),
        paymentDay: randomNumber(1, 31)
    } 

    return pc;
}