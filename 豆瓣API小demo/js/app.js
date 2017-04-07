/**
 * Created by Administrator on 2017/4/5.
 */
;(function (angular) {
    var app = angular.module('app',['ngRoute']);
    app.controller('testController',['$scope',function ($scope) {
        $scope.name = '豆瓣电影';
    }]);

    app.controller('movieController',['$scope','$routeParams','myHTTP','$location',function ($scope,$routeParams,myHTTP,$location) {
        $scope.isLoad = true;
        $scope.isPrePage = false;
        $scope.isNextPage = true;
        $scope.start = 0;
        $scope.count = 5;
        $scope.num = 1;

        if($location.url().indexOf('search') == -1){
            var url = 'https://api.douban.com/v2/movie/'+ $routeParams.type;
            var params = {start:0, count:5};
        }else{
            var url = 'https://api.douban.com/v2/movie/search';
            var params = {q:$routeParams.type,start:0, count:5};
        }

        myHTTP.myJsonp(url,params,function (data) {
            console.log(data);
            $scope.countPage = Math.ceil(data.total/$scope.count);
            $scope.name = data.title;
            $scope.movieList = data.subjects;
            $scope.isLoad = false;
            $scope.$apply();
        });

        $scope.loadPage = function (type) {
            $scope.isLoad = true;
            if( type == 'prePage'){
                $scope.num--;
            }else if(type == 'nextPage'){
                $scope.num++;
            }
            $scope.isPrePage = $scope.num<1 ? false : true;
            $scope.isNextPage = $scope.num == $scope.countPage ? false : true;
            $scope.start = ($scope.num-1)*$scope.count;

            if($location.url().indexOf('search') == -1){
                var url = 'https://api.douban.com/v2/movie/'+ $routeParams.type;
                var params = {start:0, count:5};
            }else{
                var url = 'https://api.douban.com/v2/movie/search';
                var params = {q:$routeParams.type,start:$scope.start, count:$scope.count};
            }


            myHTTP.myJsonp(url,params,function (data) {
                $scope.name = data.title;
                $scope.movieList = data.subjects;
                $scope.isLoad = false;
                $scope.$apply();
            });
        }
    }]);

    app.controller('detailController',['$scope','$routeParams','myHTTP',function ($scope,$routeParams,myHTTP) {
        $scope.isLoad = true;
        var url = 'https://api.douban.com/v2/movie/subject/'+ $routeParams.id;
        myHTTP.myJsonp(url,null,function (data) {
            $scope.movieDetail = data;
            $scope.isLoad = false;
            console.log(data);
            $scope.$apply();
        });
    }]);


})(angular);