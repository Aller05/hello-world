/**
 * Created by Administrator on 2017/3/22.
 */
/**
 * 获取指定的cookie
 * @param key [string]
 * @returns {*}
 */
function getCookie(key) {
    var array = document.cookie.split('; ');
    for (var i = 0; i < array.length; i++) {
        var subArr = array[i].split('=');
        if(subArr[0] == key){
            return subArr[1];
        }
    }
}
/**
 * 设置cookie
 * @param key [string]
 * @param value [string]
 * @param expires [number]
 */
function addCookie(key,value,expires) {
    if(!expires){
        document.cookie = key +'='+ value +'; ';
    }else{
        var date = new Date();
        date.setDate(date.getDate() + expires);
        document.cookie = key +'='+ value +'; expires='+ date + '; ';
    }
}

/**
 * 删除指定cookie
 * @param key
 */
function removeCookie(key) {
    addCookie(key,getCookie(key),-1);
}



