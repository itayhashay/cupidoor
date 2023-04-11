export const QUESTIONS: string[] = [
    "Do you smoke?",
    "Do you own any pets?",
    "Do you mind to share apartment?",
    "Do you have stable income?",
    "Is the relationship between landlord and tenant important to you?",
]

export const ANSWERS_MAP: Record<string, number>  = {
    "yes": 1,
    "no": 0
}

export type FormProps = {
    activeStep: number;
    setAnswer: Function;
    value: number;
}
