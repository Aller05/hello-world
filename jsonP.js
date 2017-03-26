/**
 * Created by Administrator on 2017/3/23.
 */
//格式化字符串
function json2str(data) {
    var arr = [];
    for(var key in data){
        //将json数据中的key和value用等号拼接
        arr.push(key+'='+encodeURI(data[key]));
    }
    //返回用&符号转化的字符串
    return arr.join('&');
}
/**
 * 跨域访问
 * @param url 地址 [string]
 * @param cbName 回调对应的key [string]
 * @param data 输入的内容 [json]
 * @param fn 回调函数 [function]
 * @constructor
 */
function JsonP(url,cbName,data,fn) {
    //随机生成回调函数名称
    var callBackName = ('JsonP_'+Math.random()).replace('.','');
    //添加为data的属性
    data[cbName] = callBackName;
    //格式化拼接字符串
    data = json2str(data);
    //创建新的script标签
    var oScript = document.createElement('script');
    //添加地址属性
    oScript.src = url+'?'+data;
    //插入到body里,即可访问对应的网址接收返回的json数据
    document.body.appendChild(oScript);
    //因为回调函数名称为随机生成,所以添加为window的属性
    window[callBackName] = function (json) {
        fn && fn(json);
    };
    //每次回调完成后删除添加的script标签
    document.body.removeChild(oScript);
}
