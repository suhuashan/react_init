import { actionTypes } from './index.js';
import { GET_BLOG_DETAIL } from '@/const/api/index.js';
import ajax from '@/util/request.js';

export const getBlogDetail = (blogID) => {
    return (dispatch) => {
        ajax({
            url: GET_BLOG_DETAIL,
            method: 'post',
            data: {
                blogID
            }
        }).then( res => {
            dispatch({
                type: actionTypes.GET_BLOG_DETAIL,
                payload: res.data || {}
            })
        })
    };
};

