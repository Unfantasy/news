/**
 * @name: 主内容
 */

import React, { Component } from 'react';
// import { Tabs } from 'antd-mobile';
// import 'whatwg-fetch';
// import { fetch } from '../utils';
import './style.scss';

// const TabPane = Tabs.TabPane;

export default class extends Component {
  constructor() {
    super();
    this.state = {};
  }
  // componentDidMount() {
  //   console.log(NEWS_API);
  //   fetch.get(NEWS_API.list, { data: { aaa: '11' } }).then((data) => {
  //     console.log('data:', data);
  //   });
  // }
  render() {
    return (
      <div className="index-content">
        <div className="price-limit inline-block-2">
          <div>
            <span className="price">8.86</span>
            <span className="rate">+0.83 (+2.66%)</span>
            <span className="mark">证</span>
          </div>
          <div className="down">
            <span className="price">8.86</span>
            <span className="rate">+0.83 (+2.66%)</span>
            <span className="mark">证</span>
          </div>
        </div>
      </div>
    );
  }
}
