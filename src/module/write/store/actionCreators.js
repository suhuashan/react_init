import { actionTypes } from './index.js';
import { GET_BLOG_DETAIL } from '@/const/api/index.js';
import ajax from '@/util/request.js';

export const getDraftDetail = (blogID) => {
    if (!blogID) {
        return (dispatch) => {
            dispatch({type: 'default', payload: {}});
        };
    }
    return (dispatch) => {
        ajax({
            url: GET_BLOG_DETAIL,
            method: 'post',
            data: {
                blogID
            }
        }).then( res => {
            dispatch({
                type: actionTypes.GET_DRAFT_DETAIL,
                payload: res.data || {}
            })
        })
    };
};

