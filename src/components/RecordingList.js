import _ from 'lodash';
import React, { Component } from 'react';
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
    let content = null;

    // if we are not fetching recordings, then render them
    if (!this.props.isFetching) {
      if (this.props.recordings && this.props.recordings.length === 0 ){
        content = <p><strong>Oops!</strong> There are no recordings available...</p>
      }
      else {
        content = _.map(this.props.recordings, (fieldProps) => <Recording {...fieldProps} key={fieldProps.url} />);
      }
    }
    // else render a loading indicator
    else {
      content = (
        <div>
          <CircularProgress />
        </div>
      );
    }

    const modalActions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.props.confirmLogout}
      />,
      <FlatButton
        label="Logout"
        primary
        onTouchTap={() => history.push('/logout')}
      />,
    ];

    return (
      <div className="recording-list-wrapper">
        <Dialog
          title="Confirm logout?"
          actions={modalActions}
          modal={true}
          open={this.props.showConfirmation}
        />
        <AppBar
          title="Recordings"
          iconElementLeft={<IconButton><Exit /></IconButton>}
          onLeftIconButtonTouchTap={this.props.confirmLogout}
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
    showConfirmation: recordings.confirmLogout
  };
}


export default connect(mapStateToProps, actions)(RecordingList);