/**
 * Created by Administrator on 2017/3/22.
 */
function json2str(data) {
    //添加随机因子
    data.t = Math.random();
    var arr = [];
    //将json数据的key和value用等号拼接
    for(var key in data){
        arr.push(key+'='+encodeURI(data[key]));
    }
    //将数组内的数据用&符号拼接返回出去
    return arr.join('&');
}

function ajax(options) {
    //安全处理
    if(!options.url){
        return;
    }
    options.type = options.type || 'get';
    options.data = options.data || null;
    options.timeout = options.timeout || 0;

    if(window.XMLHttpRequest){
        var xhr = new XMLHttpRequest();
    }else{
        var xhr = new ActiveXObject('Microsoft,XMLHTTP');
    }
    //处理参数数据
    var str = json2str(options.data);
    //判断请求类型
    if(options.type == 'get'){
        xhr.open(options.type,options.url+'?'+str,true);
        xhr.send();
    }else{
        xhr.open(options.type,options.url,true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(str);
    }

    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4){
            //如果请求成功,清空定时器
            clearTimeout(timer);
            if(xhr.status >=200 && xhr.status <300 || xhr.status == 304){
                options.success(xhr.responseText);
            }else{
                options.error(xhr.status);
            }
        }
    };

    if(options.timeout){
        var timer = setTimeout(function () {
            alert('请求超时');
            //如果超时,中断请求
            xhr.abort();
        },options.timeout);
    }
}