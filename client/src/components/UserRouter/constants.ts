import BasicInfoIcon from "../../icons/profileSteps/file.png";
import QuestionsIcon from "../../icons/profileSteps/questions.png";
import JobTitleIcon from "../../icons/profileSteps/jobTitle.png";
import SocialMediaIcon from "../../icons/profileSteps/social-media.png";
import { User } from "../../types/user";

export const USER_ROUTES = {
    PERSONAL_INFO: "personal-info",
    LIKED_APARTMENTS: "liked-apartments",
    MY_PROPERTIES: "my-properties"
}

export const USER_ROUTES_DEFAULT_STATE = {
    [USER_ROUTES.PERSONAL_INFO]: false,
    [USER_ROUTES.LIKED_APARTMENTS]: false,
    [USER_ROUTES.MY_PROPERTIES]: false
}

export enum PROFILE_STEPS_KEYS {
    USER_INFO = "User Information",
    LIFE_STYLE = "Life Style",
    JOB_TITLE = "Job Title",
    SOCIAL_MEDIA = "Social Media"
}

export const PROFILE_STEPS = (user: User) => [
    {
        name: PROFILE_STEPS_KEYS.USER_INFO,
        icon: BasicInfoIcon,
        validCheck: () => { return true; }
    },
    {
        name: PROFILE_STEPS_KEYS.LIFE_STYLE,
        icon: QuestionsIcon,
        validCheck: () => {
            return user.isFilledAllQ;
        }
    },
    {
        name: PROFILE_STEPS_KEYS.JOB_TITLE,
        icon: JobTitleIcon,
        validCheck: () => {
            return user.jobTitle ? true : false;
        }
    },
    {
        name: PROFILE_STEPS_KEYS.SOCIAL_MEDIA,
        icon: SocialMediaIcon,
        validCheck: () => {
            return user.linkes && user.linkes.length > 0;
        }
    },
]