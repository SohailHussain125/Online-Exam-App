import { combineReducers } from 'redux'
import reducer from './authReducers'
import courseObjReducer from './CourseReducer'

export default combineReducers({
    authReducers: reducer,
    courseObjReducer
})