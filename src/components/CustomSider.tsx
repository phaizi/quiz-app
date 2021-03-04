import React, { useState } from 'react';
import { Button, Card, Layout, Menu } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Meta from 'antd/lib/card/Meta';
import { Stage } from '../services/types';

const CustomSider = (props: { score:number, question_no:number, totalQuestions:number, stage:Stage, collapsed: React.SetStateAction<boolean>, setCollapsed: (value: React.SetStateAction<boolean>) => void }) => {

  const { Sider } = Layout;
  const [isBreakpoint, setBreakpoint] = useState<boolean>(false)
//condition of slider collapsing on home screen is not set yet (based on stage.start) 
  return (
    <Sider
    zeroWidthTriggerStyle={{backgroundColor:'orange',}}
      style={{
        // overflow: 'auto',
        height: '100%',
        position: isBreakpoint?'fixed':'static',
        left: 0,
        zIndex: 15,
      }}
      trigger={
        isBreakpoint&&props.stage===Stage.during? 
        <Button type="primary" danger block={true} style={{zIndex:300,}} onClick={(e) => { props.setCollapsed(!props.collapsed) }}>{props.collapsed?'>':'<'}</Button>
        :null
      }
      
      collapsed={!isBreakpoint&& props.stage===Stage.during?false: Boolean(props.collapsed)}
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
          description={`${props.question_no} of ${props.totalQuestions}Q`}
        />
      </Card>

      <h1 style={{ fontSize: 30, fontWeight: 20, color: 'orange', }}>Life Lines</h1>

      <Menu theme="dark"
        selectable={false}
        mode="horizontal"
      >

        <Menu.Item style={{ height: isBreakpoint?70:100, margin: '0px 5px 5px 5px', }} key="1" >
          <Avatar style={{ width: 200, height: isBreakpoint?70:100, }} icon={<img style={{ width: 200, height: isBreakpoint?70:100, }} src='/X2.png' alt='x2'/>} />
        </Menu.Item>
        <Menu.Item style={{ height: isBreakpoint?70:100, margin: '5px 5px', }} key="2" >
          <Avatar style={{ width: 200, height: isBreakpoint?70:100 }} icon={<img style={{ width: 200, height: isBreakpoint?70:100 }} src='/50-50.png' alt='50-50'/>} />
        </Menu.Item>
        <Menu.Item style={{ height: isBreakpoint?70:100, margin: '5px 5px', }} key="3" >
          <Avatar style={{ width: 200, height: isBreakpoint?70:100, }} icon={<img style={{ width: 200, height: isBreakpoint?70:100, }} src='/Flip.png' alt='flip'/>} />
        </Menu.Item>

      </Menu>
    </Sider>
  );

};

export default CustomSider;