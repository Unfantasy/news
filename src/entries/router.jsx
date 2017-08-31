import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Index from '../components/index';
// import App from '../components/App';
// import Stage1 from '../components/Stage1';
// import Stage2 from '../components/Stage2';
// import Stage3 from '../components/Stage3';

export default (
  <Router history={browserHistory}>
    <Route path="/web/index" component={Index}>
      {/* <IndexRoute component={Index} /> */}
      {/* <Route path="s1" component={Stage1} />
      <Route path="s2" component={Stage2} />
      <Route path="s3" component={Stage3} /> */}
    </Route>
  </Router>
);
