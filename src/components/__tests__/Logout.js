import React from 'react';
import { shallow } from 'enzyme';
import { Logout } from '../Logout';

describe('<Logout />', () => {
  it('logs off user', () => {
    const props = {
      logoutUser: jest.fn()
    };

    const logout = shallow(<Logout {...props}/>);

    expect(props.logoutUser).toHaveBeenCalled();
  });
})
