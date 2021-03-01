import { Data, Options, Question, } from '../services/types'

export const shuffleArray = (array: any[]) =>
    array.sort(() => Math.random() - 0.5)

export async function apiCall(options:Options) : Promise<Question[]>  {
    console.log(`https://opentdb.com/api.php?amount=${options.amount}&category=${options.category<9?0:options.category}&difficulty=${options.difficulty==='any'?0:options.difficulty}&type=multiple`)
    const response = await fetch(`https://opentdb.com/api.php?amount=${options.amount}&category=${options.category<9?0:options.category}&difficulty=${options.difficulty==='any'?0:options.difficulty}&type=multiple`)
    // <9 comparison is made bcoz in select component, category 8 corresponds to all categories while in api for that it has to be 0 and similar is the case for difficulty
    const { results } = await response.json()
    console.log('this is results',results)
     
    return (
        results.map((question: Data) => (
            {
                ...question,
                answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
            }
        ))
    )
}

export const remove = (answer: string, questions: string[]) => {
    let index1 = Math.floor(Math.random() * 10 / 2.5);
    let index2 = Math.floor(Math.random() * 10 / 2.5);
    while (questions[index1] === answer) {
        index1 = Math.floor(Math.random() * 10 / 2.5)
    }
    while (questions[index2] === answer || index2 === index1) {
        index2 = Math.floor(Math.random() * 10 / 2.5)
    }
    return [index1, index2]
}

export const doesMatch = (answers:string[],questions:string[])=>{
    for (let answer of answers){
        if (answer in questions) return true
    }
    return false 
}