import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';
import Error404 from './containers/ErrorContainer';


export default (
  <Route>
    {/* <Route component={AuthenticatedComponent}>
      <IndexRoute component={Dashboard} />
      <Route path="login" component={} />
    </Route> */}
    <Route path="404" component={Error404} />
    <Redirect from="*" to="404" />
  </Route>
);
