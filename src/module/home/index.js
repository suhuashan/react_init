import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import uuid from '@/util/uuid.js';
import ajax from '@/util/request.js';
import { formatTime } from '@/util/time.js';
import { actionCreators } from './store/index.js';
import { HomeWrapper,
         BlogItem,
         BlogAbstract,
         ReadAll
} from './style.js';
import { UPDATE_BLOG_READ } from '@/const/api/index.js';
import BlogDetailInfo from '../common/blogInfo/index.js';



function Home (props) {
    let dispatch = useDispatch();
    let { blogList, blogNum } = useSelector(state => {
        return {
            blogList: state.getIn(['home', 'blogList']).toJS(),
            blogNum: state.getIn(['home', 'blogNum'])
        }
    });

    let readDetail = (blog) => {
        ajax({
            url: UPDATE_BLOG_READ,
            method: 'post',
            data: {
                blogID: blog.blogID
            }
        }).then(() => {
            let { blogTime, blogTitle, blogID } = blog;
            props.history.replace(`/detail/${formatTime(blogTime, 'y/m/d')}/${blogTitle}/${blogID}`);
        });
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
                            <BlogDetailInfo blogInfo={item}></BlogDetailInfo>
                            <BlogAbstract title={item.blogAbstract}>{item.blogAbstract}</BlogAbstract>
                            <ReadAll onClick={() => {readDetail(item)}}>阅读全文 »</ReadAll>
                        </BlogItem>
                    )
                })
            }
        </HomeWrapper>
    );
}

export default Home;