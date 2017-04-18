import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import history from './history';
import Login from './components/Login';
import Logout from './components/Logout';
import RecordingList from './components/RecordingList';

const handleRedirection = props => localStorage.getItem('token') ? <RecordingList {...props} /> : <Redirect to="/login" />;

export default function Routes(props) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route // protected route
          path="/recordings" 
          render={handleRedirection} />
        <Route render={handleRedirection} />  // No match
      </Switch>
    </Router>
  );
};