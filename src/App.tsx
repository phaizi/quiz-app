import React, { useEffect, useState } from 'react';
// import { Button } from 'antd';
import Home from './components/Home'
import Quiz from './components/Quiz'
import Score from './components/Score'
import CustomSider from './components/CustomSider'
import { Stage, Question, Options } from './services/types'
import { apiCall } from './services/functions'
import { Layout } from 'antd';
import Title from 'antd/lib/typography/Title';
import { Row } from 'antd';
import './App.css';

const App = () => {
  const [stage, setStage] = useState(Stage.start)
  const [quizOptions, setOptions] = useState<Options>({ amount: 10, time: 15, category: 8, difficulty: 'any' })
  const [quizData, setData] = useState<Question[]>([])
  const { Header, Content, Footer } = Layout;
  const [sider, setSider] = useState<boolean>(true)

  useEffect(() => {
    if (stage === Stage.during) {
      apiCall(quizOptions).then((data) => {
        // console.log('this is resolve = ',data)
        setData(data)
        console.log('chala', quizData)
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage])

  return (
    <div className="App">
      <Layout style={{ height: '100vh' }}>
        <Header className="header">
          <Title type="warning" style={{ lineHeight: 'inherit' }}>The Quiz App</Title>
        </Header>
        <Layout>
          <CustomSider score={0} question_no={0} totalQuestions={quizOptions.amount} setCollapsed={setSider} collapsed={sider}
          />
          <Content style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', }} >

            <Row justify='center' style={{ margin: 'auto', width: '95%', maxWidth: '700px', padding: 20, borderStyle: 'solid', borderColor: 'orange', borderWidth: 1, }}
            >

              {stage === Stage.start ? <Home trg={sider} setTrg={setSider} options={quizOptions} setOptions={setOptions} setStage={setStage} /> :
                stage === Stage.during ? <Quiz /> : <Score />}
            </Row>


            <Footer style={{ textAlign: 'center' }}>Quiz App ©2021 Created by Faizan Mansur</Footer>
          </Content>
        </Layout>
      </Layout>

    </div>
  )
};

export default App;