import { combineReducers } from 'redux'
import  globalDataReducer from './globalDataReducer'
import countriesDataReducer from './countriesDataReducer'
  
 const mainReducer = combineReducers({
    globalDataReducer , countriesDataReducer
  })

  export default mainReducer