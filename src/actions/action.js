export const DATA_LOADING = 'DATA_LOADING';
export const LOADED_GLOBAL_RECORD = 'LOADED_GLOBAL_RECORD';
export const LOADED_COUNTRIES_RECORD = 'LOADED_COUNTRIES_RECORD';
export const LOAD_ERROR = 'LOAD_ERROR';

export function dataLoading() {
    return {
        type: DATA_LOADING
    }
}

export function loadedGloablRecord(record) {
    return {
        type: LOADED_GLOBAL_RECORD,
        global_record : record
    }
}

export function loadedCountriesRecord(countries) {
    return {
        type: LOADED_COUNTRIES_RECORD,
        countries_record : countries
    }
}

export function loadError(error) {
    return {
        type:  LOAD_ERROR ,
        error: error
    }
}