import BasicInfoIcon from "../../icons/profileSteps/file.png";
import QuestionsIcon from "../../icons/profileSteps/questions.png";
import CardIcon from "../../icons/profileSteps/card.png";
import SocialMediaIcon from "../../icons/profileSteps/social-media.png";
import { User } from "../../types/user";

export const USER_ROUTES = {
    PERSONAL_INFO: "personal-info",
    LIKED_APARTMENTS: "liked-apartments",
    MY_PROPERTIES: "my-properties",
    ALL_APARTMENTS: "all-apartments"
}

export const USER_ROUTES_DEFAULT_STATE = {
    [USER_ROUTES.PERSONAL_INFO]: false,
    [USER_ROUTES.LIKED_APARTMENTS]: false,
    [USER_ROUTES.MY_PROPERTIES]: false
}

export const ROUTES_DEFAULT_STATE = {
    [USER_ROUTES.ALL_APARTMENTS]: false,
    [USER_ROUTES.LIKED_APARTMENTS]: false,
    [USER_ROUTES.MY_PROPERTIES]: false
}

export enum PROFILE_STEPS_KEYS {
    USER_INFO = "User Information",
    LIFE_STYLE = "Life Style",
    USER_CARD = "User Card",
    SOCIAL_MEDIA = "Social Media"
}

export const PROFILE_STEPS = (user: User) => [
    {
        name: PROFILE_STEPS_KEYS.USER_INFO,
        description: "Make sure your user information are correct so people could contact you.",
        icon: BasicInfoIcon,
        validCheck: () => { return true; }
    },
    {
        name: PROFILE_STEPS_KEYS.LIFE_STYLE,
        description: "Answering lifestyle questions can find better matches for you.",
        icon: QuestionsIcon,
        validCheck: () => {
            return user.isFilledAllQ;
        }
    },
    {
        name: PROFILE_STEPS_KEYS.USER_CARD,
        description: "A profile picture, job title and a short description of yourself will complete the information about you to people.",
        icon: CardIcon,
        validCheck: () => {
            return true && user.jobTitle && user.familiarity ? true : false; // TODO: Change true to profile picture
        }
    },
    {
        name: PROFILE_STEPS_KEYS.SOCIAL_MEDIA,
        description: "Adding social media links gives people more information about you.",
        icon: SocialMediaIcon,
        validCheck: () => {
            return user.linkes && user.linkes.length > 0;
        }
    },
]