/**
 * 返回传入时间的年月日
 * @param {String} time 
 * @return {String}
 */
export function handleTime (time = '') {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month >= 10 ? month : `0${month}`;
    day =  day >= 10 ? day : `0${day}`;
    
    return `${year}-${month}-${day}`;
}