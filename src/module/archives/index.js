import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toJS } from 'immutable';
import { actionCreators } from './store/index.js';
import { ArchivesWrapper, 
         ArchivesContent,
         ArchivesInfoLogo,
         ArchivesInfo,
         ArchivesYear } from './style.js';
import { BlogItem,
         BlogDetail,
         BlogTitle } from '../common/categoryTagBlog/style.js';
import { handleTime } from '@/util/time.js';

function Archives () {
    let dispatch = useDispatch();
    let blogListYearMap = useSelector(state => {
        let blogList = state.getIn(['archives']).toJS() || [];
        let blogListYearMap = {};

        blogList.forEach (item => {
            let targetYear = handleTime(item.blogTime, 'y');

            if (blogListYearMap[targetYear]) {
                blogListYearMap[targetYear].push(item);
            } else {
                blogListYearMap[targetYear] = [item];
            }
        });

        return blogListYearMap;
    });
    let blogListTotal = useSelector(state => {
        return state.getIn(['archives']).toJS().length;
    });

    useEffect(() => {
        dispatch(actionCreators.getBlogListByArchives());
    }, []);

    return (
        <ArchivesWrapper>
            <ArchivesContent>
                <ArchivesInfoLogo/>
                <ArchivesInfo>目前共计{blogListTotal}篇日志。 继续努力。</ArchivesInfo>
                {
                    Object.keys(blogListYearMap).map(year => {
                      return (
                        <React.Fragment key={year}>
                            <ArchivesYear>{year}</ArchivesYear>
                            {
                                blogListYearMap[year].map(item => {
                                    return (
                                        <BlogItem key={item.blogID}>
                                            <BlogDetail>
                                                <span>{handleTime(item.blogTime, 'm-d')}</span>
                                                <BlogTitle title={item.blogTitle}>{item.blogTitle}</BlogTitle>
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