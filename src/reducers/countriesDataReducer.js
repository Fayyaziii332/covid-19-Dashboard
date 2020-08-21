
import {DATA_LOADING, LOADED_COUNTRIES_RECORD, LOAD_ERROR} from '../actions/action';

const initialState = {
    loading : false,
    countries_record : [],
    error: null
}

export default function countriesReducer(state = initialState, action) {
    switch(action.type) {
        case DATA_LOADING: 
            return {
                ...state,
                loading: true
            }
        case LOADED_COUNTRIES_RECORD:
            return {
                ...state,
                loading: false,
                countries_record  : action.countries_record 
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