import React from "react"
import TextareaField from "./TextareaField"

const DEFAULT_PROPS = {
  name: "Test",
  placeholder: "Test placeholder",
  labelText: "Test label",
}

const setUp = (props) => mount(<TextareaField {...props} />)

describe("TextareaField component", () => {
  let component

  beforeEach(() => {
    component = setUp({ ...DEFAULT_PROPS })
  })

  it("should render default textarea (snapshot)", () => {
    expect(component.getElement()).toMatchSnapshot()
  })

  it("should render textarea with default value (snapshot)", () => {
    const component = setUp({ ...DEFAULT_PROPS, defaultValue: "default value" })
    expect(component.getElement()).toMatchSnapshot()
  })

  it("should render textarea with error message (snapshot)", () => {
    const component = setUp({
      ...DEFAULT_PROPS,
      hasError: true,
      errorMessage: "Some error",
    })
    expect(component.getElement()).toMatchSnapshot()
  })

  it("should render textarea with all props (snapshot)", () => {
    const component = setUp({
      ...DEFAULT_PROPS,
      defaultValue: "default value",
      hasError: true,
      errorMessage: "Some error",
    })
    expect(component.getElement()).toMatchSnapshot()
  })

  it("should have default length hint", () => {
    expect(component.find(".input_field--hint").text()).toBe("0 / 255")
  })

  it("should have required hint", () => {
    const textareaField = setUp({ ...DEFAULT_PROPS, isRequired: true })
    expect(textareaField.find(".input_field--label").text()).toBe(
      "Test label *"
    )
  })

  it("should have default inactive class error hint", () => {
    const textareaField = setUp({ ...DEFAULT_PROPS, isRequired: true })
    expect(textareaField.find(".input_field--error").hasClass("inactive")).toBe(
      true
    )
  })

  it("should have active class error hint", () => {
    const textareaField = setUp({
      ...DEFAULT_PROPS,
      isRequired: true,
      hasError: true,
      errorMessage: "Test error",
    })
    expect(textareaField.find(".form_field").hasClass("has-error")).toBe(true)
    expect(textareaField.find(".input_field--error").hasClass("active")).toBe(
      true
    )
  })

  it("should have error hint", () => {
    const textareaField = setUp({
      ...DEFAULT_PROPS,
      isRequired: true,
      hasError: true,
      errorMessage: "Test error",
    })
    expect(textareaField.find(".input_field--error").text()).toBe("Test error")
  })

  it("shold call setInputValue method", () => {
    const setTextareaValue = jest.fn()
    const inputField = setUp({ ...DEFAULT_PROPS, onChange: setTextareaValue })
    const handleType = jest.spyOn(React, "useState")
    handleType.mockImplementation((textareaValue) => [
      textareaValue,
      setTextareaValue,
    ])

    expect(setTextareaValue.mock.calls.length).toBe(0)

    inputField
      .find(".form_field--textarea")
      .simulate("change", { currentTarget: { value: "123456789" } })
    expect(setTextareaValue).toBeTruthy()
    expect(setTextareaValue.mock.calls.length).toBe(1)
  })

  it("should call onBlur method", () => {
    const onBlur = jest.fn()
    const inputField = setUp({ ...DEFAULT_PROPS, onBlur })

    expect(onBlur.mock.calls.length).toBe(0)
    inputField
      .find(".form_field--textarea")
      .simulate("blur", { currentTarget: { value: "123456789" } })
    expect(onBlur.mock.calls.length).toBe(1)
  })

  it("should use default onChange prop", () => {
    const result = TextareaField.defaultProps.onChange()
    expect(result).toBe(undefined)
  })

  it("should use default onBlur prop", () => {
    const result = TextareaField.defaultProps.onBlur()
    expect(result).toBe(undefined)
  })
})
