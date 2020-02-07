import { fromJS } from "immutable";
import { actionTypes } from './index.js';

const defaultState = fromJS({
    username: '',
    signature: '',
    desc: '',
    avatar: '',
    tags: '',
    categories: '',
    articles: []
});

export default (previousState = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_USER_INFO: 
            return previousState.merge(action.payload);
        default: 
            return previousState;
    }
}