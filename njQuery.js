/**
 * Created by Administrator on 2017/3/14.
 */

(function(){
    //提供给外界的工厂函数,用于创建jQuery对象
    var njQuery = function(selector){
        //返回一个jQuery原型上的init方法产生的对象
        return new njQuery.fn.init(selector);
    };
    njQuery.prototype = {
        constructor:njQuery,
        init:function(selector){
            //1.如果是布尔值为false的类型,直接返回空对象
            if(!selector){
                return this;
            }
            //2.判断传入值是否为字符串
            else if(njQuery.isString(selector)){
                //2.1如果是字符串,去除空格,优化客户使用体验
                //2.11优先使用原生方法,有兼容问题
                njQuery.trim(selector);
                //2.2判断该字符是否为html片段
                if(njQuery.isHtml(selector)){
                    //2.21创建一个容器,将html片段数据放入,生成代码段
                    var nodes = document.createElement('div');
                    nodes.innerHTML = selector;
                    //2.22取出容器的子节点,用push方法放入对象属性中
                    [].push.apply(this,nodes.children);
                }
                //2.3否则就是选择器的情况
                else{
                    var temp = document.querySelectorAll(selector);
                    [].push.apply(this,temp);
                }
                return this;
            }
            //3.判断传入数据是否为数组
            else if(njQuery.isLikeArray(selector)){
                var temp = [].slice.call(selector);
                [].push.apply(this,temp);
                return this;
            }
            //4.其他情况
            this[0] = selector;
            this.length = 1;
            return this;
        }
    };


    //设置fn属性,并赋值为jQuery对象的原型对象
    njQuery.fn = njQuery.prototype;
    //将init方法的原型对象设置为jQuery的原型对象
    njQuery.fn.init.prototype = njQuery.fn;
    //暴露接口供外界使用
    window.njQuery = window.$ = njQuery;

    njQuery.extend = njQuery.fn.extend = function(obj){
        for(var key in obj){
            this[key]=obj[key];
        }
    };

    njQuery.extend({
        trim : function(str){
            if(str.trim()){
                return str.trim();
            }else{
                return str.replace(/^\s+|\s+$/g,'');
            }
        },
        isHtml : function(html){
            return html.charAt(0) == '<' &&
            html.charAt(html.length-1) == '>' &&
            html.length >=3;
        },
        isString : function(str){
            return typeof str === 'string';
        },
        isObject : function(obj){
            return  obj !== null && typeof obj === 'object';
        },
        isFunction : function(fun){
            return typeof fun !== 'function';
        },
        isWindow : function(win){
            return win !== window.window
        },
        isLikeArray : function(arr){
            if( njQuery.isObject(arr) &&
                njQuery.isFunction(arr) &&
                njQuery.isWindow(arr))
            {
                if(({}).toString.call(arr) === '[object Array]'){
                    return true;
                }else if('length' in arr && arr.length - 1 in arr){
                    return true;
                }
            }
            return false;
        }
    });



})();

