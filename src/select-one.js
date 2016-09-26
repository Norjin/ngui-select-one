(function () {
    'use strict';
    var app = angular.module('ngui-select-one', []);

    app.factory('$nguiSelectOne', ['$http', '$q',
        function ($http, $q) {
            var self = {};
            return self;
        }
    ]);
    app.provider("$nguiConfig", function () {
        var baseTemplateUrl = "/tpl-bootstrap";

        return {
            setBaseTemplateUrl: function (url) {
                baseTemplateUrl = url;
            },
            $get: function () {
                return {
                    get baseTemplateUrl() {
                        return baseTemplateUrl;
                    }
                };
            }
        };
    });
    app.directive('nguiSelectOne', ['$nguiConfig', '$nguiSelectOne', '$http',
        function ($nguiConfig, $nguiSelectOne, $http) {
            return {
                restrict: 'A',
                scope: {
                    model: '=ngModel',
                    srcUri: '@',
                    labelField: '@',
                    valueField: '@',
                },
                templateUrl: function (elem, attrs) {
                    return attrs.templateUrl || $nguiConfig.baseTemplateUrl + '/select-one.htm';
                },
                link: function ($scope) {
                    var isLoad = true, isError = false;
                    $scope.$select = {
                        get isLoad() {
                            return isLoad;
                        },
                        get isError() {
                            return isError;
                        },
                        get labelField() {
                            return $scope.labelField || 'label'
                        },
                        get valueField() {
                            return $scope.valueField || 'id'
                        }
                    };

                    $http.get($scope.srcUri)
                        .success(function (data) {
                            $scope.items = data;
                        })
                        .error(function (err) {
                            console.log(err);
                            isError = true;
                        })
                        .finally(function () {
                            isLoad = false;
                        });


                }
            };
        }
    ]);

})();
