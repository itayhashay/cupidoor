import { Question } from "./question";
import { User } from "./user";

export type QuestionAnswer = {
    questionId:string;
    value:number;
    priority:number;
}



export type ServerQuestionAnswer = {
    question: Question;
    user? : User|string;
    answer:number;
    priority:number;
}