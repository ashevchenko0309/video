import React from "react"
import VideoForm from "./VideoForm"
import { isValidLength } from "./video-from.helpers"

const DEFAULT_STATE = {
  formError: null,
  title: { hasError: false, errorMessage: "" },
  description: { hasError: false, errorMessage: "" },
  video: { hasError: false, errorMessage: "" },
}

const DEFAULT_ELEMENTS_VALUES = {
  elements: {
    title: { value: "Hello" },
    description: { value: "World" },
    video: { files: [{ value: "File" }] },
    thumb: {
      value:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==",
    },
  },
}

const setUp = () => mount(<VideoForm />)

describe("VideoForm component", () => {
  let component
  let instance

  beforeEach(() => {
    component = setUp()
    instance = component.instance()
  })

  describe("Snapshots", () => {
    it("should render form (snapshot)", () => {
      expect(component.getElement()).toMatchSnapshot()
    })

    it("should render 2 inputs by default", () => {
      expect(component.find("input").length).toBe(2)
    })

    it("should render 4 inputs when upload file", () => {
      component.find(".form_field--upload").simulate("change", {
        target: { files: ["video"] },
      })

      setTimeout(() => {
        expect(component.find("input").length).toBe(4)
      }, 500)
    })
  })

  describe("Validation", () => {
    describe("Validation Errors", () => {
      it("should set error on submit empty fields", () => {
        expect(component.find(".form-error__hint").length).toBe(0)

        instance.onSubmit({ preventDefault: () => {} })

        expect(component.state().formError).toBe(
          "Some form field(s) is invalid or empty"
        )
      })

      it("should show error if video field does not exist", () => {
        component.setState({ ...DEFAULT_STATE })

        instance.onSubmit({
          preventDefault: () => {},
          currentTarget: {
            elements: {
              ...DEFAULT_ELEMENTS_VALUES.elements,
              video: { files: [] },
            },
          },
        })

        expect(component.state().video).toStrictEqual({
          hasError: true,
          errorMessage: "Must have video file",
        })
      })

      it("should set form error on server error", () => {
        instance.onFulfilledPost({
          errors: [{ param: "title", msg: "invalid title" }],
        })
        expect(component.state().formError).toBe("title - invalid title")
      })

      it("should return error validation on less than minLength", () => {
        instance.onFulfilledPost({
          errors: [{ param: "title", msg: "invalid title" }],
        })
        expect(
          isValidLength("123", { minLength: 5, maxLength: 10 }, "Error")
        ).toStrictEqual({ hasError: true, errorMessage: "Error" })
      })

      it("should return error validation on grater than maxLength", () => {
        instance.onFulfilledPost({
          errors: [{ param: "title", msg: "invalid title" }],
        })
        expect(
          isValidLength("12345678910", { minLength: 5, maxLength: 10 }, "Error")
        ).toStrictEqual({ hasError: true, errorMessage: "Error" })
      })
    })

    describe("Validation Success", () => {
      it("should hide error if formError has error", () => {
        component.setState({ ...DEFAULT_STATE, formError: "Some string" })

        instance.onSubmit({
          preventDefault: () => {},
          currentTarget: {
            elements: {
              title: { value: "Hello" },
              description: { value: "World" },
              video: { files: [{ value: "File" }] },
              thumb: {
                value:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==",
              },
            },
          },
        })

        expect(component.state().formError).toBe(null)
      })

      it("should pass validation on title field", () => {
        instance.onFieldBlur("Hello", "title")
        expect(component.state().title).toStrictEqual({
          hasError: false,
          errorMessage: "",
        })
      })

      it("should pass validation on description field", () => {
        instance.onFieldBlur("World", "description")
        expect(component.state().description).toStrictEqual({
          hasError: false,
          errorMessage: "",
        })
      })

      it("should be silence on unknown field", () => {
        const result = instance.onFieldBlur("World", "unknown")
        expect(result).toBe(null)
      })

      it("should clear errors on change title", () => {
        component.setState({
          ...DEFAULT_STATE,
          title: { hasError: true, errorMessage: "Title invalid" },
        })

        instance.onTitleChange("Hello")
        expect(component.state().title).toStrictEqual({
          hasError: false,
          errorMessage: "",
        })
      })

      it("should clear errors on change description", () => {
        component.setState({
          ...DEFAULT_STATE,
          description: { hasError: true, errorMessage: "Title invalid" },
        })

        instance.onDescriptionChange("Hello")
        expect(component.state().description).toStrictEqual({
          hasError: false,
          errorMessage: "",
        })
      })

      it("should clear errors on change video", () => {
        component.setState({
          ...DEFAULT_STATE,
          video: { hasError: true, errorMessage: "Video invalid" },
        })

        instance.onVideoChange()
        expect(component.state().video).toStrictEqual({
          hasError: false,
          errorMessage: "",
        })
      })

      it("should return success validation", () => {
        instance.onFulfilledPost({
          errors: [{ param: "title", msg: "invalid title" }],
        })
        expect(
          isValidLength("12345", { minLength: 5, maxLength: 10 }, "Error")
        ).toStrictEqual({ hasError: false, errorMessage: "" })
      })
    })
  })
})
