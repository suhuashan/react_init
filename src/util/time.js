/**
 * 返回传入时间的年月日
 * @param {String} time 
 * @param {String} format 'y-m-d'||'m-d'||'y'||'y/m/d'
 * @return {String}
 */
export function formatTime (time = '', format) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month >= 10 ? month : `0${month}`;
    day =  day >= 10 ? day : `0${day}`;
    
    switch (format) {
        case 'y-m-d':
            return `${year}-${month}-${day}`;
        case 'm-d':
            return `${month}-${day}`;
        case 'y':
            return year;
        case 'y/m/d':
            return `${year}/${month}/${day}`;
        default: 
            return '输入日期格式不符合';
    }
}
