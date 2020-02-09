import { combineReducers } from 'redux-immutable';
import { reducer as HomeLayoutReducer } from '../layout/homeLayout/store/index.js'; 
import { reducer as WriteReducer } from '../module/write/store/index.js';
import { reducer as HomeReducer } from '../module/home/store/index.js';
import { reducer as CategoryReducer } from '../module/categories/store/index.js';
import { reducer as TagReducer } from '../module/tags/store/index.js';
import { reducer as ArchiversReducer } from '../module/archives/store/index.js';
import { reducer as DraftReducer } from '../module/draft/store/index.js';
import { reducer as BlogDetailReducer } from '../module/blogDetail/store/index.js';

export default combineReducers({
    homeLayout: HomeLayoutReducer,
    write: WriteReducer,
    home: HomeReducer,
    category: CategoryReducer,
    tag: TagReducer,
    archives: ArchiversReducer,
    draft: DraftReducer,
    blogDetail: BlogDetailReducer
});