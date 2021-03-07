import React, { useState } from 'react';
import { Button, Card, Layout, Menu, Modal } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Meta from 'antd/lib/card/Meta';
import { Question, Stage } from '../services/types';
import { acceptLifeline, fifty50, flip, select2 } from '../services/functions';



const CustomSider = (props: { data: Question[], isLifeline: boolean[], setLifeline: (value: React.SetStateAction<boolean[]>) => void, is5050: boolean[], set5050: (value: React.SetStateAction<boolean[]>) => void, setRemaining: (value: React.SetStateAction<number>) => void, answer: string, options: string[], score: number, question_no: number, totalQuestions: number, stage: Stage, collapsed: React.SetStateAction<boolean>, setCollapsed: (value: React.SetStateAction<boolean>) => void }) => {

  const { Sider } = Layout;
  const [isBreakpoint, setBreakpoint] = useState<boolean>(false)
  //condition of slider collapsing on home screen is not set yet (based on stage.start) 
  return (
    <Sider
      zeroWidthTriggerStyle={{ backgroundColor: 'orange', }}
      style={{
        // overflow: 'auto',
        height: '100%',
        position: isBreakpoint ? 'fixed' : 'static',
        left: 0,
        zIndex: 15,
      }}
      trigger={
        isBreakpoint && props.stage === Stage.during ?
          <Button type="primary" danger block={true} style={{ zIndex: 300, }} onClick={(e) => { props.setCollapsed(!props.collapsed) }}>{props.collapsed ? '>' : '<'}</Button>
          : null
      }

      collapsed={!isBreakpoint && props.stage === Stage.during ? false : Boolean(props.collapsed)}
      collapsible={true}
      width={250}
      // defaultCollapsed={true}
      breakpoint="sm"
      collapsedWidth="0"
      onBreakpoint={broken => {
        setBreakpoint(broken)
      }}
    // onCollapse={(collapsed, type) => {
    //   console.log(collapsed, type);
    // }}
    >
      <div className="logo" />
      <Card style={{ margin: '16px 0px', backgroundColor: 'orange' }} >
        <h1 style={{ fontSize: 30, fontWeight: 100, color: 'black' }}>Score: {props.score}</h1>
        <Meta
          style={{ fontSize: 20, }}
          description={`${props.question_no + 1} of ${props.totalQuestions}Q`}
        />
      </Card>

      <h1 style={{ fontSize: 30, fontWeight: 20, color: 'orange', }}>Life Lines</h1>

      <Menu theme="dark"
        selectable={false}
        mode="horizontal"
      // mode="inline"
      >

        <Menu.Item onClick={() => {
          Modal.confirm({
            title: 'Select Any Two Answers',
            content: 'Are you sure you want to use this lifeline?',
            okText: 'Yes',
            onOk: () => {
              acceptLifeline(0, props.isLifeline, props.setLifeline);
              select2(props.setRemaining);
            },
            cancelText: 'No',
          });
        }
        } style={{ height: isBreakpoint ? 70 : 100, margin: '0px 5px 5px 5px', }} disabled={props.isLifeline[0] ? false : true} key="1" >
          <Avatar style={{ width: 200, height: isBreakpoint ? 70 : 100, }} icon={<img style={{ width: 200, height: isBreakpoint ? 70 : 100, }} src={props.isLifeline[0] ? '/X2.png' : '/Used.png'} alt='x2' />} />
        </Menu.Item>
        <Menu.Item onClick={() => {
          Modal.confirm({
            title: '50:50',
            content: 'Are you sure you want to remove any 2 answers?',
            okText: 'Yes',
            onOk: () => {
              acceptLifeline(1, props.isLifeline, props.setLifeline);
              fifty50(props.answer, props.options, props.is5050, props.set5050)
            },
            cancelText: 'No',
          });
        }
        } style={{ height: isBreakpoint ? 70 : 100, margin: '5px 5px', }} disabled={props.isLifeline[1] ? false : true} key="2" >
          <Avatar style={{ width: 200, height: isBreakpoint ? 70 : 100 }} icon={<img style={{ width: 200, height: isBreakpoint ? 70 : 100 }} src={props.isLifeline[1] ? '/50-50.png' : '/Used.png'} alt='50-50' />} />
        </Menu.Item>
        <Menu.Item onClick={() => {
          Modal.confirm({
            title: 'Flip This Question',
            content: 'Are you sure you want to use this lifeline?',
            okText: 'Yes',
            onOk: () => {
              acceptLifeline(2, props.isLifeline, props.setLifeline);
              flip(props.data, props.question_no);
            },
            cancelText: 'No',
          });
        }
        } style={{ height: isBreakpoint ? 70 : 100, margin: '5px 5px', }} disabled={props.isLifeline[2] ? false : true} key="3" >
          <Avatar style={{ width: 200, height: isBreakpoint ? 70 : 100, }} icon={<img style={{ width: 200, height: isBreakpoint ? 70 : 100, }} src={props.isLifeline[2] ? '/Flip.png' : '/Used.png'} alt='flip' />} />
        </Menu.Item>

      </Menu>
    </Sider>
  );

};

export default CustomSider;