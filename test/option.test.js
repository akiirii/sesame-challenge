import React from 'react';
import { shallow } from 'enzyme';
import Option from '../src/Typeahead/option';

describe('Option', () => {
  const onClick = jest.fn();
  const onHover = jest.fn();
  const value = 'test option';

  let wrapper;
  beforeEach(() => {
    jest.clearAllMocks();
    // eslint-disable-next-line react/jsx-filename-extension
    wrapper = shallow(<Option onClick={onClick} onHover={onHover} value={value} query="test" />);
  });

  it('should render component', () => {
    expect(wrapper.find('Highlighter').exists()).toBe(true);
  });

  it('should call onClick function with value', () => {
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalledWith(value);
  });

  it('should hover function with value', () => {
    wrapper.simulate('mouseenter');
    expect(onHover).toHaveBeenCalledWith(value);
  });

  it('should call hover function with empty param', () => {
    wrapper.simulate('mouseleave');
    expect(onHover).toHaveBeenCalledWith('');
  });
});
