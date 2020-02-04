import { fromJS } from "immutable";
import { actionTypes } from './index.js';

const defaultState = fromJS([{
    blogTitle: '',
    blogAbstract: '',
    blogContent: '',
    blogRead: 0,
    blogWord: 0,
    blogTime: '',
    blogTags: '',
    blogCategories: ''
}]);

export default (previousState = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_BLOG_LIST: 
            return previousState.merge(action.payload);
        default: 
            return previousState;
    }
};