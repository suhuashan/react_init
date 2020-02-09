import React from 'react';
import { BlogTitle,
         BlogInfo,
         BlogInfoItem } from './style.js';
import { formatTime } from '@/util/time.js';


function BlogDetailInfo (props) {
    let { blogInfo } = props;

    return (
        <React.Fragment>
            <BlogTitle title={blogInfo.blogTitle}>{blogInfo.blogTitle}</BlogTitle>
            <BlogInfo>
                <BlogInfoItem>
                    <i className="iconfont icon-send"></i> 
                    <span>发表于{formatTime(blogInfo.blogTime, 'y-m-d')}</span> |
                    <i className="iconfont icon-wenjianjia"></i>
                    <span>分类于{blogInfo.blogCategories}</span>
                </BlogInfoItem>
                <BlogInfoItem>
                    <i className="iconfont icon-zishu"></i> 
                    <span>字数统计{blogInfo.blogWord}个</span> |
                    <i className="iconfont icon-time"></i>
                    <span>阅读时长2分钟</span>
                </BlogInfoItem>
            </BlogInfo>
        </React.Fragment>
    )
}

export default BlogDetailInfo;