export enum LINKS_NAMES {
  FACEBOOK = "Facebook",
  INSTAGRAM = "Instagram",
  TWITTER = "Twitter",
  LINKEDIN = "LinkedIn",
  TIKTOK = "Tiktok"
}

export type UserLink = {
  name: LINKS_NAMES,
  value: string,
  link: string
}

export type UserTypes = "tenant" | "landlord" | "both";
export type User = {
  [key: string]: any,
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
  isFilledAllQ: boolean;
  role: UserTypes;
  linkes?: UserLink[];
};
