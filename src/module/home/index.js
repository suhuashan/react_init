import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import uuid from '@/util/uuid.js';
import ajax from '@/util/request.js';
import { Input, Empty, Pagination } from 'antd';
import { formatTime } from '@/util/time.js';
import { actionCreators } from './store/index.js';
import { HomeWrapper,
         BlogItem,
         BlogAbstract,
         ReadAll
} from './style.js';
import { UPDATE_BLOG_READ } from '@/const/api/index.js';
import BlogDetailInfo from '../common/blogInfo/index.js';


const { Search } = Input;

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

    let searchBlog = (keyword) => {
        dispatch(actionCreators.getBlogList(10, 0, keyword));
    };  

    let onShowSizeChange = (current, pageSize) => {
        dispatch(actionCreators.getBlogList(pageSize, (current - 1) * pageSize));
    };

    useEffect(() => {
        dispatch(actionCreators.getBlogList(10, 0));
    }, []);

    return (
        <HomeWrapper>
            <Search placeholder="请输入标题，摘要或者内容的关键字"
                    onSearch={searchBlog}
                    allowClear
            />
            {
                blogNum > 0 ? 
                <React.Fragment>
                    {
                        blogList.map((item, index) => {
                            return (
                                <BlogItem key={uuid(index)}>
                                    <BlogDetailInfo blogInfo={item}></BlogDetailInfo>
                                    <BlogAbstract title={item.blogAbstract}>摘要：{item.blogAbstract}</BlogAbstract>
                                    <ReadAll onClick={() => {readDetail(item)}}>阅读全文 »</ReadAll>
                                </BlogItem>
                            )
                        }) 
                    }
                    <Pagination showSizeChanger
                                onChange={onShowSizeChange} 
                                onShowSizeChange={onShowSizeChange}
                                total={blogNum}>            
                    </Pagination>
                </React.Fragment>
                :
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </HomeWrapper>
    );
}

export default Home;