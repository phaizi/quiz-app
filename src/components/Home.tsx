import React from 'react';
import { Options, Stage } from '../services/types'
import { InputNumber, Button, } from 'antd';
import Title from 'antd/lib/typography/Title';
import { Select } from 'antd';
import { Row, Col } from 'antd';

const { Option } = Select;
const categories = ['Any Category', 'General Knowledge', 'Books', 'Film', 'Music', 'Musicals and Theatres', 'Television', 'Video Games', 'Board Games', 'Science and Nature', 'Science: Computers', 'Science: Mathematics', 'Mythology', 'Sports', 'Geography', 'History', 'Politics', 'Art', 'Celebrities', 'Animals', 'Vehicles', 'Comics', 'Science: Gadgets', 'Japanese Anime & Manga', 'Cartoons & Animations']
const difficulty = ['any', 'easy', 'medium', 'hard']
export default function Home(props: { setLoading: (value: React.SetStateAction<boolean>) => void, trg: React.SetStateAction<boolean>, setTrg: (value: React.SetStateAction<boolean>) => void, options: Options, setOptions: (value: React.SetStateAction<Options>) => void, setStage: (value: React.SetStateAction<Stage>) => void }) {

  return (
    <Row justify='center' style={{ margin: 'auto', minHeight: '330px', width: '95%', maxWidth: '700px', padding: 20, borderStyle: 'solid', borderColor: 'orange', borderWidth: 1, }}>
    <Col span={18} >
      <Row justify="space-between" style={{ margin: '10px 0px ' }}>
        <Col xs={{ span: 20 }} sm={{ span: 15 }} style={{ borderStyle: 'solid', borderColor: 'orange', borderWidth: 1, }} >
          <Title style={{ lineHeight: 'inherit', marginBottom: '0px', }} level={3}>Categories</Title>
        </Col>
        <Select style={{ padding: '0px', margin: '0px 0px' }} onChange={function (value, option) { props.setOptions({ ...props.options, category: value }) }} value={props.options.category} dropdownMatchSelectWidth={false} bordered={false} size='large'>
          {categories.map((option: string, index) => (
            <Option value={index + 8}>{option}</Option>
          ))}
        </Select>
      </Row>
      <Row justify="space-between" style={{ margin: '10px 0px ' }}>
        <Col xs={{ span: 20 }} sm={{ span: 15 }} style={{ borderStyle: 'solid', borderColor: 'orange', borderWidth: 1 }} >
          <Title style={{ lineHeight: 'inherit', marginBottom: '0px' }} level={3}>Difficulty</Title>
        </Col>
        <Select onChange={(value, option) => { props.setOptions({ ...props.options, difficulty: value }) }} value={props.options.difficulty} dropdownMatchSelectWidth={false} bordered={false} size='large'>
          {difficulty.map((option: string) => (
            <Option value={option}>{option}</Option>
          ))}
        </Select>
      </Row>
      <Row justify="space-between" style={{ margin: '10px 0px ' }}>
        <Col xs={{ span: 20 }} sm={{ span: 15 }} style={{ borderStyle: 'solid', borderColor: 'orange', borderWidth: 1 }} >
          <Title style={{ lineHeight: 'inherit', marginBottom: '0px' }} level={3}>No. of Questions</Title>
        </Col>
        <InputNumber min={1} max={49} onChange={(value) => { if (typeof value === 'number') { props.setOptions({ ...props.options, amount: value }) } }} value={props.options.amount} />
      </Row>
      <Row justify="space-between" style={{ margin: '10px 0px ' }}>
        <Col xs={{ span: 20 }} sm={{ span: 15 }} style={{ borderStyle: 'solid', borderColor: 'orange', borderWidth: 1 }} >
          <Title style={{ lineHeight: 'inherit', marginBottom: '0px' }} level={3}>Time limit</Title>
        </Col>
        <InputNumber onChange={(value) => { if (typeof value === 'number') { props.setOptions({ ...props.options, time: value }) } }} formatter={value => `${value}sec`} parser={value => value?.replace('sec', '') + ''} min={1} max={600} value={props.options.time} />
      </Row>
      <Row justify="space-between" style={{ margin: '10px 0px ' }}      >
        <Col span={24}>
          <Button onClick={(e) => { props.setLoading(true); props.setStage(Stage.during); }} type='primary' block>Let's Play!!!</Button>
        </Col>
      </Row>
    </Col>
</Row>
  );
}