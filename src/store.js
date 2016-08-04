import { createStore, combineReducers } from 'redux'
import formBuilderReducer from './FormBuilder/reducers'

const reducers = {
  builder: formBuilderReducer,
}

const store = createStore(combineReducers(reducers))

export default store
