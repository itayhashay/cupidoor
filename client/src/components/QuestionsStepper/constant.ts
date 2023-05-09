// export const QUESTIONS: string[] = [
//   "To what extent do you agree with the statement 'I smoke regularly'?",
//   "To what extent do you agree with the statement 'I consider my pet to be a member of my family'?",
//   "To what extent do you agree with the statement 'I am comfortable sharing an apartment with someone I don't know'?",
//   "To what extent do you agree with the statement 'I have a stable income and no money issues?'",
//   "Is the relationship between landlord and tenant important to you?",
// ];

export const QUESTIONS: string[] = [
  "Are you interested in smoking in your apartment?",
  "Are you interested in having pets in your apartment?",
  "Are you interested in sharing the apartment with roommates?",
  "To what extent do you agree with the statement 'I have a stable income and no money issues?'",
  "Is the relationship between landlord and tenant important to you?",
];


export const ANSWERS_MAP: Record<string, number> = {
  yes: 1,
  no: 0,
};

export type FormProps = {
  activeStep: number;
  setAnswer: Function;
  value: number;
};
