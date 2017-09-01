import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { NEWS_PATH } from '../constants';

import Index from '../components/index';
import NewsDetail from '../components/news-detail';

export default (
  <Router history={browserHistory}>
    <Route path={NEWS_PATH.index} component={Index} />
    <Route path={NEWS_PATH.newsDetail} component={NewsDetail} />
  </Router>
);
