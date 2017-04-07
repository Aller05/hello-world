/**
 * Created by Administrator on 2017/4/6.
 */
;(function (angular) {
    angular.module('app').directive('select',['$location',function ($location) {
        return{
            restrict:'A',
            link:function ($scope, ele, attr) {
                $scope.$location = $location;
                $scope.routeURL =
                $scope.$watch('$location.url()',function (newValue, oldValue) {
                    var href = ele.find('a').attr('href').slice(2);
                    if(newValue == href){
                        ele.parent().children().removeClass(attr.select);
                        ele.addClass(attr.select);
                    }
                });
            }
        }
    }])
})(angular);