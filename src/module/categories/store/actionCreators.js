import { actionTypes } from './index.js';
import { GET_BLOG_LIST_BY_CATEGORIES } from '@/const/api/index.js';
import ajax from '@/util/request.js';

export const getBlogListByCategories = (categoryName) => {
    return (dispatch) => {
        ajax({
            method: 'post',
            url: GET_BLOG_LIST_BY_CATEGORIES,
            data: {
                categoryName
            }
        }).then(res => {
            dispatch({
                type: actionTypes.GET_BLOG_BY_CATEGORIES,
                payload: res.data.list || []
            })
        })
    };
}