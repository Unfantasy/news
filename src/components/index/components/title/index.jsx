/**
 * @name: 顶部滑动栏
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
    this.state = {
      length: 7,
      number: 22,
      itemActive: '1',
    };
  }
  componentDidMount() {
    // const { length, number } = this.state;
    // const width = (34 * number) + (40 * length);
    // console.log(document.getElementById('J_box_length').style);
    // document.getElementById('J_box_length').style.width = (width / 100) + 'rem';
  }
  render() {
    const { itemActive, stockList = [], switchStock } = this.props;
    // console.log('itemActive: ', itemActive);
    // const arr = ['', '', '', '', '', '', '', '', ''];
    const indexTitleItemNodes = stockList.map((stock) => {
      let classNameName = 'index-title-item';
      if (itemActive === stock.symbol) {
        classNameName = 'index-title-item index-title-item-active';
      }
      return <div className={classNameName} onClick={() => { switchStock(stock.symbol); }}>{stock.stock_name}</div>;
    });
    return (
      <div className="index-title">
        <div className="index-title-box" id="J_box_length">
          {/* <div className="index-title-item index-title-item-active">今日</div>
          <div className="index-title-item" onClick={this.showThis.bind(this, '2')}>美丽</div>
          <div className="index-title-item" onClick={this.showThis.bind(this, '2')>美丽生态</div>
          <div className="index-title-item" onClick={this.showThis.bind(this, '2')>美丽</div>
          <div className="index-title-item" onClick={this.showThis.bind(this, '2')>美丽生态</div>
          <div className="index-title-item" onClick={this.showThis.bind(this, '2')>美丽</div>
          <div className="index-title-item" onClick={this.showThis.bind(this, '2')>美丽生态</div> */}
          {indexTitleItemNodes}
          <div className="index-title-item" />
        </div>
        <div className="index-title-extra" />
      </div>
    );
  }
}
