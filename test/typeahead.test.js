import React from 'react';
import { shallow } from 'enzyme';
import Typeahead from '../src/Typeahead';


const mockData = ['test', 'TEst2', 'Apple', 'App le 2 ', 'Banana', 'Mango', 'Mango'];

describe('Typeahead', () => {
  const onChange = jest.fn();

  let wrapper;
  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallow(<Typeahead onChange={onChange} dataSource={mockData} query="" />);
  });

  it('should render component', () => {
    expect(wrapper.children().length).toBeGreaterThan(0);
  });


  describe('onChange', () => {
    it('should set query state', () => {
      wrapper.instance().onChange({ target: { value: 'Banana' } });
      expect(wrapper.instance().state.query).toBe('Banana');
    });

    it('should set suggestions state', () => {
      wrapper.instance().onChange({ target: { value: 'Banana' } });
      expect(wrapper.instance().state.suggestions).toEqual(['Banana']);
    });
  });

  describe('onHover', () => {
    it('should set marked state', () => {
      wrapper.instance().onHover('Banana');
      expect(wrapper.instance().state.marked).toBe('Banana');
    });
  });

  describe('onClick', () => {
    beforeEach(() => {
      wrapper.instance().onClick('Banana');
    });
    it('should set query state', () => {
      expect(wrapper.instance().state.query).toBe('Banana');
    });

    it('should clear suggestions state', () => {
      expect(wrapper.instance().state.suggestions).toEqual([]);
    });

    it('should clear marked state', () => {
      expect(wrapper.instance().state.marked).toBe('');
    });

    it('should call onChange function', () => {
      expect(onChange).toHaveBeenCalledWith('Banana');
    });
  });

  describe('parseQuery', () => {
    it('should not change value when it is lowercase', () => {
      const value = 'banana';
      expect(wrapper.instance().parseQuery(value)).toBe(value);
    });

    it('should parse value when it is contains UpperCase', () => {
      const value = 'BanAna';
      expect(wrapper.instance().parseQuery(value)).toBe('banana');
    });

    it('should remove space', () => {
      const value = 'BanAna ';
      expect(wrapper.instance().parseQuery(value)).toBe('banana');
    });
  });

  describe('filter', () => {
    it('should return matched exact value', () => {
      expect(wrapper.instance().filter('Banana')).toEqual(['Banana']);
    });

    it('should return all matched values', () => {
      expect(wrapper.instance().filter('test')).toEqual(['test', 'TEst2']);
    });

    it('should return  matched values when it is', () => {
      expect(wrapper.instance().filter('apple')).toEqual(['Apple', 'App le 2 ']);
    });

    it('should return  unique values when it is', () => {
      expect(wrapper.instance().filter('ango')).toEqual(['Mango']);
    });
  });

  describe('onKeyUp', () => {
    it('should call markNeighbor with 1 when press arrow down', () => {
      jest.clearAllMocks();
      const spy = jest.spyOn(wrapper.instance(), 'markNeighbor');
      wrapper.instance().onKeyUp({ keyCode: 40 });
      expect(spy).toHaveBeenCalledWith(1);
    });

    it('should call markNeighbor with 1 when press arrow up', () => {
      jest.clearAllMocks();
      const spy = jest.spyOn(wrapper.instance(), 'markNeighbor');
      wrapper.instance().onKeyUp({ keyCode: 38 });
      expect(spy).toHaveBeenCalledWith(-1);
    });

    it('should call markNeighbor with 1 when press enter', () => {
      jest.clearAllMocks();
      const spy = jest.spyOn(wrapper.instance(), 'onClick');
      wrapper.instance().onKeyUp({ keyCode: 13 });
      expect(spy).toHaveBeenCalled();
    });

    it('should not call any method when kay code is unknown', () => {
      jest.clearAllMocks();
      const spy = jest.spyOn(wrapper.instance(), 'markNeighbor');
      const clickSpy = jest.spyOn(wrapper.instance(), 'onClick');
      wrapper.instance().onKeyUp({ keyCode: 133 });
      expect(spy).not.toHaveBeenCalled();
      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  describe('markNeighbor', () => {
    it('should select empty value when suggestions are empty', () => {
      wrapper.instance().markNeighbor(1);
      expect(wrapper.instance().state.marked).toBe('');
    });

    it('should find next value when step is positive', () => {
      wrapper.instance().setState({ suggestions: mockData, marked: 'Banana' });
      wrapper.instance().markNeighbor(1);
      expect(wrapper.instance().state.marked).toBe('Mango');
    });

    it('should change to last value when step is positive and current value is last', () => {
      wrapper.instance().setState({ suggestions: mockData, marked: 'Mango' });
      wrapper.instance().markNeighbor(1);
      expect(wrapper.instance().state.marked).toBe('Mango');
    });

    it('should find next value when step is negative', () => {
      wrapper.instance().setState({ suggestions: mockData, marked: 'Mango' });
      wrapper.instance().markNeighbor(-1);
      expect(wrapper.instance().state.marked).toBe('Banana');
    });

    it('should change to first value when step is negative and current value is first', () => {
      wrapper.instance().setState({ suggestions: mockData, marked: 'test' });
      wrapper.instance().markNeighbor(-1);
      expect(wrapper.instance().state.marked).toBe('test');
    });
  });
});
