import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BlogDetailWrapper, 
         DetailArticle,
         BlogAbstract,
         BlogContent } from './style.js';
import { actionCreators } from './store/index.js'; 
import BlogDetailInfo from '../common/blogInfo/index.js';

function BlogDetail (props) {
    let dispatch = useDispatch();
    let { blogID } = props.match.params;
    let { blogTitle, blogAbstract, blogContent, blogStatus, blogType, 
          blogTags, blogCategories, blogTime, blogWord } = useSelector(state => state.get('blogDetail').toJS());

    useEffect(() => {
        dispatch(actionCreators.getBlogDetail(blogID));
    }, []);

    return (
        <BlogDetailWrapper>
            <DetailArticle>
                <BlogDetailInfo blogInfo={{blogTitle, blogCategories, blogTime, blogWord}}></BlogDetailInfo>
                <BlogAbstract>
                    {blogAbstract}
                </BlogAbstract>
                <BlogContent dangerouslySetInnerHTML={{ __html: blogContent }}></BlogContent>
            </DetailArticle>
        </BlogDetailWrapper>
    )
}

export default BlogDetail;