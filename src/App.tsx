import React, { useEffect, useState } from 'react';
import Home from './components/Home'
import Quiz from './components/Quiz'
import Score from './components/Score'
import CustomSider from './components/CustomSider'
import { Stage, Question, Options } from './services/types'
import { apiCall } from './services/functions'
import { Layout, Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import './App.css';

const App = () => {
  const [stage, setStage] = useState(Stage.start)
  const [quizOptions, setOptions] = useState<Options>({ amount: 10, time: 15, category: 8, difficulty: 'any' })
  const [quizData, setData] = useState<Question[]>([])
  const [qNumber, setNumber] = useState(0) //question  number v r on currently
  const [score, setScore] = useState(0)
  const [sider, setSider] = useState<boolean>(true)
  const { Header, Content, Footer } = Layout;
  const [isLoading, setLoading] = useState<boolean>(false)
  const [selectionRemaining, setRemaining] = useState<number>(1);
  const [isLifeline, setLifeline] = useState<boolean[]>([true, true, true])// whether lifelines r availabe
  const [is5050, set5050] = useState<boolean[]>([false, false, false, false]) //for making answer buttons disable
  const [isHeight618, set618] = useState<boolean>(window.innerHeight < 618);
  const [isHeight510, set510] = useState<boolean>(window.innerHeight < 510);


  useEffect(() => {
    if (stage === Stage.during) {
      apiCall(quizOptions).then((data) => {
        setData(data);
        setLoading(false);
        console.log('chala', quizData)
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage])

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerHeight < 618) {
        set618(true);
        if (window.innerHeight < 510) {
          set510(true);
        } else { set510(false) }
      } else { set618(false); set510(false) }
    })
  }, [])
  return (
    <div className="App">
      <Layout style={{ height: isHeight618 ? '100%' : '100vh', }}>
        {isHeight510 ? null :
          <Header className="header">
            <Title type="warning" style={{ lineHeight: 'inherit' }}>The Quiz App</Title>
          </Header>
        }
        <Layout>
          <CustomSider data={quizData} isLifeline={isLifeline} setLifeline={setLifeline} set5050={set5050} is5050={is5050} setRemaining={setRemaining} answer={quizData[qNumber]?.correct_answer} options={quizData[qNumber]?.answers} stage={stage} score={score} question_no={qNumber} totalQuestions={quizOptions.amount} setCollapsed={setSider} collapsed={sider}
          />
          <Content style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', }} >

            {isLoading ?
              <Spin style={{ fontSize: 25, }} tip='Loading...' size="large" />
              : stage === Stage.start ?
                <Home setLoading={setLoading} trg={sider} setTrg={setSider} options={quizOptions} setOptions={setOptions} setStage={setStage} />
                : stage === Stage.during ?
                  <Quiz setScore={setScore} data={quizData} totalQuestions={quizOptions.amount} qNumber={qNumber} setNumber={setNumber} setStage={setStage} time={quizOptions.time} selectionRemaining={selectionRemaining} setRemaining={setRemaining} is5050={is5050} set5050={set5050} />
                  : <Score score={score} setScore={setScore} totalQuestions={quizOptions.amount} qNumber={qNumber} setNumber={setNumber} setLifeline={setLifeline} setStage={setStage} />}
          </Content>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>Quiz App ©2021 Created by Faizan Mansur</Footer>
      </Layout>
    </div>
  )
};

export default App;