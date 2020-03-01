import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BlogDetailWrapper, 
         DetailArticle,
         BlogAbstract,
         BlogContent,
         BlogEnd,
         BlogTag } from './style.js';
import { actionCreators } from './store/index.js'; 
import BlogDetailInfo from '../common/blogInfo/index.js';
import 'react-quill/dist/quill.snow.css';

function BlogDetail (props) {
    let dispatch = useDispatch();
    let { blogID } = props.match.params;
    let { blogTitle, blogAbstract, blogContent, blogType, 
          blogTags, blogCategories, blogTime, blogWord } = useSelector(state => state.get('blogDetail').toJS());
    
    let goDetailByTags = (tagName) => {
        props.history.replace(`/tags/${tagName}`)
    };

    useEffect(() => {
        dispatch(actionCreators.getBlogDetail(blogID));
    }, []);

    return (
        <BlogDetailWrapper>
            <DetailArticle>
                <BlogDetailInfo blogInfo={{blogTitle, blogCategories, blogTime, blogWord, blogType}}></BlogDetailInfo>
                <BlogAbstract>
                    摘要：{blogAbstract}
                </BlogAbstract>
                <BlogContent className="ql-snow">
                    <div className="ql-editor"
                         dangerouslySetInnerHTML={{ __html: blogContent }}>        
                    </div>
                </BlogContent>
                <BlogEnd>
                    -------------本文结束
                    <i className={`iconfont icon-jiaoyin`}></i>
                    感谢您的阅读-------------
                </BlogEnd>
                <BlogTag>
                    {
                        blogTags.split(',').map(item => (
                            <li key={item} onClick={() => goDetailByTags(item)}>
                                <i className="iconfont icon-tags"></i>
                                {item}
                            </li>
                        ))
                    }
                </BlogTag>
            </DetailArticle>
        </BlogDetailWrapper>
    )
}

export default BlogDetail;