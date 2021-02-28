import React, { useEffect, useState } from 'react';
// import { Button } from 'antd';
import Home from './components/Home'
import Quiz from './components/Quiz'
import Score from './components/Score'
import {Stage,Data, Question} from './services/types'
import {apiCall} from './services/functions'
import './App.css';

const App = () => {
  const [stage, setStage] = useState(Stage.start)
  const [quizOptions, setOptions] = useState({amount:10,category:'',difficulty:''})
  const [quizDate, setData] = useState<Question[]>([])

useEffect(()=>{
    if (stage === Stage.during){
      apiCall(quizOptions).then((data)=>{
        // console.log(result)
        setData(data)
      })
    }

   // eslint-disable-next-line react-hooks/exhaustive-deps
},[stage])

return(
  <div className="App">
    {stage===Stage.start ? <Home/> :
    stage===Stage.during ? <Quiz/> : <Score/>}
  </div>
    )
  };

export default App;