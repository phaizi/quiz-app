import React from 'react'
import { Data, Options, Question, Stage, } from '../services/types'

export const shuffleArray = (array: any[]) =>
    array.sort(() => Math.random() - 0.5)

export async function apiCall(options: Options): Promise<Question[]> {
    const response = await fetch(`https://opentdb.com/api.php?amount=${options.amount + 1}&category=${options.category < 9 ? 0 : options.category}&difficulty=${options.difficulty === 'any' ? 0 : options.difficulty}&type=multiple`)
    // <9 comparison is made bcoz in select component, category 8 corresponds to all categories while in api for that it has to be 0 and similar is the case for difficulty
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

export const lockAnswer = (
    setScore: (value: React.SetStateAction<number>) => void,
    setLock: (value: React.SetStateAction<boolean>) => void,
    answer: string, options: string[], selected: number[],
    timeId: NodeJS.Timeout | undefined, stopTimer: (timeId: NodeJS.Timeout | undefined, setLock: (value: React.SetStateAction<boolean>) => void,) => void,
) => {
    if (doesMatch(answer, options, selected)) {
        setScore((score) => score + 1);
    }
    stopTimer(timeId, setLock);
}

export const nextQuestion = (
    setLock: (value: React.SetStateAction<boolean>) => void,
    qNumber: number, setNumber: (value: React.SetStateAction<number>) => void,
    totalQuestions: number,
    setSelected: (value: React.SetStateAction<number[]>) => void,
    setRemaining: (value: React.SetStateAction<number>) => void,
    setStage: (value: React.SetStateAction<Stage>) => void,
    timeLimit: number,
    setTime: (value: React.SetStateAction<number>) => void,
    set5050: (value: React.SetStateAction<boolean[]>) => void,
) => {
    if (qNumber + 1 === totalQuestions) {
        setStage(Stage.end);
    } else {
        setNumber((qNumber) => qNumber + 1);
    }
    setSelected([]);
    setRemaining(1);
    setLock(false);
    setTime(timeLimit);
    set5050([false, false, false, false]);
} // this function has functionality of nextquestion as well as finish button

export const playAgain = (
    setNumber: (value: React.SetStateAction<number>) => void,
    setScore: (value: React.SetStateAction<number>) => void,
    setLifeline: (value: React.SetStateAction<boolean[]>) => void,
    stage: Stage,
    setStage: (value: React.SetStateAction<Stage>) => void,
) => {
    setNumber(0);
    setScore(0);
    setLifeline([true, true, true]);
    setStage(stage);
}

export const select = (
    selected: number[], setSelected: (value: React.SetStateAction<number[]>) => void,
    selectionRemaining: number, setRemaining: (value: React.SetStateAction<number>) => void,
    id: number,
    isLocked: boolean,
) => {
    if (!isLocked) {
        let newSelected = [...selected]
        if (selected.includes(id)) {
            const index = selected.indexOf(id);
            newSelected.splice(index, 1);
            setSelected(newSelected);
            setRemaining((state) => state + 1);
        } else {
            newSelected.push(id);
            setSelected(newSelected);
            if (selectionRemaining > 0) {
                setRemaining((state) => state - 1);
            } else {
                newSelected.shift();
                setSelected(newSelected);
            }
        }
    }
}

export const doesMatch = (answer: string, options: string[], selected: number[]) => {
    for (let index of selected) {
        if (answer === options[index]) {
            return true;
        }
    }
    return false;
}

export const acceptLifeline = (index: number, lifeline: boolean[], setLifeline: (value: React.SetStateAction<boolean[]>,) => void) => {
    const newLifeline = [...lifeline];
    newLifeline[index] = false;
    setLifeline(newLifeline);
}

export const fifty50 = (answer: string, options: string[], is5050: boolean[], set5050: (value: React.SetStateAction<boolean[]>) => void) => {
    let index1 = Math.floor(Math.random() * 10 / 2.5);
    let index2 = Math.floor(Math.random() * 10 / 2.5);
    while (options[index1] === answer) {
        index1 = Math.floor(Math.random() * 10 / 2.5)
    }
    while (options[index2] === answer || index2 === index1) {
        index2 = Math.floor(Math.random() * 10 / 2.5)
    }
    const temp = [...is5050];
    temp[index1] = true;
    temp[index2] = true;
    set5050(temp);
}

export const select2 = (setRemaining: (value: React.SetStateAction<number>) => void) => {
    setRemaining((state) => state + 1)
}

export const flip = (data: Question[], qNumber: number) => {
    data.splice(qNumber, 1);
}

export const stopTime = (timeid: NodeJS.Timeout | undefined, setLock: (value: React.SetStateAction<boolean>) => void,) => {
    if (typeof (timeid) !== 'undefined') {
        clearInterval(timeid);
        setLock(true);
    }
}

export const decode = (str: string) => (
    str.replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&")
        .replace(/&#039;/g, "'")
)