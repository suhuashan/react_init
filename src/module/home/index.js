import React, { useState, useEffect } from 'react';
import { toJS } from 'immutable';
import { useSelector, useDispatch } from 'react-redux';
import uuid from '@/util/uuid.js';
import { handleTime } from '@/util/time.js';
import { actionCreators } from './store/index.js';
import { HomeWrapper,
         BlogItem,
         BlogTitle,
         BlogInfo,
         BlogInfoItem,
         BlogAbstract,
         ReadAll
} from './style.js';


function Home () {
    let dispatch = useDispatch();
    let { blogList, blogNum } = useSelector(state => {
        return {
            blogList: state.getIn(['home', 'blogList']).toJS(),
            blogNum: state.getIn(['home', 'blogNum'])
        }
    });

    let readDetail = (blogID) => {

    }

    useEffect(() => {
        dispatch(actionCreators.getBlogList(10, 0));
    }, []);

    return (
        <HomeWrapper>
            {
                blogNum > 0 && blogList.map((item, index) => {
                    return (
                        <BlogItem key={uuid(index)}>
                            <BlogTitle title={item.blogTitle}>{item.blogTitle}</BlogTitle>
                            <BlogInfo>
                                <BlogInfoItem>
                                    <i className="iconfont icon-send"></i> 
                                    <span>发表于{handleTime(item.blogTime, 'y-m-d')}</span> |
                                    <i className="iconfont icon-wenjianjia"></i>
                                    <span>分类于{item.blogCategories}</span>
                                </BlogInfoItem>
                                <BlogInfoItem>
                                    <i className="iconfont icon-zishu"></i> 
                                    <span>字数统计{item.blogWord}个</span> |
                                    <i className="iconfont icon-time"></i>
                                    <span>阅读时长2分钟</span>
                                </BlogInfoItem>
                            </BlogInfo>
                            <BlogAbstract title={item.blogAbstract}>{item.blogAbstract}</BlogAbstract>
                            <ReadAll onClick={() => {readDetail(item.blogID)}}>阅读全文 »</ReadAll>
                        </BlogItem>
                    )
                })
            }
        </HomeWrapper>
    );
}

export default Home;