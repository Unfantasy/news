/**
 * @name: 主内容
 */

import React, { Component } from 'react';
import { Flex, Modal, List } from 'antd-mobile';
// import { browserHistory } from 'react-router';
import ZJLXImgSrc from '../../../../asset/img/zijinliuxiang.png';
import GSHDImgSrc from '../../../../asset/img/gongsihudong.png';
import GSGGImgSrc from '../../../../asset/img/gongsigonggao.png';
import DZJYImgSrc from '../../../../asset/img/bz.png';
import LHBImgSrc from '../../../../asset/img/lhb.png';
import DJGImgSrc from '../../../../asset/img/hg.png';
import IncreaseImgSrc from '../../../../asset/img/increase.png';
import MACDImgSrc from '../../../../asset/img/macd.png';
import KDJImgSrc from '../../../../asset/img/kdj.png';
import RSIImgSrc from '../../../../asset/img/rsi.png';
import BOLLImgSrc from '../../../../asset/img/boll.png';
import RZRQImgSrc from '../../../../asset/img/rong.png';
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

      // 今日快讯
      if (data.type === 'zixuan_news_flash_jr') {
        return (
          <div className="news-type today-news" onClick={this.toNewDetail.bind(this, data.detail_url)}>
            <div className="today-news-title">今日<span>快讯</span></div>
            <h2>{data.description}</h2>
            <p><span>{data.name}&nbsp;&nbsp;</span>{dateFormatter(new Date(data.create_time), 'hh:mm')}</p>
          </div>
        );

      // 资金流向
      } else if (data.type === 'trade_info_zjlx') {
        return (
          <div className="news-type trade-zjlx" onClick={this.toNewDetail.bind(this, data.detail_url)}>
            <h2>{data.description}</h2>
            <p>
              <img src={ZJLXImgSrc} role="presentation" />
              <span>{data.name}&nbsp;&nbsp;</span>
              <span>{dateFormatter(new Date(data.create_time), 'hh:mm')}</span>
            </p>
          </div>
        );

      // 公司互动
      } else if (data.type === 'trade_info_gshd') {
        return (
          <div className="news-type trade-zjlx" onClick={this.toNewDetail.bind(this, data.detail_url)}>
            <h2>{data.description}</h2>
            <p>
              <img src={GSHDImgSrc} role="presentation" />
              <span>{data.name}&nbsp;&nbsp;</span>
              <span>{dateFormatter(new Date(data.create_time), 'hh:mm')}</span>
            </p>
          </div>
        );

      // 公司公告
      } else if (data.type === 'notice') {
        return (
          <div className="news-type trade-zjlx" onClick={this.toNewDetail.bind(this, data.detail_url)}>
            <h2>{data.description}</h2>
            <p>
              <img src={GSGGImgSrc} role="presentation" />
              <span>{data.name}&nbsp;&nbsp;</span>
              <span>{dateFormatter(new Date(data.create_time), 'hh:mm')}</span>
            </p>
          </div>
        );

      // 大宗交易
      } else if (data.type === 'trade_info_dzjy') {
        return (
          <div className="news-type trade-zjlx" onClick={this.toNewDetail.bind(this, data.detail_url)}>
            <h2>{data.description}</h2>
            <p>
              <img src={DZJYImgSrc} role="presentation" />
              <span>{data.name}&nbsp;&nbsp;</span>
              <span>{dateFormatter(new Date(data.create_time), 'hh:mm')}</span>
            </p>
          </div>
        );

      // 龙虎榜
      } else if (data.type === 'trade_info_lhb') {
        return (
          <div className="news-type trade-zjlx" onClick={this.toNewDetail.bind(this, data.detail_url)}>
            <h2>{data.description}</h2>
            <p>
              <img src={LHBImgSrc} role="presentation" />
              <span>{data.name}&nbsp;&nbsp;</span>
              <span>{dateFormatter(new Date(data.create_time), 'hh:mm')}</span>
            </p>
          </div>
        );

      // 交易播报
      } else if (data.type === 'price_broadcast') {
        let description = data.description;
        console.log('priceData: ', data);
        try {
          description = JSON.parse(data.description);
        } catch (e) { console.log(e); }
        return (
          <div className="news-type trade-zjlx" onClick={this.toNewDetail.bind(this, data.detail_url)}>
            <h2>{description.desc || description}</h2>
            <p>
              <span>{data.name}&nbsp;&nbsp;</span>
              <span>{dateFormatter(new Date(data.create_time), 'hh:mm')}</span>
            </p>
          </div>
        );

      // 涨跌
      } else if (data.type.indexOf('price_') > -1) {
        console.log('priceData: ', data);
        // const descriptionObj = JSON.parse(data.description);
        return (
          <div className="news-type trade-zjlx" onClick={this.toNewDetail.bind(this, data.detail_url)}>
            <h2>{data.description}</h2>
            <p>
              <span>{data.name}&nbsp;&nbsp;</span>
              <span>{dateFormatter(new Date(data.create_time), 'hh:mm')}</span>
            </p>
          </div>
        );

      // 技术分析
      } else if (data.type === 'indicator') {
        console.log('技术分析:  ', data);
        const descriptionArr = data.description.split('|');
        const itemNodes = descriptionArr.map((v) => {
          const vArr = v.split(',');
          if (vArr[0] === 'MACD') {
            return (
              <div className="indicator-item">
                <div className="indicator-item-content">
                  <img src={MACDImgSrc} role="presentation" />
                </div>
                <div className="indicator-item-extra">{vArr[1]}&nbsp;&nbsp;&nbsp;{vArr[2] || ''}</div>
              </div>
            );
          } else if (vArr[0] === 'BOLL') {
            return (
              <div className="indicator-item">
                <div className="indicator-item-content">
                  <img src={BOLLImgSrc} role="presentation" />
                </div>
                <div className="indicator-item-extra">{vArr[1]}&nbsp;&nbsp;&nbsp;{vArr[2] || ''}</div>
              </div>
            );
          } else if (vArr[0] === 'RSI') {
            return (
              <div className="indicator-item">
                <div className="indicator-item-content">
                  <img src={RSIImgSrc} role="presentation" />
                </div>
                <div className="indicator-item-extra">{vArr[1]}&nbsp;&nbsp;&nbsp;{vArr[2] || ''}</div>
              </div>
            );
          } else if (vArr[0] === 'KDJ') {
            return (
              <div className="indicator-item">
                <div className="indicator-item-content">
                  <img src={KDJImgSrc} role="presentation" />
                </div>
                <div className="indicator-item-extra">{vArr[1]}&nbsp;&nbsp;&nbsp;{vArr[2] || ''}</div>
              </div>
            );
          }
          return <div />;
        });
        return (
          <div className="news-type indicator" onClick={this.toNewDetail.bind(this, data.detail_url)}>
            <div className="indicator-content">
              {itemNodes}
            </div>
            <p>
              <span>{data.name}&nbsp;&nbsp;</span>
              <span>{dateFormatter(new Date(data.create_time), 'hh:mm')}</span>
              <span className="float-right">(仅供参考，非投资建议)</span>
            </p>
          </div>
        );

      // 董监高
      } else if (data.type === 'trade_info_djg') {
        return (
          <div className="news-type trade-zjlx" onClick={this.toNewDetail.bind(this, data.detail_url)}>
            <h2>{data.description}</h2>
            <p>
              <img src={DJGImgSrc} role="presentation" />
              <span>{data.name}&nbsp;&nbsp;</span>
              <span>{dateFormatter(new Date(data.create_time), 'hh:mm')}</span>
            </p>
          </div>
        );

      // 交易提示
      } else if (data.type === 'memo') {
        const description = typeof data.description === 'string' ? JSON.parse(data.description) : data.description;
        const contentItem = description.map(d =>
          <div className="stock">
            <div className="stock-name"><img src={IncreaseImgSrc} alt="交易提示图片" /><span>{d.stock_name}</span>&nbsp;&nbsp;<span>{d.symbol}</span></div>
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

      // 融资融券
      } else if (data.type === 'trade_info_rzrq') {
        const descriptionArr = data.description.split('|');
        const itemNodes = descriptionArr.map(v =>
          <List.Item extra={v.split(',')[1]}>{v.split(',')[0]}</List.Item>
        );
        return (
          <div className="news-type trade-rzrq" onClick={this.toNewDetail.bind(this, data.detail_url)}>
            <div className="trade-rzrq-content">
              <div className="trade-rzrq-content-title">
                <img src={RZRQImgSrc} role="presentation" />
              </div>
              <List>
                {itemNodes}
              </List>
            </div>
            <p>
              <span>{data.name}&nbsp;&nbsp;</span>
              <span>{dateFormatter(new Date(data.create_time), 'hh:mm')}</span>
            </p>
          </div>
        );
      } else if (data.type.indexOf('news_') !== -1) {
        let picArr = [];
        try {
          picArr = data.pic_url ? (typeof data.pic_url === 'string' ? JSON.parse(data.pic_url) : data.pic_url) : [];
        } catch (e) { console.log(e); }
        if (picArr.length < 3 && picArr.length > 0) {
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
      }
      console.log('没有匹配到type: ', data.type, 'data: ', data);
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
