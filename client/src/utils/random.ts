import { PaymentsCond } from "../types/paymentsCond";

export const randomNumber = (min: number, max: number): number => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

export const randomPaymentCond = (): PaymentsCond => {
  const pc: PaymentsCond = {
    rent: randomNumber(3000, 6000),
    propertyTax: randomNumber(100, 350),
    numOfPayments: randomNumber(1, 12),
    houseCommittee: randomNumber(50, 200),
    paymentDay: randomNumber(1, 31),
  };

  return pc;
};

export const randomProperties = () => {
  return {
    accessible: Math.random() < 0.5,
    furnished: Math.random() < 0.5,
    haveBalcony: Math.random() < 0.5,
    haveBoiler: Math.random() < 0.5,
    isBasement: Math.random() < 0.5,
    hasElevator: Math.random() < 0.5,
    hasGarage: Math.random() < 0.5,
    hasAirConditioning: Math.random() < 0.5,
    isLongTerm: Math.random() < 0.5,
    hasBars: Math.random() < 0.5,
    isRenovated: Math.random() < 0.5,
    hasShelter: Math.random() < 0.5,
  };
};
