export const CLEAR_FILTERS='CLEAR_FILTERS';

export function clearFilters(){
    return {
        type:CLEAR_FILTERS,
        payload:''
    };
};