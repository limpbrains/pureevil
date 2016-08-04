import {
  FORMS_MOVE,
  FORMS_REMOVE,
  FORMS_ADD_FIELD,
  FORMS_EDIT_DESC,
  FORMS_ADD_CHOICE,
  FORMS_EDIT_FIELD,
  FORMS_EDIT_CHOICE,
  FORMS_BUILDER_RESET,
  FORMS_REMOVE_CHOICE,
  FORMS_CHANGE_REQUIRED,
} from '../actions'

const initialState = {
  scheme: {
    desc: '',
    fields: [],
  },
  idCounter: 0,
}

function editReducer(state = initialState, action) {
  let field, fields, fieldIndex

  switch (action.type) {
    case FORMS_CHANGE_REQUIRED:
      return {
        ...state,
        scheme: {
          ...state.scheme,
          fields: state.scheme.fields.map(f =>
            action.id === f.id ? {...f, required: !f.required} : f)
        }
      }

    case FORMS_ADD_FIELD:
      field = {id: state.idCounter, name: '', type: action.fieldType, required: false}
      if (['radio', 'checkbox', 'select'].indexOf(action.fieldType) !== -1) {
        field.choices = []
      }
      return {
        ...state,
        idCounter: state.idCounter + 1,
        scheme: {
          ...state.scheme,
          fields: [
            ...state.scheme.fields,
            field,
          ]
        }
      }

    case FORMS_REMOVE:
      return {
        ...state,
        scheme: {
          ...state.scheme,
          fields: state.scheme.fields.filter(f => f.id !== action.id)
        }
      }

    case FORMS_MOVE:
      field = state.scheme.fields[action.fromIndex]
      fields = state.scheme.fields.filter((f, i) => i !== action.fromIndex)
      fields.splice(action.toIndex, 0, field)

      return {
        ...state,
        scheme: {
          ...state.scheme,
          fields,
        }
      }

    case FORMS_ADD_CHOICE:
      fieldIndex = state.scheme.fields.findIndex(f => f.id === action.id)
      field = state.scheme.fields[fieldIndex]
      field = {
        ...field,
        choices: [...field.choices, ''],
      }
      fields = [
        ...state.scheme.fields.slice(0, fieldIndex),
        field,
        ...state.scheme.fields.slice(fieldIndex + 1)
      ]

      return {
        ...state,
        scheme: {
          ...state.scheme,
          fields,
        }
      }

    case FORMS_EDIT_CHOICE:
      fieldIndex = state.scheme.fields.findIndex(f => f.id === action.id)
      field = state.scheme.fields[fieldIndex]
      field.choices[action.index] = action.value

      field = {
        ...field,
        choices: [...field.choices],
      }
      fields = [
        ...state.scheme.fields.slice(0, fieldIndex),
        field,
        ...state.scheme.fields.slice(fieldIndex + 1)
      ]

      return {
        ...state,
        scheme: {
          ...state.scheme,
          fields,
        }
      }

    case FORMS_EDIT_FIELD:
      return {
        ...state,
        scheme: {
          ...state.scheme,
          fields: state.scheme.fields.map(f =>
            action.id === f.id ? {...f, name: action.value} : f)
        }
      }

    case FORMS_REMOVE_CHOICE:
      fieldIndex = state.scheme.fields.findIndex(f => f.id === action.id)
      field = state.scheme.fields[fieldIndex]
      // field.choices[action.index] = action.value

      field = {
        ...field,
        choices: field.choices.filter((c, i) => i !== action.index)
      }
      fields = [
        ...state.scheme.fields.slice(0, fieldIndex),
        field,
        ...state.scheme.fields.slice(fieldIndex + 1)
      ]

      return {
        ...state,
        scheme: {
          ...state.scheme,
          fields,
        }
      }

    case FORMS_EDIT_DESC:
      return {
        ...state,
        scheme: {
          ...state.scheme,
          desc: action.value,
        }
      }

    case FORMS_BUILDER_RESET:
      fields = action.scheme.fields.map((field, index) => ({...field, id: index}))
      return {
        ...state,
        idCounter: fields.length + 1,
        scheme: {
          ...action.scheme,
          fields,
        }
      }

    default:
      return state
  }
}

function validationReducer(state, action) {
  if ([FORMS_MOVE, FORMS_EDIT_DESC, FORMS_CHANGE_REQUIRED].indexOf(action.type) !== -1) {
    return state
  }

  const errors = {}

  const addError = (field, error) => {
    if (! (field in errors)) {
      errors[field] = new Set()
    }
    errors[field].add(error)
  }

  state.scheme.fields.forEach((field, index) => {
    if (! field.name) {
      addError(field.id, 'Empty name')
    } else if (state.scheme.fields.findIndex((f, i) => f.name === field.name && i < index) !== -1) {
      addError(field.id, 'Duplicate name')
    }

    if (['radio', 'checkbox', 'select'].indexOf(field.type) !== -1) {
      if (field.choices.length === 0) {
        addError(field.id, 'Empty choices')
      } else if (new Set(field.choices).size !== field.choices.length) {
        addError(field.id, 'Duplicate choices')
      } else if (field.choices.findIndex(c => !c) !== -1) {
        addError(field.id, 'Empty choice name')
      }
    }
  })

  return {
    ...state,
    errors,
  }
}

export default function(state, action) {
  return validationReducer(
    editReducer(state, action),
    action
  )
}
