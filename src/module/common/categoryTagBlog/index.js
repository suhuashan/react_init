import React from 'react';
import {
    CtgDetailWrapper,
    CtgDetailContent,
    CtgTitle,
    BlogItem,
    BlogDetail,
    BlogTitle
} from './style.js';
import { formatTime } from '@/util/time.js';
import uuid from '@/util/uuid.js';

function CategoryTagBlog (props) {
    let { title, blogList, text, history, type } = props;
    let goBlogDetail = (blog) => {
        if (type === 'draft') {
            history.replace(`/write/${blog.blogID}`);
        } else {
            let { blogTime, blogTitle, blogID } = blog;
            history.replace(`/detail/${formatTime(blogTime, 'y/m/d')}/${blogTitle}/${blogID}`);
        }
    };

    return (
        <CtgDetailWrapper>
            <CtgDetailContent>
                <CtgTitle>
                    {title}
                    <span>{text}</span>
                </CtgTitle>
                {
                    blogList.map(item => {
                        return (
                            <BlogItem key={uuid(item.blogID)}>
                                <BlogDetail>
                                    <span>{formatTime(item.blogTime, 'm-d')}</span>
                                    <BlogTitle title={item.blogTitle}
                                               onClick={()=>goBlogDetail(item)}>{item.blogTitle}</BlogTitle>
                                </BlogDetail>
                            </BlogItem>
                        )
                    })
                }
            </CtgDetailContent>
        </CtgDetailWrapper>
    )
}

export default CategoryTagBlog;