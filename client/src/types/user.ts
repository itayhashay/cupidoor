export type UserTypes = "tenant" | "landlord" | "both";
export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  age: string;
  dateOfBirth?: Date;
  jobTitle?: string;
  familiarity?: string;
  isLandlord?: boolean;
  role: UserTypes;
};
