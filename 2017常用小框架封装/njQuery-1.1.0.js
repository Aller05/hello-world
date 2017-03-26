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
            else if(njQuery.isFunction(selector)){
                njQuery.ready(selector);
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
        },
        jquery:'1.1.0',
        selector:'',
        length:0,
        toArray:function(){
            return [].slice.call(this);
        },
        get:function(index){
            if(arguments.length == 0){
                return this.toArray();
            }else if(index>=0){
                return this[index];
            }else{
                return this[this.length + index];
            }
        },
        eq:function(index){
            if(arguments.length == 0){
                return njQuery();
            }else{
                return $(this[index]);
            }
        },
        first:function(){
            return $(this.eq(0));
        },
        last:function(){
            return $(this.eq(-1))
        },
        push:[].push,
        splice:[].splice,
        sort:[].sort,
        each:function(fn) {
            njQuery.each(this, fn)
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
            return typeof fun === 'function';
        },
        isWindow : function(win){
            return win === window.window
        },
        isLikeArray : function(arr){
            if( njQuery.isObject(arr) &&
                !njQuery.isFunction(arr) &&
                !njQuery.isWindow(arr))
            {
                if(({}).toString.call(arr) === '[object Array]'){
                    return true;
                }else if('length' in arr && arr.length - 1 in arr){
                    return true;
                }
            }
            return false;
        },
        ready: function(fn){
            if(document.readyState == 'complete'){
                fn();
            }
            if(document.addEventListener){
                document.addEventListener('DOMContentLoaded',fn)
            }else{
                document.attachEvent('onreadystatechange',function(){
                    if(document.readyState == 'complete'){
                        fn();
                    }
                })
            }
        },
        each:function(obj,fn){
            if(njQuery.isLikeArray(obj)){
                for(var i = 0, len = obj.length;i<len ;i++){
                    //下面的if判断目的:有时候循环并不需要取出所有值,可能只需要前几个
                    //所以调用each
                    if(fn.call(obj[i],i,obj[i])==false){
                        break;
                    }
                }
            }else{
                for(var key in obj){
                    if(fn.call(obj[key],key,obj[key]) == false){
                        break;
                    }
                }
            }
        },
        map:function(obj,fn){
            var res = [];
            if( 'length' in obj){
                for(var i = 0,len=obj.length;i<len ;i++){
                    res.push(fn(obj[i],i));
                }
            }else{
                for(var key in obj){
                    res.push(fn(obj[key],key));
                }
            }
            return res;
        }
    });
    //DOM相关
    njQuery.fn.extend({
        //清空元素所有内容(文字自己节点)
        empty:function(){
            this.each(function(key,value){
                this.innerHTML = '';
            });
            return this;
        },
        //删除元素,自己和所有孩子
        remove:function(){
            this.each(function(key,value){
                var father = value.parentNode;
                father.removeChild(value);
            });
            return this;
        },
        html:function(text){
            //如果没有传递参数,将第一个元素的内容返回
            if(arguments.length == 0){
                return this[0].innerHTML
            }else{//如果传递了参数,遍历所有元素,然后重写
                this.each(function(){
                    this.innerHTML = text;
                });
                return this;
            }
        },
        text:function(content){
            var res = "";
            var len = arguments.length;
            this.each(function(key,value){
                if(len == 0){
                    res += value.innerText;
                }else{
                    value.innerText = content;
                }
            });
            return len == 0 ? res : this;
        },
        appendTo:function(selector){
            var oSelector = $(selector);
            var res = [];
            this.each(function(key,source){
                $.each(oSelector,function(key2,target){
                    if(key2 == 0){
                        target.appendChild(source);
                        res.push(source);
                    }else{
                        var temp = source.cloneNode(true);
                        target.appendChild(temp);
                        res.push(temp);
                    }
                })
            });
            return $(res);
        },
        prependTo:function(selector){
            //以 li.prependTo(div)来说
            //备份的this为li
            var self = this;
            var oSelector = $(selector);
            var res = [];
            //先遍历div
            $.each(oSelector,function(key,target){
                //记录div的第一个子元素
                var child = target.firstChild;
                //遍历li
                self.each(function(){
                    if(key == 0){//如果是第一个div,直接插入
                        target.insertBefore(this,child);
                        res.push(this);
                    }else{//否则先克隆再插入
                        var temp = this.cloneNode(true);
                        target.insertBefore(temp,child);
                        res.push(temp);
                    }
                })
            });
            return $(res);
        },
        append:function(content){
            if(!njQuery.isObject(content)){
                this.each(function(){
                    this.innerHTML += content;
                });
            }else{
                $(content).appendTo(this);
            }
        },
        prepend:function(content){
            if(!njQuery.isObject(content)){
                this.each(function(){
                    this.innerHTML = content + this.innerHTML;
                });
            }else{
                $(content).appendTo(this);
            }
        }




    });





})(window);

