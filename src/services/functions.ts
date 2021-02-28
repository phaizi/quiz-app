import { Data, QuizOptions, Question } from '../services/types'

export const shuffleArray = (array: any[]) =>
    array.sort(() => Math.random() - 0.5)

export async function apiCall(options:QuizOptions) : Promise<Question[]>  {
    const response = await fetch(`https://opentdb.com/api.php?amount=${options.amount}&category=${options.category}&difficulty=${options.difficulty}&type=multiple`)
    const { results } = await response.json()
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