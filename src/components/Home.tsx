import React from 'react';
import { Layout, InputNumber, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import { Select } from 'antd';
import { Row, Col } from 'antd';


const { Option } = Select;
// const items = ['Categories', 'Difficulty', 'No. of Questions']
// const options = [
//   ['Any Category', 'General Knowledge', 'Entertainment: Books', 'Entertainment: Film', 'Entertainment: Music', 'Entertainment: Musicals and Theatres', 'Entertainment: Television', 'Entertainment: Video Games', 'Entertainment: Board Games', 'Science and Nature', 'Science: Computers', 'Science: Mathematics', 'Mythology', 'Sports', 'Geography', 'History', 'Politics', 'Art', 'Celebrities', 'Animals', 'Vehicles', 'Entertainment: Comics', 'Science: Gadgets', 'Entertainment: Japanese Anime & Manga', 'Entertainment: Cartoons & Animations'],
//   ['easy', 'medium', 'hard'],
//   ['1', '2', '3']
// ]
const categories = ['Any Category', 'General Knowledge', 'Entertainment: Books', 'Entertainment: Film', 'Entertainment: Music', 'Entertainment: Musicals and Theatres', 'Entertainment: Television', 'Entertainment: Video Games', 'Entertainment: Board Games', 'Science and Nature', 'Science: Computers', 'Science: Mathematics', 'Mythology', 'Sports', 'Geography', 'History', 'Politics', 'Art', 'Celebrities', 'Animals', 'Vehicles', 'Entertainment: Comics', 'Science: Gadgets', 'Entertainment: Japanese Anime & Manga', 'Entertainment: Cartoons & Animations']
const difficulty = ['easy', 'medium', 'hard']
export default function Home() {
  const { Header, Content, Footer, } = Layout;
  return (
    <Layout style={{ height: '100vh' }}>
      <Header className="header">
        <Title type="warning" style={{ lineHeight: 'inherit' }}>The Quiz App</Title>
      </Header>
      <Content style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', }}>
        <Row justify='center' style={{ margin: 'auto', width: '95%', maxWidth: '700px', padding: 20, borderStyle: 'solid', borderColor: 'orange', borderWidth: 1, }}
        >
          <Col span={18} >

            <Row justify="space-between" style={{ margin: '10px 0px ' }}

            >
              <Col xs={{ span: 20 }} sm={{ span: 15 }} style={{ borderStyle: 'solid', borderColor: 'orange', borderWidth: 1, }} >
                <Title style={{ lineHeight: 'inherit', marginBottom: '0px', }} level={3}>Categories</Title>
              </Col>

              <Select style={{ padding: '0px', margin: '0px 0px' }} defaultValue={categories[0]} dropdownMatchSelectWidth={false} bordered={false} size='large'>
                {categories.map((option: string) => (
                  <Option value={option}>{option}</Option>
                ))}
              </Select>
            </Row>
            <Row justify="space-between" style={{ margin: '10px 0px ' }}
            >
              <Col xs={{ span: 20 }} sm={{ span: 15 }} style={{ borderStyle: 'solid', borderColor: 'orange', borderWidth: 1 }} >
                <Title style={{ lineHeight: 'inherit', marginBottom: '0px' }} level={3}>Difficulty</Title>
              </Col>
              <Select defaultValue={difficulty[0]} dropdownMatchSelectWidth={false} bordered={false} size='large'>
                {difficulty.map((option: string) => (
                  <Option value={option}>{option}</Option>
                ))}
              </Select>
            </Row>
            <Row justify="space-between" style={{ margin: '10px 0px ' }}
            >
              <Col xs={{ span: 20 }} sm={{ span: 15 }} style={{ borderStyle: 'solid', borderColor: 'orange', borderWidth: 1 }} >
                <Title style={{ lineHeight: 'inherit', marginBottom: '0px' }} level={3}>No. of Questions</Title>
              </Col>
              <InputNumber min={1} max={49} defaultValue={10} />
            </Row>
            <Row justify="space-between" style={{ margin: '10px 0px ' }}
            >
              <Col xs={{ span: 20 }} sm={{ span: 15 }} style={{ borderStyle: 'solid', borderColor: 'orange', borderWidth: 1 }} >
                <Title style={{ lineHeight: 'inherit', marginBottom: '0px' }} level={3}>Time limit</Title>
              </Col>

              <InputNumber formatter={value => `${value}sec`} parser={value => value?.replace('sec', '') + ''} min={1} max={600} defaultValue={15} />
            </Row>
            <Row justify="space-between" style={{ margin: '10px 0px ' }}
            >
              <Col span={24}>
                <Button type='primary' block>Let's Play!!!</Button>
              </Col>

            </Row>
          </Col>

        </Row>

      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}

