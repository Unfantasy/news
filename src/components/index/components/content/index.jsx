/**
 * @name: 主内容
 */

import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import InfiniteScroller from 'react-infinite-scroller';
// import 'whatwg-fetch';
import { dateFormatter } from '../../../utils';
import './style.scss';

const Item = Flex.Item;

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
  componentWillReceiveProps(props) {
    const { dataArray = [] } = props;
    console.log('props', props);
    this.setState({ dataArray });
  }
  loadMore() {

  }
  render() {
    const { dataArray = [] } = this.state;
    const newsList = dataArray.map((data, index) => {
      if (index === 0) {
        return;
      }
      if (data.type.indexOf('news_') !== -1) {
        try {
          const picArr = typeof data.pic_url === 'string' ? JSON.parse(data.pic_url) : data.pic_url;
          if (picArr.length === 1) {
            return (
              <div className="news-type news-type-pic-1">
                <div className="pic-1-1">
                  <h2>{data.description}</h2>
                  <p><span>{data.name}&nbsp;&nbsp;</span>{dateFormatter(new Date(data.create_time), 'hh:mm')}</p>
                </div>
                <div className="pic-1-2">
                  <img src={picArr[0]} />
                </div>
              </div>
            );
          } else if (picArr.length === 3) {
            return (
              <div className="news-type news-type-pic-3">
                <h2>{data.description}</h2>
                <Flex>
                  <Item><img src={picArr[0]} /></Item>
                  <Item><img src={picArr[1]} /></Item>
                  <Item><img src={picArr[2]} /></Item>
                </Flex>
                <p><span>{data.name}&nbsp;&nbsp;</span>{dateFormatter(new Date(data.create_time), 'hh:mm')}</p>
              </div>
            );
          } else if (picArr.length === 0) {
            return (
              <div className="news-type news-type-pic-0">
                <h2>{data.description}</h2>
                <p><span>{data.name}&nbsp;&nbsp;</span>{dateFormatter(new Date(data.create_time), 'hh:mm')}</p>
              </div>
            );
          }
        } catch(e) { console.log(e) }
      } else if (data.type === 'memo') {
        const description = typeof data.description === 'string' ? JSON.parse(data.description) : data.description;
        const contentItem = description.map((d) => {
          <div classNme="stock">
            <div className="stock-name">{d.stock_name}&nbsp;&nbsp;{d.symbol}</div>
            <div className="stock-description">{d.desc}</div>
          </div>
        });
        return(
          <div className="news-type-memo">
            <div className="title">{data.name}</div>
            <div className="content">{contentItem}</div>
            <div className="footer">{data.name}&nbsp;&nbsp;{dateFormatter(new Date(data.create_time), 'hh:mm')}</div>
          </div>
        );
      }
    });
    let newsFirst = null
    if (dataArray[0]) {
      newsFirst = (
        <div className="news-first">
          <div className="title">
            <span className="title-name">{dataArray[0].name}</span>
            <span>刚刚</span>
          </div>
          <span className="news-first-line"></span>
          <div className="content">{dataArray[0].description}</div>
        </div>
      );
    }
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
        <InfiniteScroller
          loadMore={this.loadMore.bind(this)}
          loader={<div className="loader">Loading ...</div>}
        >
          <div>
            {newsFirst}
            <div className="index-content-news-list">
              {newsList}
            </div>
          </div>
        </InfiniteScroller>
      </div>
    );
  }
}
