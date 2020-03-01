import React from 'react';
import { BlogTitle,
         BlogInfo,
         BlogInfoItem } from './style.js';
import { formatTime } from '@/util/time.js';
import { BLOG_TYPE } from '@/const/text/index.js';


function BlogDetailInfo (props) {
    let { blogInfo } = props;

    return (
        <React.Fragment>
            <BlogTitle title={blogInfo.blogTitle}>
                {blogInfo.blogTitle}
            </BlogTitle>
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
                    <span>阅读时长≈{Math.ceil(blogInfo.blogWord / 500)}分钟</span> |
                    <i className="iconfont icon-wenzhangleixing1"></i>
                    <span>{BLOG_TYPE[blogInfo.blogType]}</span>
                </BlogInfoItem>
            </BlogInfo>
        </React.Fragment>
    )
}

export default BlogDetailInfo;