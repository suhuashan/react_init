import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from '../store/index.js';
import CategoryTagBlog from '../../common/categoryTagBlog/index.js';

function CategoriesDetail (props) {
    let dispatch = useDispatch();
    let { categoryName } = props.match.params;
    let { blogList, blogNum } = useSelector(state => {
        return {
            blogList: state.getIn(['category', 'blogList']).toJS(),
            blogNum: state.getIn(['category', 'blogNum'])
        }
    });

    useEffect(() => {
        dispatch(actionCreators.getBlogListByCategories(categoryName));
    }, []);

    return (
        <CategoryTagBlog text="分类"
                         title={categoryName}
                         blogList={blogNum > 0 ? blogList : []}
                         history={props.history}></CategoryTagBlog>
    )
}

export default CategoriesDetail;