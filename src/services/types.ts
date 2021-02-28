export enum Stage{
  start,
  during,
  end, 
}

export type Data = {
  category:string,
  type:string,
  difficulty:string,
  question:string,
  correct_answer:string,
  incorrect_answers:string[],
}

export type Question = Data & {
  answers:string[] 
}

export type QuizOptions = {
  amount:number,category:string,difficulty:string
}