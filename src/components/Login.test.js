import React from 'react';
import { Route } from 'react-router';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import injectTapEventPlugin from 'react-tap-event-plugin';
import reducers from '../reducers';
import Login from './Login';


injectTapEventPlugin();

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, undefined, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

describe('<Login />', () => {
  let wrapper = null;
  beforeEach(() => {
    let root = mount(
    <Provider store={store}>
      <MuiThemeProvider>
        <Login />
      </MuiThemeProvider>
    </Provider>);

    wrapper = root.find(Login);
  });
  
  it('has email, password and submit button', () => {
    const email = wrapper.find('input[name="email"]');
    const password = wrapper.find('input[name="password"][type="password"]');
    const submit = wrapper.find('button[type="submit"]');

    expect(email && password && submit).toBeTruthy();
  });

  describe('field validations', () => {
    const invalidRegex = /invalid/i;
    const requiredRegex = /required/i;
    const match = regex => wrapper.html().match(regex);
    let email = null;
    let password = null;

    beforeEach(() => {
      email = wrapper.find('input[name="email"]');
      password = wrapper.find('input[name="password"][type="password"]');
    });

    it('should output error message for invalid email', () => {
      email.simulate('change', { target: { value: 'not-an-email' }});
      email.simulate('blur');
      expect(match(invalidRegex)).toBeTruthy();
    });

    it('should not output error message for valid email', () => {
      email.simulate('change', { target: { value: 'pedropb@i2x.ai' }});
      email.simulate('blur');
      expect(match(invalidRegex)).toBeFalsy();
    });

    it('should output required message for empty email', () => {
      email.simulate('change', { target: { value: '' }});
      email.simulate('blur');
      expect(match(requiredRegex)).toBeTruthy();
    });

    it('should not output required message for any email', () => {
      email.simulate('change', { target: { value: 'aaaaaa' }});
      email.simulate('blur');
      expect(match(requiredRegex)).toBeFalsy();
    });

    it('should output required message for empty password', () => {
      password.simulate('change', { target: { value: '' }});
      password.simulate('blur');
      expect(match(requiredRegex)).toBeTruthy();
    });

    it('should not output required message for any password', () => {
      password.simulate('change', { target: { value: 'aaaaaa' }});
      password.simulate('blur');
      expect(match(requiredRegex)).toBeFalsy();
    });
  });

});