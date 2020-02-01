import { fromJS } from "immutable";
import { actionTypes } from './index.js';

const defaultState = fromJS({
    blogTitle: '',
    blogContent: '',
    blogTags: '',
    blogCategories: ''
});

export default (previousState = defaultState, action) => {
    switch (action.type) {
        default: 
            return previousState;
    }
};