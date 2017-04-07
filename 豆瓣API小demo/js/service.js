/**
 * Created by Administrator on 2017/4/5.
 */
;(function (angular) {
    angular.module('app').service('myHTTP',['$window',function ($window) {
        this.myJsonp = function (url, params, fn) {
            var callbackName = ('myjsonp'+ Math.random()).replace('.','');
            $window[callbackName] = function (data) {
                fn(data);
                $window.document.body.removeChild(scriptEle);
            };
            var scriptEle = document.createElement('script');
            $window.document.body.appendChild(scriptEle);

            var res = '';
            for(var key in params){
                res += key + '=' + params[key] + '&';
            }
            // res = res.slice(0,-1);

            res += 'callback' + '=' + callbackName;
            url = url + '?' + res;
            scriptEle.src = url;

        }
    }])
})(angular);