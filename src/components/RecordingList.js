import _ from 'lodash';
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Recording from './Recording';

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
      content = <CircularProgress />;
    }

    return (
      <div className="recording-list-wrapper">
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
    isFetching: recordings.isFetching
  };
}


export default connect(mapStateToProps, actions)(RecordingList);