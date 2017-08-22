/**
 * @name: 首页
 */

import React, { Component } from 'react';
import { Modal } from 'antd-mobile';
// import 'whatwg-fetch';
import Title from './components/title';
import Content from './components/content';
import { fetch } from '../utils';
import { NEWS_API } from '../../constants';
import './style.scss';

// const TabPane = Tabs.TabPane;
const alert = Modal.alert;

export default class extends Component {
  constructor() {
    super();
    this.state = {
      dataAray: [],
    };
  }
  componentDidMount() {
    console.log(NEWS_API);
    fetch.get(NEWS_API.list, { data: { auth_token: '918a258913fa4deeaf549bb571d34517857942061' } }).then((data) => {
      if (data.success === true) {
        // 成功
        this.setState({ dataArray: data.result });
      } else {
        alert('提示', '网络走神了');
      }
    });
  }
  render() {
    const { dataArray } = this.state;
    console.log('dataArray: ', dataArray);
    return (
      <div className="index">
        <Title />
        <Content dataArray={dataArray} />
        {/* <Tabs animated={false} swipeable={false}>
          <TabPane tab="First tab" key="1">123123</TabPane>
          <TabPane tab="1" key="2">123123</TabPane>
          <TabPane tab="third tab" key="3">123123</TabPane>
          <TabPane tab="four tab" key="4">123123</TabPane>
          <TabPane tab="five tab" key="5">123123</TabPane>
          <TabPane tab="six tab" key="6">123123</TabPane>
        </Tabs> */}
      </div>
    );
  }
}
