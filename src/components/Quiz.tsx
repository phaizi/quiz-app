import React, { useEffect, useState } from 'react';
import { Question, Stage } from '../services/types';
import { select, lockAnswer, nextQuestion, stopTime, decode } from '../services/functions';
import { Button, Col, Grid, Progress, Row } from 'antd';
import Title from 'antd/lib/typography/Title';

const { useBreakpoint } = Grid;

const Quiz = (props: { data: Question[], setScore: (value: React.SetStateAction<number>) => void, qNumber: number, setNumber: (value: React.SetStateAction<number>) => void, totalQuestions: number, setStage: (value: React.SetStateAction<Stage>) => void, time: number, is5050: boolean[], selectionRemaining: number, setRemaining: (value: React.SetStateAction<number>) => void, set5050: (value: React.SetStateAction<boolean[]>) => void, }) => {

  const [time, setTime] = useState(props.time)
  const [timeId, setId] = useState<NodeJS.Timeout>()
  const screens = useBreakpoint();
  const [answerSelected, setSelected] = useState<number[]>([]);
  const [isLocked, setLock] = useState<boolean>(false);
  const correct_answer = props.data[props.qNumber].correct_answer;

  useEffect(() => {
    function timer(start: number,
      Id: NodeJS.Timeout
    ) {
      let d = Date.now() / 1000
      d = Math.round(props.time + start - d)
      setTime(d)
      if (d === 0) {
        stopTime(Id, setLock)
      }
    }
    const start = Date.now() / 1000
    const id = setInterval(() => { timer(start, id) }, 1000)
    setId(id)
  }, [props.qNumber, props.time,])

  return (
    <>
      <Row justify='center' style={{ margin: 'auto', minHeight: '330px', width: '95%', maxWidth: '700px', padding: 20, borderStyle: 'solid', borderColor: 'orange', borderWidth: 1, }} >
        {!screens.xs ||
          <Col span={24} style={{ marginBottom: 10 }}>
            <Progress
              type="circle"
              strokeColor={{
                '0%': 'orange',
                '100%': 'red',
              }}
              format={() => ((time) || 'timeout')}
              percent={100 - Math.round(time * 100 / props.time)}
              showInfo={true}
              strokeWidth={8}
              status="exception"
              width={100}
            />
          </Col>
        }
        <Col span={24} >
          <Row justify="space-between" style={{ height: '40%', margin: '0px 0px ' }}>
            <Col span={24} style={{ padding: 10, borderStyle: 'solid', borderColor: 'orange', borderWidth: 1, }}>
              <Title level={4}>{decode(props.data[props.qNumber].question)}</Title>
            </Col>
          </Row>
          <Row justify="space-between" style={{ height: '40%', margin: '10px 0px ' }}>
            <Col span={screens.xs ? 23 : 8}>
              {
                props.data[props.qNumber].answers.slice(0, 2).map((answer, id) => (
                  <Col span={24} style={{ marginBottom: 10 }}>
                    <Button disabled={props.is5050[id]} {...isLocked && { style: { backgroundColor: correct_answer === answer ? 'green' : answerSelected.includes(id) ? 'red' : '' } }} onClick={() => select(answerSelected, setSelected, props.selectionRemaining, props.setRemaining, id, isLocked)} type={answerSelected.includes(id) ? 'primary' : 'default'} block>{decode(answer)}</Button>
                  </Col>
                ))}
            </Col>
            {screens.xs ||
              <Col span={8}>
                <Progress
                  type="circle"
                  strokeColor={{
                    '0%': 'orange',
                    '100%': 'red',
                  }}
                  format={() => ((time) || 'timeout')}
                  percent={100 - Math.round(time * 100 / props.time)}
                  showInfo={true}
                  strokeWidth={8}
                  status="exception"
                  width={window.innerWidth < 700 ? 80 : 100}
                />
              </Col>
            }
            <Col span={screens.xs ? 23 : 8}>
              {
                props.data[props.qNumber].answers.slice(2, 4).map((answer, id) => (
                  <Col span={24} style={{ marginBottom: 10 }}
                  >
                    {/* <Title style={{ borderStyle: 'solid', borderColor: 'orange', borderWidth: 1, }} level={answer.length > 20 ? 5 : 4}>{answer}</Title> */}
                    <Button disabled={props.is5050[id + 2]}  {...isLocked && { style: { backgroundColor: correct_answer === answer ? 'green' : answerSelected.includes(id + 2) ? 'red' : '' } }} onClick={() => select(answerSelected, setSelected, props.selectionRemaining, props.setRemaining, id + 2, isLocked)} type={answerSelected.includes(id + 2,) ? 'primary' : 'default'} block>{decode(answer)}</Button>
                  </Col>
                ))
              }
            </Col>
          </Row>
          <Row justify="center" style={{ margin: '10px 0px ', minHeight: 80 }} >
            <Col span={18}>
              {isLocked ?
                <Button onClick={() => { nextQuestion(setLock, props.qNumber, props.setNumber, props.totalQuestions, setSelected, props.setRemaining, props.setStage, props.time, setTime, props.set5050,) }} type='primary' block>{props.qNumber + 1 === props.totalQuestions ? 'Finish' : 'Next Question'}</Button>
                :
                <Button onClick={() => { lockAnswer(props.setScore, setLock, correct_answer, props.data[props.qNumber].answers, answerSelected, timeId, stopTime) }} disabled={Boolean(props.selectionRemaining)} type='primary' block>Lock Answer</Button>}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Quiz;