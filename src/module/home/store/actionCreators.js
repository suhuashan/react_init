import { GET_BLOG_LIST } from '@/const/api/index.js';
import { actionTypes } from './index.js';
import ajax from '@/util/request.js';
import get from 'lodash/get';

export const getBlogList = (limit, offset) => {
    return (dispatch) => {
        ajax({
            url: GET_BLOG_LIST,
            method: 'post',
            data: {
                limit,
                offset
            }
        }).then(res => {
            
            let blogList = get(res, 'data.list', []);
            dispatch({
                type: actionTypes.GET_BLOG_LIST,
                payload: blogList
            })
        });
    };
}