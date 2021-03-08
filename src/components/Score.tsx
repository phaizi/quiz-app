import { Button, Col, Progress, Row, Typography } from 'antd';
import React from 'react';
import { playAgain } from '../services/functions';
import { Stage } from '../services/types';

const { Title } = Typography;
const Score = (props: { score: number, setScore: (value: React.SetStateAction<number>) => void, qNumber: number, setNumber: (value: React.SetStateAction<number>) => void, totalQuestions: number, setLifeline: (value: React.SetStateAction<boolean[]>) => void, setStage: (value: React.SetStateAction<Stage>) => void, }) => (

  <> 
  <Row justify='center' style={{ margin: 'auto', minHeight: '330px', width: '95%', maxWidth: '700px', padding: 20, borderStyle: 'solid', borderColor: 'orange', borderWidth: 1, }}>
    <Col span={18} >
      <Row justify="center" style={{ margin: '10px 0px ' }} >
        <Title>Score: {props.score} out of {props.totalQuestions} questions</Title>
      </Row>
      <Row justify="center" style={{ margin: '10px 0px ' }} >
        <Progress
          type="circle"
          strokeColor='green'
          percent={Math.round(props.score * 100 / props.totalQuestions)}
        />
      </Row>
      <Row justify="space-between" style={{ margin: '10px 0px ' }} >
        <Button onClick={() => { playAgain(props.setNumber, props.setScore, props.setLifeline, Stage.during, props.setStage) }} style={{ marginBottom: 10 }} type='primary' block>Play Again!!!</Button>
        <Button onClick={() => { playAgain(props.setNumber, props.setScore, props.setLifeline, Stage.start, props.setStage) }} style={{ marginBottom: 10 }} type='primary' block>Settings</Button>
      </Row>
    </Col>
    </Row>
  </>
);

export default Score;