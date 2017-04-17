import _ from 'lodash';
import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Recording from './Recording';

class Recordings extends Component {
  render() {
    let content = null;

    // if we are not fetching recordings, render them
    if (!this.props.fetchingRecordings) {
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
      <div className='recordings-wrapper'>
        {content}
        <button label="Logout">Logout</button>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { 
    recordings: state.recordings,
    fetchingRecordings: state.fetchingRecordings
  };
}


export default Recordings;