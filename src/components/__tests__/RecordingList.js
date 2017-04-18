import React from 'react';
import { Route } from 'react-router';
import { shallow } from 'enzyme';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import RecordingList from '../RecordingList';
import Recording from '../Recording';

describe('<RecordingList />', () => {
  it('shows a spinner while requesting for data', () => {
    const wrapper = shallow(<RecordingList fetchingRecordings={true} />);
    const spinner = wrapper.find(CircularProgress);

    expect(spinner).toHaveLength(1);
  });

  it('shows a message if there are no recordings available', () => {
    const props = {
      fetchingRecordings: false,
      recordings: []
    };

    const wrapper = shallow(<RecordingList {...props} />);
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

    const wrapper = shallow(<RecordingList {...props} />);
    const recordings = wrapper.find(Recording);
    expect(recordings).toHaveLength(4);
  });

  it('shows a Logout button', () => {
    const wrapper = shallow(<RecordingList />);
    expect(wrapper.html()).toMatch(/logout/i);
  });

});