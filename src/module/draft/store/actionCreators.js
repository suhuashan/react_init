import { actionTypes } from './index.js';
import { GET_DRAFT_BLOG } from '@/const/api/index.js';
import ajax from '@/util/request.js';
import get from 'lodash/get';

export const getDraftBlog = () => {
    return (dispatch) => {
        ajax({
            method: 'get',
            url: GET_DRAFT_BLOG,
        }).then(res => {
            dispatch({
                type: actionTypes.GET_DRAFT_BLOG,
                payload: {
                    blogList: get(res, 'data.list', []),
                    blogNum: get(res, 'data.total', 0)
                }
            })
        })
    };
}