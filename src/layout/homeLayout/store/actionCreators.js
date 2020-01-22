import ajax from '@/util/request.js';
import { USER_INFO } from '@/const/api/index.js';
import { actionTypes } from './index.js';

export const getUserInfo = (username) => {
    return (dispatch) => {
        ajax({
            url: USER_INFO,
            data: {
                username
            }
        }).then(res => {
            dispatch({
                type: actionTypes.GET_USER_INFO,
                payload: res.data || {}
            });
        });
    };  
}