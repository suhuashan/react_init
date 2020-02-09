import { fromJS } from "immutable";
import { actionTypes } from './index.js';

const defaultState = fromJS({
    blogTitle: '',
    blogAbstract: '',
    blogContent: '',
    blogTags: '',
    blogCategories: '',
    blogType: '',
    blogStatus: '',
    blogWord: 0
});

export default (previousState = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_BLOG_DETAIL:
            return previousState.merge(action.payload);
        default: 
            return previousState;
    }
};