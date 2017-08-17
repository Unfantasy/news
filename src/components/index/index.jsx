/**
 * @name: 首页
 */

import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';
// import 'whatwg-fetch';
import { fetch } from '../utils';
import { NEWS_API } from '../../constants';
import './style.scss';

const TabPane = Tabs.TabPane;

export default class extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    console.log(NEWS_API);
    fetch.post(NEWS_API.list, { data: { aaa: '11' } }).then((data) => {
      console.log('data:', data);
    });
  }
  render() {
    return (
      <div className="index">
        <Tabs animated={false} swipeable={false}>
          <TabPane tab="First tab" key="1">123123</TabPane>
          <TabPane tab="second" key="2">123123</TabPane>
          <TabPane tab="third tab" key="3">123123</TabPane>
          <TabPane tab="four tab" key="4">123123</TabPane>
          <TabPane tab="five tab" key="5">123123</TabPane>
          <TabPane tab="six tab" key="6">123123</TabPane>
        </Tabs>
      </div>
    );
  }
}
