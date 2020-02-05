import React from 'react';
import {
    CtgDetailWrapper,
    CtgDetailContent,
    CtgTitle,
    BlogItem,
    BlogDetail,
    BlogTitle
} from './style.js';
import { handleTime } from '@/util/time.js';
import uuid from '@/util/uuid.js';

function CategoryTagBlog (props) {
    let { title, blogList, text } = props;

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
                                    <span>{handleTime(item.blogTime, 'm-d')}</span>
                                    <BlogTitle title={item.blogTitle}>{item.blogTitle}</BlogTitle>
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