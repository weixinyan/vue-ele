/*功能： 解析url参数，返回一个对象形式 
@example: ?id=1234&a=b
@return Object{id: 1234, a: b}
*/
export function urlParse() {
    let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    if (arr) {
        // ['?id=1234', '&a=b']
        arr.forEach((item) => {
            let tempArer = item.substring(1).split('=');
            let key = decodeURIComponent(tempArr[0]);
            let val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        })
    }
    return obj;

}