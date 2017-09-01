import React, { Component } from 'react';
import { Modal } from 'antd-mobile';
import { fetch } from '../../utils';
import { domain } from '../../constants';
import Loading from '../../components/common/loading';
import './style.scss';

const alert = Modal.alert;

export default class extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    // setTimeout(() => {
    //   // const newsContent = document.getElementById('J_news_content');
    //   // console.log('123', newsContent);
    //   // console.log('this: ', this);
    //   // this.refs.contentDiv.innerHTML = '1244';
    // }, 200);
    this.initData();
  }
  initData() {
    const newsUrl = sessionStorage.getItem('newsUrl');
    if (newsUrl) {
      fetch.get(`${domain}/mimikj${newsUrl}`.replace('test.', ''), { data: { auth_token: '918a258913fa4deeaf549bb571d34517857942061' } }).then((data) => {
        if (data.success) {
          const { content } = data.result;
          setTimeout(() => {
            document.getElementById('J_news_content').innerHTML = content;
          }, 0);
          this.setState({ loading: false, content });
        }
        console.log(data);
      });
    } else {
      alert('提示', '页面出错了', [{ onPress: () => { history.go(-1); } }]);
    }
  }
  render() {
    const { loading } = this.state;
    return (
      <Loading loading={loading} className="news-detail">
        <div ref="contentDiv" id="J_news_content" />
      </Loading>
    );
  }
}
