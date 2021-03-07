import React, { useEffect, useState } from 'react';
// import { Button } from 'antd';
import Home from './components/Home'
import Quiz from './components/Quiz'
import Score from './components/Score'
import CustomSider from './components/CustomSider'
import { Stage, Question, Options } from './services/types'
import { apiCall } from './services/functions'
import { Layout, Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import { Row } from 'antd';
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
  // const [is2Selection, set2Selection] = useState<boolean>(false);

  useEffect(() => {
    if (stage === Stage.during) {
      apiCall(quizOptions).then((data) => {
        // console.log('this is resolve = ',data)
        setData(data);
        setLoading(false);
        console.log('chala', quizData)
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage])

  return (
    <div className="App">
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header">
          <Title type="warning" style={{ lineHeight: 'inherit' }}>The Quiz App</Title>
        </Header>
        <Layout>
          <CustomSider isLifeline={isLifeline} setLifeline={setLifeline} set5050={set5050} is5050={is5050} setRemaining={setRemaining} answer={quizData[qNumber]?.correct_answer} options={quizData[qNumber]?.answers} stage={stage} score={score} question_no={qNumber} totalQuestions={quizOptions.amount} setCollapsed={setSider} collapsed={sider}
          />
          <Content style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', }} >

            <Row justify='center' style={{ margin: 'auto', minHeight: '330px', width: '95%', maxWidth: '700px', padding: 20, borderStyle: 'solid', borderColor: 'orange', borderWidth: 1, }}
            >

              {isLoading ?
                <Spin style={{ fontSize: 25, }} tip='Loading...' size="large" />
                : stage === Stage.start ?
                  <Home setLoading={setLoading} trg={sider} setTrg={setSider} options={quizOptions} setOptions={setOptions} setStage={setStage} />
                  : stage === Stage.during ?
                    <Quiz score={score} setScore={setScore} data={quizData} totalQuestions={quizOptions.amount} qNumber={qNumber} setNumber={setNumber} setStage={setStage} time={quizOptions.time} selectionRemaining={selectionRemaining} setRemaining={setRemaining} is5050={is5050} set5050={set5050} /> : <Score />}
            </Row>


            <Footer style={{ textAlign: 'center' }}>Quiz App ©2021 Created by Faizan Mansur</Footer>
          </Content>
        </Layout>
      </Layout>

    </div>
  )
};

export default App;