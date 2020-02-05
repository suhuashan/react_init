import { actionTypes } from './index.js';
import { GET_BLOG_LIST_BY_TAGS } from '@/const/api/index.js';
import ajax from '@/util/request.js';

export const getBlogListByTags = (tagName) => {
    return (dispatch) => {
        ajax({
            method: 'post',
            url: GET_BLOG_LIST_BY_TAGS,
            data: {
                tagName
            }
        }).then(res => {
            dispatch({
                type: actionTypes.GET_BLOG_BY_TAGS,
                payload: res.data.list || []
            })
        })
    };
}