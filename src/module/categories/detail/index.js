import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from '../store/index.js';
import CategoryTagBlog from '../../common/categoryTagBlog/index.js';

function CategoriesDetail (props) {
    let dispatch = useDispatch();
    let { categoryName } = props.match.params;
    let blogList = useSelector(state => {
        return state.get('category').toJS();
    }) || [];

    useEffect(() => {
        dispatch(actionCreators.getBlogListByCategories(categoryName));
    }, []);

    return (
        <CategoryTagBlog text="分类"
                         title={categoryName}
                         blogList={blogList}></CategoryTagBlog>
    )
}

export default CategoriesDetail;