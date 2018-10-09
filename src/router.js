import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import class3 from './routes/class3';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/class" exact component={class3} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
