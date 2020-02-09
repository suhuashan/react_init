import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from '../store/index.js';
import CategoryTagBlog from '../../common/categoryTagBlog/index.js';

function TagsDetail (props) {
    let dispatch = useDispatch();
    let { tagName } = props.match.params;
    let blogList = useSelector(state => {
        return state.get('tag').toJS();
    }) || [];

    useEffect(() => {
        dispatch(actionCreators.getBlogListByTags(tagName));
    }, []);

    return (
        <CategoryTagBlog text="标签"
                         title={tagName}
                         blogList={blogList}
                         history={props.history}></CategoryTagBlog>
    )
}

export default TagsDetail;