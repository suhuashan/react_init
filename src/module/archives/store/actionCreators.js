import { actionTypes } from './index.js';
import { GET_BLOG_LIST_BY_ARCHIVES } from '@/const/api/index.js';
import ajax from '@/util/request.js';
import get from 'lodash/get';

export const getBlogListByArchives = () => {
    return (dispatch) => {
        ajax({
            method: 'get',
            url: GET_BLOG_LIST_BY_ARCHIVES,
        }).then(res => {
            dispatch({
                type: actionTypes.GET_BLOG_BY_ARCHIVES,
                payload: {
                    blogList: get(res, 'data.list', []),
                    blogNum: get(res, 'data.total', 0)
                }
            })
        })
    };
}