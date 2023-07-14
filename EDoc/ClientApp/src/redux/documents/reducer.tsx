import {DOCUMENTS_FIND_ALL, DOCUMENTS_INCREASE_COUNT} from "./actions";

const INIT_STATE = {
    data: [] as any[],
    error: "",
};
export default (state = INIT_STATE, action:any) => {
    switch (action.type) {
        case DOCUMENTS_FIND_ALL:
            return {...state,data:action.payload.data, error: ""};
        case DOCUMENTS_INCREASE_COUNT:
            const updatedData = state.data.map((document) => {
                if (document.id === action.payload.data) {
                    return {
                        ...document,
                        downloadCount: document.downloadCount + 1,
                    };
                }
                return document;
            });
            return {...state,data:updatedData, error: ""};
        default:
            return state
    }
    
}