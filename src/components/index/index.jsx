/**
 * @name: 首页
 */

import React, { Component } from 'react';
import { Modal } from 'antd-mobile';
import { browserHistory } from 'react-router';
import InfiniteScroller from 'react-infinite-scroller';
import Title from './components/title';
import Content from './components/content';
import Loading from '../common/loading';
import { fetch, getUrlParams } from '../../utils';
import { NEWS_API, NEWS_PATH } from '../../constants';
import './style.scss';

// const TabPane = Tabs.TabPane;
const alert = Modal.alert;

export default class extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      hasMore: false,
      isFinish: false,
      showInfiniteScroll: true,
      symbol: '1',
      dataAray: [],
    };
    this.dataNumber = null;
    this.itemActive = '1';
    this.fetchCount = 0;
    this.maxFetchCount = 3;
    document.title = '今日自选';
  }
  componentDidMount() {
    const symbol = getUrlParams().symbol || '1';
    this.initData(symbol);
  }

  // 初始化数据
  initData(symbol) {
    const checkComplete = () => {
      // console.log('this.fetchCount: ', this.fetchCount, 'this.maxFetchCount: ', this.maxFetchCount);
      if (this.fetchCount === this.maxFetchCount) {
        this.itemActive = symbol;
        this.setState({ dataArray: this.dataArray, stockPrice: this.stockPrice, stockList: this.stockList, symbol, loading: false, hasMore: true });
      }
    };
    fetch.get(NEWS_API.getList(symbol), { data: { auth_token: '918a258913fa4deeaf549bb571d34517857942061' } }).then((data) => {
      this.fetchCount += 1;
      if (data.success === true) {
        // 成功
        // console.log('data: ', data);
        const { result } = data;
        if (result && typeof result === 'object' && result.length > 0) {
          this.pageNumber = result[result.length - 1].sort_num;
        }
        this.dataArray = data.result;
        // console.log('dataArray: ', this.state.dataArray);
      } else {
        alert('提示', '网络走神了');
      }
      checkComplete();
    });
    fetch.get(NEWS_API.getLatestPrice, { data: { auth_token: '918a258913fa4deeaf549bb571d34517857942061', symbol } }).then((data) => {
      this.fetchCount += 1;
      if (data.success) {
        // 成功
        // console.log('data: ', data);
        this.stockPrice = data.result;
      } else {
        alert('提示', '网络走神了');
      }
      checkComplete();
    });
    fetch.get(NEWS_API.getStockList, { data: { auth_token: '918a258913fa4deeaf549bb571d34517857942061' } }).then((data) => {
      this.fetchCount += 1;
      if (data.success) {
        // 成功
        this.stockList = data.result;
        this.stockList.unshift({ stock_name: '今日', symbol: '1' });
        console.log('this.stockList: ', this.stockList);
      } else {
        alert('提示', '网络走神了');
      }
      checkComplete();
    });
  }

  // 切换title之后加载数据
  loadData(symbol) {
    const checkComplete = () => {
      // console.log('this.fetchCount: ', this.fetchCount, 'this.maxFetchCount: ', this.maxFetchCount);
      if (this.fetchCount === this.maxFetchCount) {
        this.itemActive = symbol;
        this.setState({ dataArray: this.dataArray, stockPrice: this.stockPrice, symbol, loading: false, hasMore: true });
      }
    };
    fetch.get(NEWS_API.getList(symbol), { data: { auth_token: '918a258913fa4deeaf549bb571d34517857942061' } }).then((data) => {
      this.fetchCount += 1;
      if (data.success === true) {
        // 成功
        // console.log('data: ', data);
        const { result } = data;
        if (result && typeof result === 'object' && result.length > 0) {
          this.pageNumber = result[result.length - 1].sort_num;
        }
        this.dataArray = data.result;
        // console.log('dataArray: ', this.state.dataArray);
      } else {
        alert('提示', '网络走神了');
      }
      checkComplete();
    });
    fetch.get(NEWS_API.getLatestPrice, { data: { auth_token: '918a258913fa4deeaf549bb571d34517857942061', symbol } }).then((data) => {
      this.fetchCount += 1;
      if (data.success) {
        // 成功
        // console.log('data: ', data);
        this.stockPrice = data.result;
      } else {
        alert('提示', '网络走神了');
      }
      checkComplete();
    });
  }
  loadMore(symbol) {
    // if (!this.loadingMoreLock) {
    this.loadingMoreLock = true;
    fetch.get(NEWS_API.getList(symbol), { data: { auth_token: '918a258913fa4deeaf549bb571d34517857942061', sort_num: this.pageNumber } }).then((data) => {
      if (data.success === true) {
        // 成功
        const { result } = data;
        if (result && typeof result === 'object' && result.length > 0) {
          this.pageNumber = result[result.length - 1].sort_num;
        }
        let hasMore = true;
        if (result.length === 0) hasMore = false;
        const { dataArray } = this.state;
        const newDataArray = dataArray.concat(result);
        // console.log('newDataArray: ', newDataArray);
        this.setState({ dataArray: newDataArray, hasMore, isFinish: !hasMore }, () => {
          // setTimeout(() => {
          //   this.loadingMoreLock = false;
          // }, 100);
        });
      } else {
        alert('提示', '网络走神了');
      }
    });
    // }
  }
  switchStock(param) {
    // console.log('param: ', param);
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.dataNumber = null;
    this.itemActive = param;
    this.fetchCount = 0;
    this.maxFetchCount = 2;
    this.setState({
      hasMore: false,
      isFinish: false,
      showInfiniteScroll: true,
    });
    this.loadData(param);
    browserHistory.push(NEWS_PATH.index + '?symbol=' + param);
  }
  render() {
    const { dataArray, stockPrice, stockList, hasMore, symbol, loading, showInfiniteScroll, isFinish } = this.state;
    // console.log('itemActive: ', this.itemActive);
    return (
      <Loading loading={loading} className="index">
        <Title itemActive={this.itemActive} stockList={stockList} switchStock={this.switchStock.bind(this)} />
        {showInfiniteScroll && <InfiniteScroller
          hasMore={hasMore}
          loadMore={this.loadMore.bind(this, this.itemActive)}
          loader={<div className="loader" style={{ textAlign: 'center', padding: '20px' }}>加载中...</div>}
        >
          <Content dataArray={dataArray} stockPrice={stockPrice} symbol={symbol} />
        </InfiniteScroller>}
        {isFinish && <div className="loader" style={{ textAlign: 'center', padding: '20px', color: 'gray' }}>到底啦</div>}
      </Loading>
    );
  }
}
