import React from 'react';
import { Route } from 'react-router';
import { shallow } from 'enzyme';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import Recordings from './Recordings';
import Recording from './Recording';

describe('<Recordings />', () => {
  it('shows a spinner while requesting for data', () => {
    const wrapper = shallow(<Recordings fetchingRecordings={true} />);
    const spinner = wrapper.find(CircularProgress);

    expect(spinner).toHaveLength(1);
  });

  it('shows a message if there are no recordings available', () => {
    const props = {
      fetchingRecordings: false,
      recordings: []
    };

    const wrapper = shallow(<Recordings {...props} />);
    expect(wrapper.html()).toMatch(/no recordings/i);
  }); 

  it('shows a list of <Recording /> elements', () => {
    const recording = {
      "final_script": "transcript text",
      "rating": 4,
      "duration": 920,
      "url": "url_to_audio", 
      "created": "date_string" 
    };
    const props = {
      fetchingRecordings: false,
      recordings: [
        recording,
        recording,
        recording,
        recording
      ]
    }

    const wrapper = shallow(<Recordings {...props} />);
    const recordings = wrapper.find(Recording);
    expect(recordings).toHaveLength(4);
  });

  it('shows a Logout button', () => {
    const wrapper = shallow(<Recordings />);
    expect(wrapper.html()).toMatch(/logout/i);
  });

});