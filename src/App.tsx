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
  const [qNumber,setNumber] = useState(1)
  const [sider, setSider] = useState<boolean>(true)
  const { Header, Content, Footer } = Layout;
  const [isLoading,setLoading]=useState<boolean>(false)

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
          <CustomSider stage={stage} score={0} question_no={qNumber} totalQuestions={quizOptions.amount} setCollapsed={setSider} collapsed={sider}
          />
          <Content style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', }} >

            <Row justify='center' style={{ margin: 'auto', minHeight:'330px', width: '95%', maxWidth: '700px', padding: 20, borderStyle: 'solid', borderColor: 'orange', borderWidth: 1, }}
            >

              {isLoading? <Spin style={{fontSize:25,}}tip='Loading...' size="large" /> : stage === Stage.start ? <Home setLoading={setLoading}trg={sider} setTrg={setSider} options={quizOptions} setOptions={setOptions} setStage={setStage} /> :
                stage === Stage.during ? <Quiz data={quizData} qNumber={qNumber} setNumber={setNumber} time={quizOptions.time}/> : <Score />}
            </Row>


            <Footer style={{ textAlign: 'center' }}>Quiz App ©2021 Created by Faizan Mansur</Footer>
          </Content>
        </Layout>
      </Layout>

    </div>
  )
};

export default App;