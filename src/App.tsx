import React, { useEffect, useState } from 'react';
// import { Button } from 'antd';
import Home from './components/Home'
import Quiz from './components/Quiz'
import Score from './components/Score'
import {Stage, Question, Options} from './services/types'
import {apiCall} from './services/functions'
import './App.css';

const App = () => {
  const [stage, setStage] = useState(Stage.start)
  const [quizOptions, setOptions] = useState<Options>({amount:10,time:15,category:8,difficulty:'any'})
  const [quizData, setData] = useState<Question[]>([])

useEffect(()=>{
    if (stage === Stage.during){
      apiCall(quizOptions).then((data)=>{
        // console.log('this is resolve = ',data)
        setData(data)
        console.log('chala',quizData)
      })
    }

   // eslint-disable-next-line react-hooks/exhaustive-deps
},[stage])

return(
  <div className="App">
    {stage===Stage.start ? <Home options={quizOptions} setOptions={setOptions} setStage={setStage}/> :
    stage===Stage.during ? <Quiz/> : <Score/>}
  </div>
    )
  };

export default App;