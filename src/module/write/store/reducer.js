import { fromJS } from "immutable";
import { actionTypes } from './index.js';

const defaultState = fromJS({
    blogTitle: '',
    blogAbstract: '',
    blogContent: '',
    blogTags: '',
    blogCategories: '',
    blogType: '',
    blogStatus: ''
});

export default (previousState = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_DRAFT_DETAIL:
            return previousState.merge(action.payload);
        case 'default':
            return defaultState;
        default: 
            return previousState;
    }
};