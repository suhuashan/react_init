import { combineReducers } from 'redux-immutable';
import { reducer as HomeLayoutReducer } from '../layout/homeLayout/store/index.js'; 

export default combineReducers({
    homeLayout: HomeLayoutReducer
});