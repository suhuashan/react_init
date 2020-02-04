import { combineReducers } from 'redux-immutable';
import { reducer as HomeLayoutReducer } from '../layout/homeLayout/store/index.js'; 
import { reducer as WriteReducer } from '../module/write/store/index.js';
import { reducer as HomeReducer } from '../module/home/store/index.js';

export default combineReducers({
    homeLayout: HomeLayoutReducer,
    write: WriteReducer,
    home: HomeReducer
});