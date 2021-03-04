import { Progress } from 'antd';
import React from 'react';


const Score = () => (
    
        <>
          <Progress
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            percent={80}
          />
          <Progress
            strokeColor={{
              from: '#108ee9',
              to: '#87d068',
            }}
            percent={99.9}
            status="active"
          />
          <Progress
            type="circle"
            strokeColor={{
              '70%': 'orange',
            //   '70':'orange',
              '100%': 'red',
            }}
            percent={70}
            status="active"
            showInfo={true}
            strokeLinecap='square'
            strokeWidth={8}
            // trailColor='green'
          />
          <Progress
            type="circle"
            strokeColor={{
                '0%': 'orange',
                //   '70':'orange',
                  '100%': 'red',
            }}
            percent={100}
          />
        </>
      );

  
  export default Score;