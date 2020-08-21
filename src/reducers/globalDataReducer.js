
import {DATA_LOADING, LOADED_GLOBAL_RECORD, LOAD_ERROR} from '../actions/action';

const initialState = {
    loading : false,
    global_record : [],
    error: null
}

export default function globalReducer(state = initialState, action) {
    
    switch(action.type) {
        case DATA_LOADING: 
            return {
                ...state,
                loading: true
            }
        case LOADED_GLOBAL_RECORD:
            return {
                ...state,
                loading: false,
                global_record : action.global_record
            }
        case LOAD_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default: 
            return state;
    }
}