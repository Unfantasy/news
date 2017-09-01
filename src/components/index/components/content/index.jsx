/**
 * @name: 主内容
 */

import React, { Component } from 'react';
import { Flex, Modal } from 'antd-mobile';
// import { browserHistory } from 'react-router';
import { dateFormatter } from '../../../../utils';
import { NEWS_PATH } from '../../../../constants';
import './style.scss';

const Item = Flex.Item;
const alert = Modal.alert;

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
  // componentWillReceiveProps(props) {
  //   const { dataArray = [] } = props;
  //   // console.log('props', props);
  //   this.setState({ dataArray });
  // }
  toNewDetail(url) {
    if (url) {
      sessionStorage.setItem('newsUrl', url);
      // browserHistory.push(NEWS_PATH.newsDetail);
      location.href = NEWS_PATH.newsDetail;
    } else {
      alert('提示', '请下载APP查看详情');
    }
  }
  render() {
    const { dataArray = [], stockPrice = {}, symbol } = this.props;
    // console.log('symbol: ', symbol);
    const newsList = dataArray.map((data, index) => {
      if (index === 0 && symbol === '1') {
        return null;
      }
      if (data.type.indexOf('news_') !== -1) {
        try {
          const picArr = data.pic_url ? (typeof data.pic_url === 'string' ? JSON.parse(data.pic_url) : data.pic_url) : [];
          // console.log('picArr: ', picArr);
          if (picArr.length === 1) {
            return (
              <div className="news-type news-type-pic-1" onClick={this.toNewDetail.bind(this, data.detail_url)}>
                <div className="pic-1-1">
                  <h2>{data.description}</h2>
                  <p><span>{data.name}&nbsp;&nbsp;</span>{dateFormatter(new Date(data.create_time), 'hh:mm')}</p>
                </div>
                <div className="pic-1-2">
                  <img src={picArr[0]} alt="img" />
                </div>
              </div>
            );
          } else if (picArr.length === 3) {
            return (
              <div className="news-type news-type-pic-3" onClick={this.toNewDetail.bind(this, data.detail_url)}>
                <h2>{data.description}</h2>
                <Flex>
                  <Item><img src={picArr[0]} alt="img" /></Item>
                  <Item><img src={picArr[1]} alt="img" /></Item>
                  <Item><img src={picArr[2]} alt="img" /></Item>
                </Flex>
                <p><span>{data.name}&nbsp;&nbsp;</span>{dateFormatter(new Date(data.create_time), 'hh:mm')}</p>
              </div>
            );
          } else if (picArr.length === 0) {
            return (
              <div className="news-type news-type-pic-0" onClick={this.toNewDetail.bind(this, data.detail_url)}>
                <h2>{data.description}</h2>
                <p><span>{data.name}&nbsp;&nbsp;</span>{dateFormatter(new Date(data.create_time), 'hh:mm')}</p>
              </div>
            );
          }
        } catch (e) { console.log(e); }
      } else if (data.type === 'memo') {
        const description = typeof data.description === 'string' ? JSON.parse(data.description) : data.description;
        const contentItem = description.map(d =>
          <div className="stock">
            <div className="stock-name">{d.stock_name}&nbsp;&nbsp;{d.symbol}</div>
            <div className="stock-description">{d.desc}</div>
          </div>
        );
        return (
          <div className="news-type-memo" onClick={this.toNewDetail.bind(this, data.detail_url)}>
            <div className="title">{data.name}</div>
            <div className="content">{contentItem}</div>
            <div className="footer">{data.name}&nbsp;&nbsp;{dateFormatter(new Date(data.create_time), 'hh:mm')}</div>
          </div>
        );
      }
      return null;
    });
    let newsFirst = null;
    if (dataArray[0] && symbol === '1') {
      newsFirst = (
        <div className="news-first">
          <div className="title">
            <span className="title-name">{dataArray[0].name}</span>
            <span>刚刚</span>
          </div>
          <span className="news-first-line" />
          <div className="content">{dataArray[0].description}</div>
        </div>
      );
    }
    return (
      <div className="index-content">
        <div className="price-limit inline-block-2">
          <div>
            <span className="price">{stockPrice.stockinfo ? stockPrice.stockinfo.price : '0.00'}</span>
            <span className="rate">{stockPrice.stockinfo ? stockPrice.stockinfo.change : '0.00'} ({stockPrice.stockinfo ? stockPrice.stockinfo.change_percent : '0.00'}%)</span>
            <span className="mark">证</span>
          </div>
          <div className="down">
            <span className="price">{stockPrice.indexinfo ? stockPrice.indexinfo.price : '0.00'}</span>
            <span className="rate">{stockPrice.indexinfo ? stockPrice.indexinfo.change : '0.00'} ({stockPrice.indexinfo ? stockPrice.indexinfo.change_percent : '0.00'})</span>
            <span className="mark">深</span>
          </div>
        </div>
        <div>
          {newsFirst}
          <div className="index-content-news-list">
            {newsList}
          </div>
        </div>
      </div>
    );
  }
}
