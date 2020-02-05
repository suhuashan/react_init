import React from 'react';
import { useSelector } from 'react-redux';
import { TagsWrapper, TagsList, TagsItem } from './style.js';
import { actionCreators } from './store/index.js';
import CommonHeader from '../common/header/index.js';

function Tags (props) {
    let { tags = '' } = useSelector(state => ({
        tags: state.getIn(['homeLayout', 'tags']).split(',')
    }));
    
    let loadDetailByTags = (tagName) => {
        props.history.replace(`/tags/${tagName}`)
    };

    return (
        <TagsWrapper>
            <CommonHeader text='标签' number={tags.length} />
            <TagsList>
                {
                    tags.map(item => {
                        return (
                            <TagsItem key={item} onClick={() => {loadDetailByTags(item)}}>
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