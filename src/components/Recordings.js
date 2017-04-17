import _ from 'lodash';
import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Recording from './Recording';

class Recordings extends Component {
  render() {
    let content = null;

    // if we have recordings, render them
    if (this.props.recordings && this.props.recordings.length > 0) {
      content = _.map(this.props.recordings, (fieldProps) => <Recording {...fieldProps} key={fieldProps.url} />);
    }
    // else render a loading indicator
    else {
      content = <CircularProgress />;
    }

    return (
      <div className='recordings-wrapper'>
        {content}
      </div>
    );
  }
};

export default Recordings;