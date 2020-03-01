import { fromJS } from "immutable";
import { actionTypes } from './index.js';

const defaultState = fromJS({
    username: '',
    signature: '',
    desc: '',
    avatar: '',
    tags: '',
    categories: '',
    articles: [],
    tagsLen: 0,
    categoriesLen: 0
});

export default (previousState = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_USER_INFO: 
            let { tags = '',  categories = ''} = action.payload;
            
            action.payload.tagsLen = (tags && tags.split(',').length) || 0;
            action.payload.categoriesLen = (categories && categories.split(',').length) || 0;
            return previousState.merge(action.payload);
        default: 
            return previousState;
    }
}