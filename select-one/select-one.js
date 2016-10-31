(function () {
    'use strict';
    var app = angular.module('ngui-select-one', []);

    app.factory('$nguiSelectOne', ['$http', '$q',
        function ($http, $q) {
            var self = {};
            return self;
        }
    ]);
    app.provider("$nguiSelectOneConfig", function () {
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
    app.directive('nguiSelectOne', ['$nguiSelectOneConfig', '$nguiSelectOne', '$http',
        function ($nguiSelectOneConfig, $nguiSelectOne, $http) {

            return {
                restrict: 'A',
                require: '?ngModel',
                scope: {
                    srcUri: '@',
                    labelField: '@',
                    valueField: '@',
                    searchField: '@'
                },
                templateUrl: function (elem, attrs) {
                    return attrs.templateUrl || $nguiSelectOneConfig.baseTemplateUrl + '/select-one.htm';
                },
                link: function ($scope, $elem, $attr, $ngModel) {

                    var searchQ = "";

                    $scope.model = $ngModel ? $ngModel.$viewValue : null;

                    $scope.$watch('model', function (v) {
                        if (v && $ngModel) {
                            $ngModel.$setViewValue(v);
                        }
                    });

                    var isLoad = true, isError = false;
                    var $select = $scope.$select = {
                        get value() {
                            return $ngModel ? $ngModel.$viewValue : null;
                        },

                        get isLoad() {
                            return isLoad;
                        },
                        get isError() {
                            return isError;
                        },
                        get labelField() {
                            return $scope.labelField || 'label';
                        },
                        get valueField() {
                            return $scope.valueField || 'id';
                        },
                        get searchField() {
                            return $scope.searchField || 'search';
                        },

                        get emptyText() {
                            var txt1 = ($select.value && !$scope.model) ? 'selected value:' + $select.value : 'please select';
                            var txt2 = "avilable items:" + (Array.isArray($scope.items) ? '' + $scope.items.length : '0');
                            return txt1 + '; ' + txt2;
                        }
                    };

                    var load = $scope.load = function (q) {

                        var params = {};
                        params[$select.searchField] = q;

                        $http.get($scope.srcUri, {
                            params: params
                        })
                            .success(function (data) {
                                $scope.items = data;
                            })
                            .error(function (err) {
                                isError = true;
                            })
                            .finally(function () {
                                isLoad = false;
                            });
                    };
                    load(searchQ);

                    $scope.search = function () {
                        searchQ = prompt("search text", searchQ ? searchQ : '');
                        if (searchQ) {
                            load(searchQ);
                        }
                    };

                    $scope.clear = function () {
                        $scope.model = undefined;
                        if ($ngModel) {
                            $ngModel.$setViewValue(undefined);
                        }
                    };
                }
            };
        }
    ]);

})();
