/**
 * 返回传入时间的年月日
 * @param {String} time 
 * @param {String} format 'y-m-d'/'m-d'/'y'
 * @return {String}
 */
export function handleTime (time = '', format) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month >= 10 ? month : `0${month}`;
    day =  day >= 10 ? day : `0${day}`;
    
    if (format === 'y-m-d') {
        return `${year}-${month}-${day}`;
    } else if (format === 'm-d') {
        return `${month}-${day}`;
    } else if (format === 'y') {
        return year;
    } else {
        return '输入日期格式不符合';
    }
}
