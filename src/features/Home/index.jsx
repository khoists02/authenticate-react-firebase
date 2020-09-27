import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import MainPage from './pages/Main';
function Authen(props) {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.url} component={MainPage} />
    </Switch>
  )
}

Authen.propTypes = {}

export default Authen;

