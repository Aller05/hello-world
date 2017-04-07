/**
 * Created by Administrator on 2017/4/5.
 */
(function (angular) {
    angular.module('app').config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/movie/:type',{
            templateUrl:'movieList.html',
            controller:'movieController'
        }).when('/movie/subject/:id',{
            templateUrl:'movie_detail_tpl.html',
            controller:'detailController'
        }).when('/search/:type',{
            templateUrl:'movieList.html',
            controller:'movieController'
        }).otherwise({
            redirectTo:'/movie/in_theaters'
        })
    }]);
})(angular);
