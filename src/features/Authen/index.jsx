import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import LoginPage from './pages/Login';

function Authen({isAuthenticate}) {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.url} render={()=> <LoginPage isAuthenticate={isAuthenticate} />} />

      {/* <Route path={`${match.url}/add`} component={AddEditPage} />
      <Route path={`${match.url}/:photoId`} component={AddEditPage} /> */}

      {/* <Route component={NotFound} />   */}
    </Switch>
  )
}

Authen.propTypes = {}

export default Authen;

