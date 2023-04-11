export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    jobTitle?: string;
    familiarity: string;
    isLandlord: boolean;
}