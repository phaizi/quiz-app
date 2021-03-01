export enum Stage{
  start,
  during,
  end, 
}

export type Options = {
  amount:number,
  category:number,
  difficulty:string,
  time:number,
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
