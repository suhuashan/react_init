import React, { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import CommonHeader from '../common/header/index.js';
import CategoryTagBlog from '../common/categoryTagBlog/index.js';
import { actionCreators } from './store/index.js';
import { DraftWrapper } from './style.js';

function Draft (props) {
    let dispatch = useDispatch();
    let { blogList, blogNum } = useSelector(state => ({
        blogList: state.getIn(['draft', 'blogList']).toJS(),
        blogNum: state.getIn(['draft', 'blogNum'])
    }));

    useEffect(() => {
        dispatch(actionCreators.getDraftBlog());
    }, []);

    return (
        <DraftWrapper>
            <CommonHeader number={blogNum} title='草稿箱' text='草稿'></CommonHeader>
            {
                blogNum > 0 ?
                <CategoryTagBlog blogList={blogList}
                                 type='draft'
                                 history={props.history}></CategoryTagBlog> :
                null
            }

        </DraftWrapper>
    )
}

export default Draft;