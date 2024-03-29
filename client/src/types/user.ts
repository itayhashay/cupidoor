export enum LINKS_NAMES {
  FACEBOOK = 'Facebook',
  INSTAGRAM = 'Instagram',
  TWITTER = 'Twitter',
  LINKEDIN = 'LinkedIn',
  TIKTOK = 'Tiktok',
}

export type UserLink = {
  name: LINKS_NAMES;
  value: string;
  link: string;
};

export type UserTypes = 'tenant' | 'landlord' | 'both';
export type User = {
  [key: string]: any;
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  description?: string;
  password: string;
  avatar?: string;
  phone: string;
  age: string;
  dateOfBirth?: Date;
  jobTitle?: string;
  familiarity?: string;
  isLandlord?: boolean;
  answeredQuestions?: boolean;
  role: UserTypes;
  linkes?: UserLink[];
};
