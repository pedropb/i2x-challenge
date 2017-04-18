import React from 'react';
import { shallow } from 'enzyme';
import Recording from '../Recording';

describe('<Recording />', () => {
  it('renders without crashing', () => {
    const props = {};

    const recording = shallow(<Recording {...props}/>);
  });
})
