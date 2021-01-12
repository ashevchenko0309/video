import React from "react";
import {create, act} from 'react-test-renderer';
import InputField from "./InputField";

const DEFAULT_PROPS = { name: "Test", placeholder: "Test placeholder", labelText: "Test label" }

const setUp = (props) => mount(<InputField {...props} />);

describe("InputField component", () => {

  let component;

  beforeEach(() => {
    component = setUp({ ...DEFAULT_PROPS });
  });

  it("should render default input (snapshot)", () => {
    expect(component.getElement()).toMatchSnapshot();
  });

  it("should render input with default value (snapshot)", () => {
    const component = setUp({ ...DEFAULT_PROPS, defaultValue: "default value" })
    expect(component.getElement()).toMatchSnapshot();
  });

  it("should render input with error message (snapshot)", () => {
    const component = setUp({ ...DEFAULT_PROPS, hasError: true, errorMessage: "Some error" })
    expect(component.getElement()).toMatchSnapshot();
  });

  it("should render textarea with all props (snapshot)", () => {
    const component = setUp({ ...DEFAULT_PROPS, defaultValue: "default value", hasError: true, errorMessage: "Some error" })
    expect(component.getElement()).toMatchSnapshot();
  });

  it("should have default length hint", () => {
    expect(component.find('.input_field--hint').text()).toBe("0 / 120");
  });

  it("should have required hint", () => {
    const inputField = setUp({ ...DEFAULT_PROPS, isRequired: true });
    expect(inputField.find('.input_field--label').text()).toBe("Test label *");
  });

  it("should have default inactive class error hint", () => {
    const inputField = setUp({ ...DEFAULT_PROPS, isRequired: true });
    expect(inputField.find('.input_field--error').hasClass('inactive')).toBe(true);
  });

  it("should have active class error hint", () => {
    const inputField = setUp({ ...DEFAULT_PROPS, isRequired: true, hasError: true, errorMessage: 'Test error' });
    expect(inputField.find('.form_field').hasClass('has-error')).toBe(true);
    expect(inputField.find('.input_field--error').hasClass('active')).toBe(true);
  });

  it("should have error hint", () => {
    const inputField = setUp({ ...DEFAULT_PROPS, isRequired: true, hasError: true, errorMessage: 'Test error' });
    expect(inputField.find('.input_field--error').text()).toBe("Test error");
  });

  it("should call onChange method", () => {
    const mockCallback = jest.fn();
    const inputField = setUp({ ...DEFAULT_PROPS, onChange: mockCallback });

    expect(mockCallback.mock.calls.length).toBe(0);
    inputField.find('.form_field--input').simulate('change', { currentTarget: { value: '123456789' } });
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  it("shold call setInputValue method", () => {
    const setInputValue = jest.fn();
    const inputField = setUp({ ...DEFAULT_PROPS, onChange: setInputValue });
    const handleType = jest.spyOn(React, "useState");
    handleType.mockImplementation(inputValue => [inputValue, setInputValue]);

    expect(setInputValue.mock.calls.length).toBe(0);

    inputField.find('.form_field--input').simulate('change', { currentTarget: { value: '123456789' } });
    expect(setInputValue).toBeTruthy();
    expect(setInputValue.mock.calls.length).toBe(1);
  })

  it("should call onBlur method", () => {
    const onBlur = jest.fn();
    const inputField = setUp({ ...DEFAULT_PROPS, onBlur });

    expect(onBlur.mock.calls.length).toBe(0);

    inputField.find('.form_field--input').simulate('blur', { currentTarget: { value: '123456789' } });
    expect(onBlur.mock.calls.length).toBe(1);
  });

  it("should use default onChange prop", () => {
    const result = InputField.defaultProps.onChange();
    expect(result).toBe(undefined);
  });

  it("should use default onBlur prop", () => {
    const result = InputField.defaultProps.onBlur();
    expect(result).toBe(undefined);
  });

});
