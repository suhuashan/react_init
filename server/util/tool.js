/**
 * 除去两个字符串中的重复的字符
 * @param {String} str1 
 * @param {String} str2 
 * @return {String} 
 */
function removeDuplicate (str1, str2) {
    str1 = str1 || '';
    str2 = str2 || '';
    let notEmptyList = [...str1.split(','), ...str2.split(',')].filter(item => item);
    return [...new Set(notEmptyList)].join();
}

module.exports = {
    removeDuplicate
};