import { fromJS } from "immutable";
import { actionTypes } from './index.js';

const defaultState = fromJS({
    blogList: [{
        blogID: '',
        author: '',
        title: '',
        abstract: '',
        content: '',
        blogTime: ''
    }],
    blogNum: 0
});

export default (previousState = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_DRAFT_BLOG: 
            return previousState.merge(action.payload);
        default: 
            return previousState;
    }
}