import { Dispatch } from 'redux';
import {isLoading} from "../actions";
import Globals from "../global";
export const DOCUMENTS_FIND_ALL = "DOCUMENTS_FIND_ALL";
export const DOCUMENTS_INCREASE_COUNT = "DOCUMENTS_INCREASE_COUNT";
export const documentsFindAll = (data:any) => {
    return {
        type: DOCUMENTS_FIND_ALL,
        payload: { data },
    };
};
export const documentsIncreaseCount = (data:any) => {
    return {
        type: DOCUMENTS_INCREASE_COUNT,
        payload: { data },
    };
};
export function documentsFindAllEndpoint() {
    return (dispatch:Dispatch) => {
        dispatch(isLoading(true));
        const url = Globals.toURL(`documents/GetDocuments`,null);
        fetch(url)
            .then(response => {
                return response;
            })
            .then(response => response.json())
            .then(json => {
                dispatch(isLoading(false));
                dispatch(documentsFindAll(json));
            });
    };
}