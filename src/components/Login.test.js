import React from 'react';
import { Route } from 'react-router';
import { mount } from 'enzyme';
import Login from './Login';


describe('<Login />', () => {
  const wrapper = mount(<Login />);
  
  it('has email, password and submit button', () => {
    const email = wrapper.find('input[name="email"]');
    const password = wrapper.find('input[name="password"][type="password"]');
    const submit = wrapper.find('button[action="submit"]');

    expect(email && password && submit).toBeTruthy();
  });

  it('should validate email', () => {
    const email = wrapper.find('input[name="email"]');
    const parent = email.parent();
    const invalidRegex = /invalid email/i;

    // Input an invalid email and check for "invalid email" string.
    email.simulate('change', { target: { value: 'not-an-email' }});
    expect(parent.html().match(invalidRegex)).toBeTruthy();

    // Input a valid email and assert that there are no "invalid email" strings.
    email.simulate('change', { target: { value: 'pedropb@i2x.ai' }});
    expect(parent.html().match(invalidRegex)).toBeFalsy();
  });

});