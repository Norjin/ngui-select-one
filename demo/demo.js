angular.module('demobs', ['ngRoute', 'ngui'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: '/demo/view.html',                
                page: 'select-on'
            });

        //$locationProvider.html5Mode(true);
    })
    ;

angular.module('ngui', [
    'ngui-select-one'
])
    .config(function ($logProvider) {
        $logProvider.debugEnabled(true);
    });
