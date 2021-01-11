export const actions = {
  ON_CHANGE_TITLE: 'ON_CHANGE_TITLE',
  ON_CHANGE_DESCRIPTION: 'ON_CHANGE_DESCRIPTION',
  ON_CHANGE_VIDEO_UPLOAD: 'ON_CHANGE_VIDEO_UPLOAD',
  ON_VALIDATE_VIDEO_UPLOAD: 'ON_VALIDATE_VIDEO_UPLOAD'
}

export const initState = {
  title: {
    hasError: null,
    errorMessage: '',
  },
  description: {
    hasError: null,
    errorMessage: '',
  },
  video: {
    hasError: null,
    errorMessage: '',
  }
}

export function reducer(state, action) {
  switch (action.type) {
    case actions.ON_CHANGE_TITLE:
      return {
        ...state,
        title: { ...action.payload }
      }
    case actions.ON_CHANGE_DESCRIPTION:
      return {
        ...state,
        description: { ...action.payload }
      }
    case actions.ON_CHANGE_VIDEO_UPLOAD:
      return {
        ...state,
        video: { ...action.payload }
      }
    case actions.ON_VALIDATE_VIDEO_UPLOAD:
      return {
        ...state,
        video: { ...action.payload }
      }
    default:
      return state
  }
}