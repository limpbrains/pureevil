export const FORMS_MOVE = 'FORMS_MOVE'
export const FORMS_REMOVE = 'FORMS_REMOVE'
export const FORMS_ADD_FIELD = 'FORMS_ADD_FIELD'
export const FORMS_EDIT_DESC = 'FORMS_EDIT_DESC'
export const FORMS_ADD_CHOICE = 'FORMS_ADD_CHOICE'
export const FORMS_EDIT_FIELD = 'FORMS_EDIT_FIELD'
export const FORMS_EDIT_CHOICE = 'FORMS_EDIT_CHOICE'
export const FORMS_BUILDER_RESET = 'FORMS_BUILDER_RESET'
export const FORMS_REMOVE_CHOICE = 'FORMS_REMOVE_CHOICE'
export const FORMS_CHANGE_REQUIRED = 'FORMS_CHANGE_REQUIRED'

export function reset(scheme) {
  return {
    type: FORMS_BUILDER_RESET,
    scheme,
  }
}

export function addField(fieldType) {
  return {
    type: FORMS_ADD_FIELD,
    fieldType,
  }
}

export function changeRequired(id) {
  return {
    type: FORMS_CHANGE_REQUIRED,
    id,
  }
}

export function remove(id) {
  return {
    type: FORMS_REMOVE,
    id,
  }
}

export function move(fromIndex, toIndex) {
  return {
    type: FORMS_MOVE,
    fromIndex,
    toIndex,
  }
}

export function addChoice(id) {
  return {
    type: FORMS_ADD_CHOICE,
    id,
  }
}

export function editChoice(id, index, value) {
  return {
    type: FORMS_EDIT_CHOICE,
    id,
    index,
    value,
  }
}

export function editField(id, value) {
  return {
    type: FORMS_EDIT_FIELD,
    id,
    value,
  }
}

export function removeChoice(id, index) {
  return {
    type: FORMS_REMOVE_CHOICE,
    id,
    index,
  }
}

export function editDesc(value) {
  return {
    type: FORMS_EDIT_DESC,
    value,
  }
}
