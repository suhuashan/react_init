import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from './store/index.js';
import { ArchivesWrapper, 
         ArchivesContent,
         ArchivesInfoLogo,
         ArchivesInfo,
         ArchivesYear } from './style.js';
import { BlogItem,
         BlogDetail,
         BlogTitle } from '../common/categoryTagBlog/style.js';
import { formatTime } from '@/util/time.js';

function Archives (props) {
    let dispatch = useDispatch();
    let blogListYearMap = useSelector(state => {
        let blogList = state.getIn(['archives', 'blogList']).toJS() || [];
        let blogListYearMap = {};

        blogList.forEach (item => {
            let targetYear = formatTime(item.blogTime, 'y');

            if (blogListYearMap[targetYear]) {
                blogListYearMap[targetYear].push(item);
            } else {
                blogListYearMap[targetYear] = [item];
            }
        });

        return blogListYearMap;
    });
    let blogListTotal = useSelector(state => {
        return state.getIn(['archives','blogNum']);
    });
    let goBlogDetail = (blog) => {
        let { blogTime, blogTitle, blogID } = blog;
        props.history.replace(`/detail/${formatTime(blogTime, 'y/m/d')}/${blogTitle}/${blogID}`);
    }

    useEffect(() => {
        dispatch(actionCreators.getBlogListByArchives());
    }, []);

    return (
        <ArchivesWrapper>
            <ArchivesContent>
                <ArchivesInfoLogo/>
                <ArchivesInfo>目前共计{blogListTotal}篇日志。 继续努力。</ArchivesInfo>
                {
                    blogListTotal > 0 && Object.keys(blogListYearMap).map(year => {
                    return (
                        <React.Fragment key={year}>
                            <ArchivesYear>{year}</ArchivesYear>
                            {
                                blogListYearMap[year].map(item => {
                                    return (
                                        <BlogItem key={item.blogID}>
                                            <BlogDetail>
                                                <span>{formatTime(item.blogTime, 'm-d')}</span>
                                                <BlogTitle title={item.blogTitle}
                                                           onClick={() => goBlogDetail(item)}>{item.blogTitle}</BlogTitle>
                                            </BlogDetail>
                                        </BlogItem>
                                    )
                                })
                            }
                        </React.Fragment>
                    )
                    })
                }                
            </ArchivesContent>
        </ArchivesWrapper>
    );
}

export default Archives;