import _ from 'lodash';
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Recording from './Recording';
import history from '../history';

export class RecordingList extends Component {
  componentWillMount() {
    this.props.fetchRecordings();
  }

  render() {
    const { 
      errorMessage, 
      isFetching,
      recordings,
      confirmLogout,
      showConfirmation
    } = this.props;

    let content = null;

    // if fetching records failed
    if (errorMessage) {
      content =  <div className="error-message">{ errorMessage }</div>
    }
    else {
      // if we are not fetching recordings, then render them
      if (!isFetching) {
        // if there are no recordings, show a message
        if (recordings && recordings.length === 0 ){
          content = <p><strong>Oops!</strong> There are no recordings available...</p>
        }
        // else render the recordings
        else {
          content = (
            <ReactCSSTransitionGroup
              key="animation"
              transitionName="recording-list"
              transitionAppear
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}>
            {_.map(recordings, (fieldProps) => <Recording {...fieldProps} key={fieldProps.url} />)}
            </ReactCSSTransitionGroup>
          );
        }
      }
      // if we are still fetching, then render a loading indicator
      else {
        content = (
          <div className="recording-list-loading">
            <CircularProgress />
          </div>
        );
      }
    }

    // modal actions for Logout button
    const modalActions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={confirmLogout}
      />,
      <FlatButton
        label="Logout"
        primary
        onTouchTap={() => {
          confirmLogout(); 
          history.push('/logout');
        }}
      />,
    ];

    return (
      <div className="recording-list-wrapper">
        <Dialog
          title="Confirm logout?"
          actions={modalActions}
          modal
          open={showConfirmation}
        />
        <AppBar
          title="Recordings"
          iconElementLeft={<IconButton><Exit /></IconButton>}
          onLeftIconButtonTouchTap={confirmLogout}
        />
        <Paper className="recording-list-body">
          {content}
        </Paper>
      </div>
    );
  }
};

function mapStateToProps(state) {
  const { recordings } = state;
  return { 
    recordings: recordings.data,
    isFetching: recordings.isFetching,
    showConfirmation: recordings.confirmLogout,
    errorMessage: recordings.errorMessage
  };
}


export default connect(mapStateToProps, actions)(RecordingList);