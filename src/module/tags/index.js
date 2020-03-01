import React from 'react';
import { useSelector } from 'react-redux';
import { TagsWrapper, TagsList, TagsItem } from './style.js';
import CommonHeader from '../common/header/index.js';

function Tags (props) {
    let { tags, tagsLen } = useSelector(state => ({
        tags: state.getIn(['homeLayout', 'tags']),
        tagsLen: state.getIn(['homeLayout', 'tagsLen'])
    }));
    
    let loadDetailByTags = (tagName) => {
        props.history.replace(`/tags/${tagName}`)
    };

    return (
        <TagsWrapper>
            <CommonHeader text='标签' number={tagsLen} />
            <TagsList>
                {
                    tags && tags.split(',').map(item => {
                        return (
                            <TagsItem key={item} onClick={() => {loadDetailByTags(item)}}>
                                <i className="iconfont icon-tags"></i>
                                {item}
                            </TagsItem>
                        )
                    })
                }
            </TagsList>
        </TagsWrapper>
    );
}

export default Tags;