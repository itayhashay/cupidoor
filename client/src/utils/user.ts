import { LINKS_NAMES } from "../types/user";
import LinkedInIcon from "../icons/links/linkedin.png";
import FacebookIcon from "../icons/links/facebook.png";
import InstagramIcon from "../icons/links/instagram.png";
import TwitterIcon from "../icons/links/twitter.png";
import TiktokIcon from "../icons/links/tiktok.png";

export type UserField = {
    fieldName: string;
    fieldValue: string;
}
export const USER_INFO_FIELDS: UserField[] = [
    {
        fieldName: "First Name",
        fieldValue: "firstName"
    },
    {
        fieldName: "Last Name",
        fieldValue: "lastName"
    },
    {
        fieldName: "Email",
        fieldValue: "email"
    },
    {
        fieldName: "Phone",
        fieldValue: "phone"
    },
    {
        fieldName: "Age",
        fieldValue: "age"
    }
];

export const LINK_TO_ICON = {
    [LINKS_NAMES.LINKEDIN]: LinkedInIcon,
    [LINKS_NAMES.FACEBOOK]: FacebookIcon,
    [LINKS_NAMES.TWITTER]: TwitterIcon,
    [LINKS_NAMES.INSTAGRAM]: InstagramIcon,
    [LINKS_NAMES.TIKTOK]: TiktokIcon,
}