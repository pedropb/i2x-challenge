import React from 'react';
import { Route } from 'react-router';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import injectTapEventPlugin from 'react-tap-event-plugin';
import reducers from '../../reducers';
import * as types from '../../actions/types';
import CircularProgress from 'material-ui/CircularProgress';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import RecordingList from '../RecordingList';
import Recording from '../Recording';


injectTapEventPlugin();

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

describe('<RecordingList />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <RecordingList />
        </MuiThemeProvider>
      </Provider>
    );
  });

  it('shows a spinner while requesting for data', () => {
    store.dispatch({ type: types.FETCHING_RECORDINGS });

    const spinner = wrapper.find(CircularProgress);

    expect(spinner).toHaveLength(1);
  });

  it('shows a message if there are no recordings available', () => {
    store.dispatch({
      type: types.FETCH_RECORDINGS,
      payload: []
    });

    expect(wrapper.html()).toMatch(/no recordings/i);
  }); 

  it('shows a list of <Recording /> elements', () => {
    const recording = (id) => {return { 
      "final_script": "transcript text",
      "rating": 4,
     "duration": 920,
      "url": `url_to_audio${id}`, 
      "created": "date_string" 
    }};
    store.dispatch({
      type: types.FETCH_RECORDINGS,
      payload: [recording(1), recording(2), recording(3), recording(4)]
    });

    const recordings = wrapper.find(Recording);
    expect(recordings).toHaveLength(4);
  });

  it('shows a Logout button', () => {
    expect(wrapper.find(Exit)).toHaveLength(1);
  });

});