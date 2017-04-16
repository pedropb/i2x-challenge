import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import * as actions from '../actions';
import history from '../history';

export class Logout extends Component {
  componentWillMount() {
    this.props.logoutUser();
  }

  render() {
    setTimeout(() => {
      history.push('/');
    }, 3000);

    return (
      <div className="logout-wrapper">
        <Card>
          <CardTitle><strong>You have been successfully logged off</strong></CardTitle>
          <CardText>
            <p>Returning to home screen...</p>
            <LinearProgress mode="indeterminate" />
          </CardText>
        </Card>
      </div>
    );
  }
}

export default connect(null, actions)(Logout);