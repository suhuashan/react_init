import ajax from '@/util/request.js';
import { USER_INFO } from '@/const/api/index.js';
import { actionTypes } from './index.js';

export const getUserInfo = () => {
    return (dispatch) => {
        ajax({
            url: USER_INFO,
        }).then(res => {
            dispatch({
                type: actionTypes.GET_USER_INFO,
                payload: res.data || {}
            });
        });
    };  
}