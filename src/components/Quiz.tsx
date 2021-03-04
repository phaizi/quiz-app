import React, { useEffect, useState } from 'react';
import { Question } from '../services/types';
import { Button, Col, Grid, Progress, Row } from 'antd';
import Title from 'antd/lib/typography/Title';

const stopTime = (timeid: NodeJS.Timeout | undefined) => {
  console.log('this is id = ', timeid);
  if (typeof (timeid) !== 'undefined') { clearInterval(timeid) }
}
// stopTime is created bcoz typescript was not taking timeId as Timeout
const { useBreakpoint } = Grid;

const Quiz = (props: { data: Question[], qNumber: number, setNumber: (value: React.SetStateAction<number>) => void, time: number }) => {

  const [time, setTime] = useState(props.time)
  const [timeId, setId] = useState<NodeJS.Timeout>()
  const screens = useBreakpoint();
  console.log('this is breakpoint = ', screens)
  
  useEffect(() => {
    function timer(start: number,
      // timeId:NodeJS.Timeout[]|undefined
      Id: NodeJS.Timeout
    ) {
      let d = Date.now() / 1000
      d = Math.round(props.time + start - d)
      console.log('this is time = ', d)
      setTime(d)
      // if(d === 0 && timeId){
      //   stopTime(timeId[0])}
      if (d === 0) {
        stopTime(Id)
      }
    }
    const start = Date.now() / 1000
    // setId([setInterval(()=>{timer(start,timeId)}, 1000)]);
    const id = setInterval(() => { timer(start, id) }, 1000)
    setId(id)
  }, [props.qNumber, props.time,])
  return (
    <>

      {!screens.xs ||
        <Col span={24} style={{ marginBottom: 10 }}>

          <Progress
            type="circle"
            strokeColor={{
              '0%': 'orange',
              '100%': 'red',
            }}
            format={(percent) => Math.round(props.time * (100 - (percent || 0)) / 100) || 'timeout'}
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
            <Title level={4}>{props.data[props.qNumber].question}</Title>
          </Col>
        </Row>
        <Row justify="space-between" style={{ height: '40%', margin: '10px 0px ' }}>
          <Col span={screens.xs ? 23 : 8}>
            {
              props.data[props.qNumber].answers.slice(0, 2).map((answer, index) => (
                <Col span={24}
                >
                  <Title style={{ borderStyle: 'solid', borderColor: 'orange', borderWidth: 1, }} level={answer.length > 20 ? 5 : 4}>{answer}</Title>
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
                format={(percent) => Math.round(props.time * (100 - (percent || 0)) / 100) || 'timeout'}
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
              props.data[props.qNumber].answers.slice(2, 4).map((answer, index) => (
                <Col span={24}
                >
                  <Title style={{ borderStyle: 'solid', borderColor: 'orange', borderWidth: 1, }} level={answer.length > 20 ? 5 : 4}>{answer}</Title>
                </Col>
              ))
            }
          </Col>
        </Row>
        <Row justify="center" style={{ margin: '10px 0px ', minHeight: 80 }} >
          <Col span={18}><Button onClick={() => { stopTime(timeId) }} type='primary' block>Lock Answer</Button>
          </Col>
        </Row>

      </Col>
    </>
  );
};

export default Quiz;